import { createHash } from "crypto";
import { createClient } from "@supabase/supabase-js";

const NOTIFY_FROM = "AMJ Web <no-reply@send.amjingenieria.cl>";
const NOTIFY_RECIPIENTS = [
  "ventas@amjingenieria.cl",
  "andrea.sotelo@amjingenieria.cl",
];

type LeadInput = {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  message?: string | null;
  origin_url?: string | null;
  origin_path?: string | null;
};

const FALLBACK_ORIGIN_URL = "https://amjingenieria.cl/";

const ATTRIBUTION_FIELD_CAPS: Record<string, number> = {
  utm_source: 255,
  utm_medium: 255,
  utm_campaign: 255,
  utm_term: 255,
  utm_content: 255,
  gclid: 500,
  gad_source: 500,
  wbraid: 500,
  gbraid: 500,
  fbclid: 500,
  li_fat_id: 500,
  first_touch_url: 2048,
  last_touch_url: 2048,
  referrer: 2048,
};

const GCLID_REGEX = /^[A-Za-z0-9_-]{20,200}$/;

function sanitizeAttribution(raw: unknown): Record<string, string> {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    const cap = ATTRIBUTION_FIELD_CAPS[key];
    if (!cap) continue;
    if (typeof value !== "string") continue;
    const trimmed = value.trim();
    if (!trimmed) continue;
    result[key] = trimmed.length > cap ? trimmed.slice(0, cap) : trimmed;
  }
  return result;
}

function parseOrigin(refererHeader: unknown): {
  url: string;
  path: string;
} {
  if (typeof refererHeader !== "string" || !refererHeader) {
    return { url: FALLBACK_ORIGIN_URL, path: "/" };
  }
  try {
    const parsed = new URL(refererHeader);
    return { url: parsed.toString(), path: parsed.pathname || "/" };
  } catch {
    return { url: FALLBACK_ORIGIN_URL, path: "/" };
  }
}

function parseCookie(header: unknown, name: string): string | null {
  if (typeof header !== "string" || !header) return null;
  for (const part of header.split(";")) {
    const trimmed = part.trim();
    if (trimmed.startsWith(name + "=")) {
      try {
        return decodeURIComponent(trimmed.slice(name.length + 1));
      } catch {
        return trimmed.slice(name.length + 1);
      }
    }
  }
  return null;
}

