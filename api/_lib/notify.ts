// Shared lead-notification helpers used by /api/lead and /api/cron/retry-notifications.
// Files under api/_lib/ are ignored as Vercel routes (prefix "_").

export const NOTIFY_FROM = "AMJ Web <no-reply@send.amjingenieria.cl>";

export const NOTIFY_RECIPIENTS = [
  "ventas@amjingenieria.cl",
  "andrea.sotelo@amjingenieria.cl",
];

// Personal inbox copied on every primary send so a human always has a
// record independent of Supabase / cron / Resend log retention. Override
// via LEAD_NOTIFICATION_BCC env var. Empty string disables.
export function getBccRecipient(): string | null {
  const v = process.env.LEAD_NOTIFICATION_BCC;
  if (v === undefined) return "aqf1244@gmail.com";
  return v.trim() === "" ? null : v.trim();
}

// Where persistent-failure alarms are sent. Override via LEAD_NOTIFICATION_ALARM.
export function getAlarmRecipient(): string {
  return process.env.LEAD_NOTIFICATION_ALARM?.trim() || "aqf1244@gmail.com";
}

export type LeadInput = {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  message?: string | null;
};

export function esc(s: string | null | undefined): string {
  if (!s) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildNotificationHtml(l: LeadInput): string {
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

export type SendResult =
  | { ok: true; id: string | null }
  | { ok: false; error: string };

export async function sendNotification(
  apiKey: string,
  lead: LeadInput,
  opts: { subjectPrefix?: string; bcc?: string | null } = {},
): Promise<SendResult> {
  const bcc = opts.bcc === undefined ? getBccRecipient() : opts.bcc;
  const subject = `${opts.subjectPrefix ?? "Nuevo lead"}: ${lead.name}`;
  const payload: Record<string, unknown> = {
    from: NOTIFY_FROM,
    to: NOTIFY_RECIPIENTS,
    subject,
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
    console.error(`[notify] resend attempt ${attempt} failed`, {
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

export async function sendAlarm(
  apiKey: string,
  lead: LeadInput & { id: string; created_at: string; attempts: number; lastError: string | null },
): Promise<SendResult> {
  const to = getAlarmRecipient();
  const ageMin = Math.round(
    (Date.now() - new Date(lead.created_at).getTime()) / 60000,
  );
  const html = [
    `<h2 style="color:#b00020">[ALARM] Lead notification stuck for ${ageMin} min</h2>`,
    `<p>Sales email for this lead has failed repeatedly. Ventas has NOT been notified through the normal channel. Follow up manually.</p>`,
    `<p><strong>Lead id:</strong> ${esc(lead.id)}</p>`,
    `<p><strong>Created:</strong> ${esc(lead.created_at)} (${ageMin} min ago)</p>`,
    `<p><strong>Retry attempts:</strong> ${lead.attempts}</p>`,
    `<p><strong>Last error:</strong> ${esc(lead.lastError ?? "(none recorded)")}</p>`,
    `<hr />`,
    `<p><strong>Nombre:</strong> ${esc(lead.name)}</p>`,
    `<p><strong>Email:</strong> ${esc(lead.email)}</p>`,
    lead.phone ? `<p><strong>Teléfono:</strong> ${esc(lead.phone)}</p>` : "",
    lead.company ? `<p><strong>Empresa:</strong> ${esc(lead.company)}</p>` : "",
    lead.message ? `<p><strong>Mensaje:</strong> ${esc(lead.message)}</p>` : "",
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
        subject: `[ALARM] Lead notification stuck: ${lead.name} (${lead.email})`,
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
