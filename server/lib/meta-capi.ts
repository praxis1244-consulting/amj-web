import { createHash, randomUUID } from "crypto";
import { env } from "../_core/env";

const CAPI_URL = `https://graph.facebook.com/v19.0/${env.META_PIXEL_ID}/events`;

function sha256(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

function hashPhone(phone: string): string {
  // Normalize: keep digits only, ensure country code
  const digits = phone.replace(/\D/g, "");
  return sha256(digits.startsWith("56") ? digits : `56${digits}`);
}

interface LeadEventParams {
  email: string;
  name: string;
  phone?: string | null;
  eventSourceUrl: string;
  clientIp?: string;
  clientUserAgent?: string;
  eventId?: string;
}

export function generateEventId(): string {
  return randomUUID();
}

export async function sendLeadEvent(params: LeadEventParams): Promise<void> {
  const eventId = params.eventId ?? generateEventId();
  const firstName = params.name.split(" ")[0];

  const userData: Record<string, string | string[]> = {
    em: [sha256(params.email)],
    fn: [sha256(firstName)],
    client_user_agent: params.clientUserAgent ?? "",
  };

  if (params.phone) userData.ph = [hashPhone(params.phone)];
  if (params.clientIp) userData.client_ip_address = params.clientIp;

  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        event_source_url: params.eventSourceUrl,
        user_data: userData,
      },
    ],
  };

  await fetch(`${CAPI_URL}?access_token=${env.META_CAPI_TOKEN}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(console.error);
}
