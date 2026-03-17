import type { IncomingMessage, ServerResponse } from "http";

export default function handler(
  _req: IncomingMessage,
  res: ServerResponse & { status: (code: number) => any; json: (data: any) => void }
) {
  res.status(200).json({
    hasSupabaseKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    hasSiteId: !!process.env.SITE_ID,
    hasResendKey: !!process.env.RESEND_API_KEY,
    hasCapiToken: !!process.env.META_CAPI_TOKEN,
    envKeys: Object.keys(process.env).filter(
      (k) =>
        k.includes("SUPA") ||
        k.includes("SITE") ||
        k.includes("RESEND") ||
        k.includes("META")
    ),
  });
}
