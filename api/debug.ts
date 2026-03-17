import type { IncomingMessage, ServerResponse } from "http";

export default async function handler(
  _req: IncomingMessage,
  res: ServerResponse & { status: (code: number) => any; json: (data: any) => void }
) {
  try {
    const { appRouter } = await import("../server/routers");
    res.status(200).json({ ok: true, procedures: Object.keys(appRouter._def.procedures) });
  } catch (err: any) {
    res.status(500).json({ error: err?.message, stack: err?.stack?.split("\n").slice(0, 5) });
  }
}
