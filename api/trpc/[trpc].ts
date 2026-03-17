import type { IncomingMessage, ServerResponse } from "http";

export default async function handler(
  req: IncomingMessage & { body?: any },
  res: ServerResponse & { status: (code: number) => any; json: (data: any) => void }
) {
  // Only handle leads.create
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    // Dynamic imports to avoid bundling issues
    const { appRouter } = await import("../../server/routers");
    const { nodeHTTPRequestHandler } = await import(
      "@trpc/server/adapters/node-http"
    );

    const path = (req.url ?? "").replace(/^\/api\/trpc\//, "").split("?")[0];

    await nodeHTTPRequestHandler({
      router: appRouter,
      path,
      req,
      res,
      createContext: () => ({ req, res }) as any,
    });
  } catch (err) {
    console.error("tRPC handler error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
