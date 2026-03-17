import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import { createHash, randomUUID } from "crypto";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || "https://dekyswplvzsbqzcdsavu.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const SITE_ID = process.env.SITE_ID!;
const PIXEL_ID = process.env.META_PIXEL_ID || "1651608922679340";
const CAPI_TOKEN = process.env.META_CAPI_TOKEN;

function sha256(value: string) {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

async function sendCapiEvent(
  email: string,
  name: string,
  phone: string | undefined,
  eventId: string,
  sourceUrl: string,
  ip?: string,
  ua?: string
) {
  if (!CAPI_TOKEN) return;
  const firstName = name.split(" ")[0];
  const userData: Record<string, any> = {
    em: [sha256(email)],
    fn: [sha256(firstName)],
    client_user_agent: ua ?? "",
  };
  if (phone) {
    const digits = phone.replace(/\D/g, "");
    userData.ph = [sha256(digits.startsWith("56") ? digits : `56${digits}`)];
  }
  if (ip) userData.client_ip_address = ip;

  await fetch(
    `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${CAPI_TOKEN}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [
          {
            event_name: "Lead",
            event_time: Math.floor(Date.now() / 1000),
            event_id: eventId,
            action_source: "website",
            event_source_url: sourceUrl,
            user_data: userData,
          },
        ],
      }),
    }
  ).catch(console.error);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { name, email, phone, company, message } = req.body ?? {};

  if (!name || !email) {
    res.status(400).json({ error: "name and email are required" });
    return;
  }

  const eventId = randomUUID();

  const { error } = await supabase.from("leads").insert({
    site_id: SITE_ID,
    name,
    email,
    phone: phone ?? null,
    notes: message ?? null,
    source: "website",
    custom_fields: company ? { company } : {},
  });

  if (error) {
    res.status(500).json({ error: "Failed to save lead", detail: error.message, code: error.code });
    return;
  }

  // Fire CAPI (don't block response)
  const sourceUrl = (req.headers.referer as string) ?? "https://amjingenieria.cl/";
  const ip = ((req.headers["x-forwarded-for"] as string) ?? "").split(",")[0];
  const ua = req.headers["user-agent"] as string;
  sendCapiEvent(email, name, phone, eventId, sourceUrl, ip, ua);

  // Send email notification (don't block response)
  if (process.env.RESEND_API_KEY) {
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "AMJ Web <no-reply@send.amjingenieria.cl>",
        to: "ventas@amjingenieria.cl",
        subject: `Nuevo lead: ${name}`,
        html: `<h2>Nuevo contacto desde amjingenieria.cl</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ""}
          ${company ? `<p><strong>Empresa:</strong> ${company}</p>` : ""}
          ${message ? `<p><strong>Mensaje:</strong> ${message}</p>` : ""}`,
      }),
    }).catch(console.error);
  }

  res.status(200).json({ success: true, eventId });
}
