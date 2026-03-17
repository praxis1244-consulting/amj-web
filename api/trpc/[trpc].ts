import { nodeHTTPRequestHandler } from "@trpc/server/adapters/node-http";
import { appRouter } from "../../server/routers";
import type { IncomingMessage, ServerResponse } from "http";

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  const path = req.url?.replace(/^\/api\/trpc\//, "").split("?")[0] ?? "";

  await nodeHTTPRequestHandler({
    router: appRouter,
    path,
    req,
    res,
    createContext: () => ({ req, res } as any),
  });
}
