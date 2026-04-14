import { createClient } from "@supabase/supabase-js";

// Recovery cron — invoked every 5 min by GitHub Actions
// (.github/workflows/retry-lead-notifications.yml).
//
// For each lead in the last 48h whose primary notification never succeeded
// (custom_fields.notification_sent_at is missing), retry the send. If a lead
// has been stuck for more than 15 min, fire a one-time [ALARM] email to a
// human so a silent failure can't persist past that window.
//
// All helpers are inlined on purpose: the previous attempt extracted them
// to api/_lib/notify.ts and the Vercel serverless bundler failed to include
// that file, causing FUNCTION_INVOCATION_FAILED. Duplicating a few dozen
// lines of helpers is a fair trade for a deploy we can trust.

const NOTIFY_FROM = "AMJ Web <no-reply@send.amjingenieria.cl>";
const NOTIFY_RECIPIENTS = [
  "ventas@amjingenieria.cl",
  "andrea.sotelo@amjingenieria.cl",
];

const ALARM_THRESHOLD_MS = 15 * 60 * 1000;
const WINDOW_MS = 48 * 60 * 60 * 1000;
const MAX_PER_RUN = 50;

type LeadInput = {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  message?: string | null;
};

function esc(s: string | null | undefined): string {
  if (!s) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildNotificationHtml(l: LeadInput): string {
  return [
    `<h2>Nuevo contacto desde amjingenieria.cl</h2>`,
    `<p><strong>Nombre:</strong> ${esc(l.name)}</p>`,
    `<p><strong>Email:</strong> ${esc(l.email)}</p>`,
    l.phone ? `<p><strong>Teléfono:</strong> ${esc(l.phone)}</p>` : "",
    l.company ? `<p><strong>Empresa:</strong> ${esc(l.company)}</p>` : "",
    l.message ? `<p><strong>Mensaje:</strong> ${esc(l.message)}</p>` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

type SendResult =
  | { ok: true; id: string | null }
  | { ok: false; error: string };

async function sendNotification(
  apiKey: string,
  lead: LeadInput,
  subjectPrefix: string,
): Promise<SendResult> {
  const bccEnv = process.env.LEAD_NOTIFICATION_BCC;
  const bcc = bccEnv === undefined ? "aqf1244@gmail.com" : bccEnv.trim();
  const payload: Record<string, unknown> = {
    from: NOTIFY_FROM,
    to: NOTIFY_RECIPIENTS,
    subject: `${subjectPrefix}: ${lead.name}`,
    html: buildNotificationHtml(lead),
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
    console.error(`[retry-notifications] resend attempt ${attempt} failed`, {
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

async function sendAlarm(
  apiKey: string,
  ctx: LeadInput & {
    id: string;
    created_at: string;
    attempts: number;
    lastError: string;
  },
): Promise<SendResult> {
  const to = process.env.LEAD_NOTIFICATION_ALARM?.trim() || "aqf1244@gmail.com";
  const ageMin = Math.round(
    (Date.now() - new Date(ctx.created_at).getTime()) / 60000,
  );
  const html = [
    `<h2 style="color:#b00020">[ALARM] Lead notification stuck for ${ageMin} min</h2>`,
    `<p>Sales email for this lead has failed repeatedly. Ventas has NOT been notified through the normal channel. Follow up manually.</p>`,
    `<p><strong>Lead id:</strong> ${esc(ctx.id)}</p>`,
    `<p><strong>Created:</strong> ${esc(ctx.created_at)} (${ageMin} min ago)</p>`,
    `<p><strong>Retry attempts:</strong> ${ctx.attempts}</p>`,
    `<p><strong>Last error:</strong> ${esc(ctx.lastError || "(none recorded)")}</p>`,
    `<hr />`,
    `<p><strong>Nombre:</strong> ${esc(ctx.name)}</p>`,
    `<p><strong>Email:</strong> ${esc(ctx.email)}</p>`,
    ctx.phone ? `<p><strong>Teléfono:</strong> ${esc(ctx.phone)}</p>` : "",
    ctx.company ? `<p><strong>Empresa:</strong> ${esc(ctx.company)}</p>` : "",
    ctx.message ? `<p><strong>Mensaje:</strong> ${esc(ctx.message)}</p>` : "",
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: NOTIFY_FROM,
        to: [to],
        subject: `[ALARM] Lead notification stuck: ${ctx.name} (${ctx.email})`,
        html,
      }),
    });
    if (res.ok) {
      const json = (await res.json().catch(() => null)) as { id?: string } | null;
      return { ok: true, id: json?.id ?? null };
    }
    return {
      ok: false,
      error: `http ${res.status}: ${await res.text().catch(() => "")}`,
    };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

function isAuthorized(req: any): boolean {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = String(req.headers?.authorization ?? "");
    if (auth === `Bearer ${secret}`) return true;
    const vcHeader = req.headers?.["x-vercel-cron-secret"];
    if (vcHeader === secret) return true;
    return false;
  }
  const ua = String(req.headers?.["user-agent"] ?? "");
  if (ua.startsWith("vercel-cron/")) return true;
  if (ua.includes("GitHub-Actions")) return true;
  return false;
}

type LeadRow = {
  id: string;
  site_id: string;
  name: string;
  email: string;
  phone: string | null;
  notes: string | null;
  custom_fields: Record<string, unknown> | null;
  created_at: string;
};

export default async function handler(req: any, res: any) {
  if (!isAuthorized(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const RESEND_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_KEY) {
    console.error("[retry-notifications] RESEND_API_KEY missing");
    return res.status(500).json({ error: "RESEND_API_KEY missing" });
  }

  const SITE_ID = process.env.SITE_ID ?? "";
  if (!SITE_ID) {
    return res.status(500).json({ error: "SITE_ID missing" });
  }

  const supabase = createClient(
    process.env.VITE_SUPABASE_URL || "https://dekyswplvzsbqzcdsavu.supabase.co",
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const since = new Date(Date.now() - WINDOW_MS).toISOString();

  const { data, error } = await supabase
    .from("leads")
    .select("id, site_id, name, email, phone, notes, custom_fields, created_at")
    .eq("site_id", SITE_ID)
    .gte("created_at", since)
    .order("created_at", { ascending: true })
    .limit(200);

  if (error) {
    console.error("[retry-notifications] select failed", error);
    return res.status(500).json({ error: "select failed" });
  }

  const stuck = (data ?? []).filter((r: LeadRow) => {
    const cf = (r.custom_fields ?? {}) as Record<string, unknown>;
    return !cf.notification_sent_at;
  });

  const toProcess = stuck.slice(0, MAX_PER_RUN);

  let recovered = 0;
  let stillFailing = 0;
  let alarmed = 0;
  const now = Date.now();

  for (const row of toProcess) {
    const cf = (row.custom_fields ?? {}) as Record<string, unknown>;
    const company =
      typeof cf.company === "string" ? (cf.company as string) : null;
    const lead: LeadInput = {
      name: row.name,
      email: row.email,
      phone: row.phone,
      company,
      message: row.notes,
    };

    const sendRes = await sendNotification(
      RESEND_KEY,
      lead,
      "Nuevo lead (recuperado)",
    );

    const priorAttempts =
      typeof cf.notification_retry_attempts === "number"
        ? (cf.notification_retry_attempts as number)
        : 0;

    if (sendRes.ok) {
      const nextCf = {
        ...cf,
        notification_sent_at: new Date().toISOString(),
        notification_resend_id: sendRes.id,
        notification_recovered_by_cron: true,
        notification_retry_attempts: priorAttempts + 1,
      };
      const { error: upErr } = await supabase
        .from("leads")
        .update({ custom_fields: nextCf })
        .eq("id", row.id);
      if (upErr) {
        console.error("[retry-notifications] state update failed", {
          lead_id: row.id,
          error: upErr,
        });
      }
      recovered++;
      console.log("[retry-notifications] recovered", {
        lead_id: row.id,
        email: row.email,
        attempts: priorAttempts + 1,
      });
      continue;
    }

    const ageMs = now - new Date(row.created_at).getTime();
    const alarmAlreadySent = Boolean(cf.notification_alarm_sent_at);
    const shouldAlarm = ageMs > ALARM_THRESHOLD_MS && !alarmAlreadySent;

    let alarmSentAt: string | null = null;
    if (shouldAlarm) {
      const alarmRes = await sendAlarm(RESEND_KEY, {
        id: row.id,
        name: row.name,
        email: row.email,
        phone: row.phone,
        company,
        message: row.notes,
        created_at: row.created_at,
        attempts: priorAttempts + 1,
        lastError: sendRes.error,
      });
      if (alarmRes.ok) {
        alarmSentAt = new Date().toISOString();
        alarmed++;
        console.error("[retry-notifications] ALARM sent for stuck lead", {
          lead_id: row.id,
          email: row.email,
          age_min: Math.round(ageMs / 60000),
        });
      } else {
        console.error("[retry-notifications] ALARM itself failed", {
          lead_id: row.id,
          error: alarmRes.error,
        });
      }
    }

    const nextCf: Record<string, unknown> = {
      ...cf,
      notification_failed_at: new Date().toISOString(),
      notification_error: sendRes.error,
      notification_retry_attempts: priorAttempts + 1,
    };
    if (alarmSentAt) nextCf.notification_alarm_sent_at = alarmSentAt;

    const { error: upErr } = await supabase
      .from("leads")
      .update({ custom_fields: nextCf })
      .eq("id", row.id);
    if (upErr) {
      console.error("[retry-notifications] state update failed", {
        lead_id: row.id,
        error: upErr,
      });
    }
    stillFailing++;
  }

  const summary = {
    scanned: data?.length ?? 0,
    stuck: stuck.length,
    processed: toProcess.length,
    recovered,
    still_failing: stillFailing,
    alarmed,
  };
  console.log("[retry-notifications] done", summary);
  return res.status(200).json({ ok: true, ...summary });
}
