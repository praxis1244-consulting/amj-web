import { nodeHTTPRequestHandler } from "@trpc/server/adapters/node-http";
import { appRouter } from "../../server/routers";
import type { IncomingMessage, ServerResponse } from "http";

export default async function handler(
  req: IncomingMessage & { body?: any },
  res: ServerResponse & { status: (code: number) => any; json: (data: any) => void }
) {
  if (req.method !== "POST" && req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const path = (req.url ?? "").replace(/^\/api\/trpc\//, "").split("?")[0];

  await nodeHTTPRequestHandler({
    router: appRouter,
    path,
    req,
    res,
    createContext: () => ({ req, res }) as any,
  });
}
