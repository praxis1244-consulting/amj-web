import { createClient } from "@supabase/supabase-js";
import {
  sendNotification,
  sendAlarm,
  type LeadInput,
} from "../_lib/notify";

// Recovery cron — runs every 5 min. For each lead in the last 48h that has no
// notification_sent_at, retry the send. If a lead has been stuck for more
// than 15 min, send a one-time [ALARM] email to a human so silent failures
// can't persist beyond that window.
//
// Guards:
//  - Window capped at 48h so we don't spam retries forever.
//  - Per-lead work is idempotent-ish: on success we set notification_sent_at,
//    preventing future runs from re-sending. In the worst case (state update
//    fails after a successful send) a lead gets duplicate emails — better
//    than missing a lead.
//  - Alarm is sent at most once per lead, guarded by notification_alarm_sent_at.

const ALARM_THRESHOLD_MS = 15 * 60 * 1000;
const WINDOW_MS = 48 * 60 * 60 * 1000;
const MAX_PER_RUN = 50;

function isAuthorized(req: any): boolean {
  // Vercel cron sends an auth header we can optionally verify. If CRON_SECRET
  // is set, require it. If not set, accept Vercel's internal cron signal
  // (user-agent) so the cron still works before the secret is configured.
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers?.authorization ?? "";
    if (auth === `Bearer ${secret}`) return true;
    // Also accept Vercel's header variant
    const vcHeader = req.headers?.["x-vercel-cron-secret"];
    if (vcHeader === secret) return true;
    return false;
  }
  // No secret configured — require at least that the call looks like a
  // known scheduler (Vercel cron or GitHub Actions) to prevent drive-by
  // traffic. Set CRON_SECRET in prod to tighten this.
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

  // Pull recent leads; filter for missing notification_sent_at in app code
  // because PostgREST's JSONB operators can be finicky across client versions.
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

    const sendRes = await sendNotification(RESEND_KEY, lead, {
      subjectPrefix: "Nuevo lead (recuperado)",
    });

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

    // Still failing — persist state and consider alarm.
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
