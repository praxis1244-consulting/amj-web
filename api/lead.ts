import { createHash } from "crypto";
import { createClient } from "@supabase/supabase-js";
import { sendNotification, type LeadInput } from "./_lib/notify";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, email, phone, company, message } = req.body ?? {};
  if (!name || !email) return res.status(400).json({ error: "name and email are required" });

  const SITE_ID = process.env.SITE_ID ?? "";
  const PIXEL_ID = process.env.META_PIXEL_ID || "1651608922679340";
  const CAPI_TOKEN = process.env.META_CAPI_TOKEN;
  const RESEND_KEY = process.env.RESEND_API_KEY;
  const eventId = globalThis.crypto.randomUUID();

  const supabase = createClient(
    process.env.VITE_SUPABASE_URL || "https://dekyswplvzsbqzcdsavu.supabase.co",
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Insert and capture the lead id so we can persist notification state.
  const { data: inserted, error: dbError } = await supabase
    .from("leads")
    .insert({
      site_id: SITE_ID,
      name,
      email,
      phone: phone ?? null,
      notes: message ?? null,
      source: "website",
      custom_fields: company ? { company } : {},
    })
    .select("id, custom_fields")
    .single();

  // 23505 = unique_violation on (site_id, email). Returning prospect — fetch
  // the existing row so notification/CAPI still fire and we can record state
  // on it.
  let leadRow: { id: string; custom_fields: Record<string, unknown> | null } | null = null;
  if (dbError) {
    if (dbError.code === "23505") {
      const { data: existing } = await supabase
        .from("leads")
        .select("id, custom_fields")
        .eq("site_id", SITE_ID)
        .eq("email", email)
        .maybeSingle();
      leadRow = existing as typeof leadRow;
    } else {
      console.error("[lead] supabase insert failed", dbError);
      return res.status(500).json({ error: "No se pudo enviar el mensaje. Intenta de nuevo." });
    }
  } else {
    leadRow = inserted as typeof leadRow;
  }

  // Fire Meta CAPI Lead event (analytics, non-critical, fire and forget)
  if (CAPI_TOKEN) {
    const sha = (v: string) => createHash("sha256").update(v.trim().toLowerCase()).digest("hex");
    const ud: Record<string, any> = {
      em: [sha(email)], fn: [sha(name.split(" ")[0])],
      client_user_agent: req.headers?.["user-agent"] ?? "",
    };
    if (phone) { const d = phone.replace(/\D/g, ""); ud.ph = [sha(d.startsWith("56") ? d : `56${d}`)]; }
    const ff = req.headers?.["x-forwarded-for"];
    if (ff) ud.client_ip_address = String(ff).split(",")[0];

    fetch(`https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${CAPI_TOKEN}`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [{ event_name: "Lead", event_time: Math.floor(Date.now() / 1000),
        event_id: eventId, action_source: "website",
        event_source_url: req.headers?.referer ?? "https://amjingenieria.cl/", user_data: ud }] }),
    }).catch(console.error);
  }

  // Sales notification — awaited so Vercel can't kill it post-response,
  // retries once, BCCs a personal inbox as defense-in-depth, and persists
  // state so the retry cron can recover failures.
  if (RESEND_KEY) {
    const lead: LeadInput = { name, email, phone, company, message };
    const notify = await sendNotification(RESEND_KEY, lead);

    if (leadRow) {
      const existing = (leadRow.custom_fields as Record<string, unknown> | null) ?? {};
      const nextCustomFields = notify.ok
        ? {
            ...existing,
            notification_sent_at: new Date().toISOString(),
            notification_resend_id: notify.id,
          }
        : {
            ...existing,
            notification_failed_at: new Date().toISOString(),
            notification_error: notify.error,
          };
      const { error: updateError } = await supabase
        .from("leads")
        .update({ custom_fields: nextCustomFields })
        .eq("id", leadRow.id);
      if (updateError) {
        console.error("[lead] failed to persist notification state", {
          lead_id: leadRow.id,
          error: updateError,
        });
      }
    }

    if (!notify.ok) {
      console.error("[lead] LEAD SAVED BUT NOTIFICATION FAILED", {
        lead_id: leadRow?.id,
        lead_email: email,
        lead_name: name,
        lead_phone: phone,
      });
    }
  } else {
    console.error("[lead] RESEND_API_KEY missing — notification not sent", {
      lead_email: email,
      lead_name: name,
    });
  }

  return res.status(200).json({ success: true, eventId });
}
