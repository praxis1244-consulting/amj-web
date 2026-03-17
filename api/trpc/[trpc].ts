import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "../../server/routers";
import { createContext } from "../../server/_core/context";
import type { IncomingMessage, ServerResponse } from "http";
import express from "express";

const app = express();
app.use(
  "/api/trpc",
  createExpressMiddleware({ router: appRouter, createContext })
);

export default function handler(req: IncomingMessage, res: ServerResponse) {
  req.url = req.url?.replace(/^\/api\/trpc/, "") || "/";
  return app(req as any, res as any);
}
