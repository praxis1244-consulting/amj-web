import { createHash } from "crypto";
import { createClient } from "@supabase/supabase-js";

const VERSION = "v9";

export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    try {
      const r = await fetch("https://dekyswplvzsbqzcdsavu.supabase.co/rest/v1/", {
        headers: { apikey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "" },
      });
      return res.status(200).json({ version: VERSION, supaStatus: r.status, ok: r.ok });
    } catch (e: any) {
      return res.status(200).json({ version: VERSION, fetchError: e.message, cause: e.cause?.message });
    }
  }
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
  const { name, email, phone, company, message } = req.body ?? {};
  if (!name || !email) return res.status(400).json({ error: "name and email are required" });

  const SITE_ID = process.env.SITE_ID ?? "";
  const PIXEL_ID = process.env.META_PIXEL_ID || "1651608922679340";
  const CAPI_TOKEN = process.env.META_CAPI_TOKEN;
  const eventId = globalThis.crypto.randomUUID();

  // Insert lead via Supabase JS client
  const supabase = createClient(
    process.env.VITE_SUPABASE_URL || "https://dekyswplvzsbqzcdsavu.supabase.co",
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { error: dbError } = await supabase.from("leads").insert({
    site_id: SITE_ID, name, email,
    phone: phone ?? null, notes: message ?? null,
    source: "website",
    custom_fields: company ? { company } : {},
  });

  if (dbError) {
    return res.status(500).json({ error: "Failed to save lead", detail: dbError.message });
  }

  // Fire Meta CAPI Lead event
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

  // Send email
  if (process.env.RESEND_API_KEY) {
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "AMJ Web <no-reply@send.amjingenieria.cl>", to: "ventas@amjingenieria.cl",
        subject: `Nuevo lead: ${name}`,
        html: `<h2>Nuevo contacto</h2><p>${name}</p><p>${email}</p>`,
      }),
    }).catch(console.error);
  }

  return res.status(200).json({ success: true, eventId });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message, stack: err?.stack?.split("\n").slice(0, 3) });
  }
}