function esc(s: string | null | undefined): string {
  if (!s) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHtml(l: LeadInput): string {
  return [
    `<h2>Nuevo contacto desde amjingenieria.cl</h2>`,
    `<p><strong>Nombre:</strong> ${esc(l.name)}</p>`,
    `<p><strong>Email:</strong> ${esc(l.email)}</p>`,
    l.phone ? `<p><strong>Teléfono:</strong> ${esc(l.phone)}</p>` : "",
    l.company ? `<p><strong>Empresa:</strong> ${esc(l.company)}</p>` : "",
    l.message ? `<p><strong>Mensaje:</strong> ${esc(l.message)}</p>` : "",
    l.origin_url
      ? `<p><strong>Origen:</strong> <a href="${esc(l.origin_url)}">${esc(l.origin_url)}</a></p>`
      : "",
  ]
    .filter(Boolean)
    .join("\n");
}

function buildSubject(lead: LeadInput): string {
  const path = lead.origin_path;
  if (path && path !== "/") {
    return `Nuevo lead [${path}]: ${lead.name}`;
  }
  return `Nuevo lead: ${lead.name}`;
}

async function sendNotification(
  apiKey: string,
  lead: LeadInput,
): Promise<{ ok: true; id: string | null } | { ok: false; error: string }> {
  // Personal inbox BCC'd on every send so a human always has an independent
  // copy if Supabase, the cron, or Resend log retention fails us. Override
  // via LEAD_NOTIFICATION_BCC. Set to empty string to disable.
  const bccEnv = process.env.LEAD_NOTIFICATION_BCC;
  const bcc = bccEnv === undefined ? "aqf1244@gmail.com" : bccEnv.trim();
  const payload: Record<string, unknown> = {
    from: NOTIFY_FROM,
    to: NOTIFY_RECIPIENTS,
    subject: buildSubject(lead),
    html: buildHtml(lead),
  };
  if (bcc) payload.bcc = [bcc];
  const body = JSON.stringify(payload);

  let lastError = "";
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body,
      });
      if (res.ok) {
        const json = (await res.json().catch(() => null)) as
          | { id?: string }
          | null;
        return { ok: true, id: json?.id ?? null };
      }
      lastError = `http ${res.status}: ${await res.text().catch(() => "")}`;
    } catch (err) {
      lastError = String(err);
    }
    console.error(`[lead] resend attempt ${attempt} failed`, {
      lead_email: lead.email,
      lead_name: lead.name,
      error: lastError,
    });
    if (attempt === 1) {
      await new Promise((r) => setTimeout(r, 1200));
    }
  }
  return { ok: false, error: lastError.slice(0, 500) };
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, email, phone, company, message, attribution: rawAttribution } = req.body ?? {};
  if (!name || !email) return res.status(400).json({ error: "name and email are required" });
  const attribution = sanitizeAttribution(rawAttribution);

  const SITE_ID = process.env.SITE_ID ?? "";
  const PIXEL_ID = process.env.META_PIXEL_ID || "1651608922679340";
  const CAPI_TOKEN = process.env.META_CAPI_TOKEN;
  const RESEND_KEY = process.env.RESEND_API_KEY;
  const eventId = globalThis.crypto.randomUUID();
  const origin = parseOrigin(req.headers?.referer);

  const supabase = createClient(
    process.env.VITE_SUPABASE_URL || "https://dekyswplvzsbqzcdsavu.supabase.co",
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const initialCustomFields: Record<string, string> = {
    origin_url: origin.url,
    origin_path: origin.path,
    ...attribution,
  };
  if (company) initialCustomFields.company = company;

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
      custom_fields: initialCustomFields,
    })
    .select("id, custom_fields")
    .single();

  // 23505 = unique_violation on (site_id, email). Returning prospect — fetch the
  // existing row so notification/CAPI still fire and we can record state on it.
  type LeadRow = { id: string; custom_fields: Record<string, unknown> | null };
  let leadRow: LeadRow | null = null;
  if (dbError) {
    if (dbError.code === "23505") {
      const { data: existing } = await supabase
        .from("leads")
        .select("id, custom_fields")
        .eq("site_id", SITE_ID)
        .eq("email", email)
        .maybeSingle();
      leadRow = existing as LeadRow | null;
    } else {
      console.error("[lead] supabase insert failed", dbError);
      return res.status(500).json({ error: "No se pudo enviar el mensaje. Intenta de nuevo." });
    }
  } else {
    leadRow = inserted as LeadRow;
  }

  // Populate dedicated gclid column for Enhanced Conversions / offline uploads.
  // gclid also lives in custom_fields for safety; this column is the JOIN key.
  if (leadRow && attribution.gclid && GCLID_REGEX.test(attribution.gclid)) {
    const { error: gclidErr } = await supabase
      .from("leads")
      .update({ gclid: attribution.gclid })
      .eq("id", leadRow.id);
    if (gclidErr) {
      console.error("[lead] failed to write gclid column (migration pending?)", {
        lead_id: leadRow.id,
        error: gclidErr.message ?? gclidErr,
      });
    }
  }

  // Fire Meta CAPI Lead event (analytics, non-critical, fire and forget)
  if (CAPI_TOKEN) {
    const sha = (v: string) => createHash("sha256").update(v.trim().toLowerCase()).digest("hex");
    const nameParts = name.trim().split(/\s+/).filter(Boolean);
    const ud: Record<string, any> = {
      em: [sha(email)],
      fn: [sha(nameParts[0] ?? name)],
      client_user_agent: req.headers?.["user-agent"] ?? "",
    };
    if (nameParts.length > 1) ud.ln = [sha(nameParts.slice(1).join(" "))];
    if (phone) { const d = phone.replace(/\D/g, ""); ud.ph = [sha(d.startsWith("56") ? d : `56${d}`)]; }
    const ff = req.headers?.["x-forwarded-for"];
    if (ff) ud.client_ip_address = String(ff).split(",")[0];
    // fbp/fbc cookies — critical for Meta event match quality + ad attribution.
    // Pixel sets _fbp on every visit and _fbc when a fbclid is in the URL.
    const fbp = parseCookie(req.headers?.cookie, "_fbp");
    if (fbp) ud.fbp = fbp;
    const fbc = parseCookie(req.headers?.cookie, "_fbc");
    if (fbc) ud.fbc = fbc;

    fetch(`https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${CAPI_TOKEN}`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [{ event_name: "Lead", event_time: Math.floor(Date.now() / 1000),
        event_id: eventId, action_source: "website",
        event_source_url: origin.url, user_data: ud }] }),
    }).catch(console.error);
  }

  // Sales notification — awaited so Vercel can't kill it post-response,
  // retries once, and persists state so failures are recoverable.
  if (RESEND_KEY) {
    const notify = await sendNotification(RESEND_KEY, {
      name,
      email,
      phone,
      company,
      message,
      origin_url: origin.url,
      origin_path: origin.path,
    });

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
