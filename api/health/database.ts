import { timingSafeEqual } from "node:crypto";

const PROJECT_HOST = "dekyswplvzsbqzcdsavu.supabase.co";
const REQUEST_TIMEOUT_MS = 5_000;

function safeTokenEquals(expected: string, supplied: string): boolean {
  const expectedBytes = new Uint8Array(Buffer.from(expected));
  const suppliedBytes = new Uint8Array(Buffer.from(supplied));
  return (
    expectedBytes.length === suppliedBytes.length &&
    timingSafeEqual(expectedBytes, suppliedBytes)
  );
}

export default async function handler(req: any, res: any) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    return res.status(405).end();
  }

  const token = process.env.AMJ_DB_HEALTHCHECK_TOKEN;
  if (!token) return res.status(503).end();

  const authorization = String(req.headers?.authorization ?? "");
  const suppliedToken = authorization.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : "";
  if (!safeTokenEquals(token, suppliedToken)) return res.status(401).end();

  const rawUrl = process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!rawUrl || !serviceRoleKey) return res.status(503).end();

  let baseUrl: URL;
  try {
    baseUrl = new URL(rawUrl);
  } catch {
    return res.status(503).end();
  }
  if (baseUrl.protocol !== "https:" || baseUrl.hostname !== PROJECT_HOST) {
    return res.status(503).end();
  }

  const probeUrl = new URL("/rest/v1/leads", baseUrl);
  probeUrl.searchParams.set("select", "id");
  probeUrl.searchParams.set("limit", "1");

  try {
    const response = await fetch(probeUrl, {
      method: "HEAD",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        Accept: "application/json",
        Prefer: "count=none",
      },
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!response.ok) return res.status(503).end();
    return res.status(204).end();
  } catch {
    return res.status(503).end();
  }
}
