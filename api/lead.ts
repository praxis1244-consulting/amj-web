import { createHash } from "crypto";

const VERSION = "v8";

export default async function handler(req: any, res: any) {
  if (req.method === "GET") return res.status(200).json({ version: VERSION });
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
  const { name, email, phone, company, message } = req.body ?? {};
  if (!name || !email) return res.status(400).json({ error: "name and email are required" });

  const SUPABASE_URL = "https://dekyswplvzsbqzcdsavu.supabase.co";
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  const SITE_ID = process.env.SITE_ID ?? "";
  const PIXEL_ID = process.env.META_PIXEL_ID || "1651608922679340";
  const CAPI_TOKEN = process.env.META_CAPI_TOKEN;
  const eventId = globalThis.crypto.randomUUID();

  // Insert lead
  const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      site_id: SITE_ID, name, email,
      phone: phone ?? null, notes: message ?? null,
      source: "website",
      custom_fields: company ? { company } : {},
    }),
  });

  if (!insertRes.ok) {
    const detail = await insertRes.text();
    return res.status(500).json({ error: "Failed to save lead", detail });
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
