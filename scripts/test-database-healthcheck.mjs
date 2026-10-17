import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import handler from "../api/health/database.ts";

const workflow = await readFile(
  new URL("../.github/workflows/database-healthcheck.yml", import.meta.url),
  "utf8",
);

function responseRecorder() {
  return {
    code: undefined,
    headers: {},
    ended: false,
    setHeader(name, value) {
      this.headers[name] = value;
    },
    status(code) {
      this.code = code;
      return this;
    },
    end() {
      this.ended = true;
      return this;
    },
  };
}

const priorEnv = { ...process.env };
const priorFetch = globalThis.fetch;

test.afterEach(() => {
  process.env = { ...priorEnv };
  globalThis.fetch = priorFetch;
});

test("rejects an unauthenticated request without querying the database", async () => {
  process.env.AMJ_DB_HEALTHCHECK_TOKEN = "expected-token";
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    throw new Error("should not be called");
  };

  const res = responseRecorder();
  await handler({ method: "GET", headers: {} }, res);

  assert.equal(res.code, 401);
  assert.equal(res.ended, true);
  assert.equal(calls, 0);
});

test("fails closed when the endpoint token is absent", async () => {
  delete process.env.AMJ_DB_HEALTHCHECK_TOKEN;
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    throw new Error("should not be called");
  };

  const res = responseRecorder();
  await handler({ method: "GET", headers: {} }, res);

  assert.equal(res.code, 503);
  assert.equal(res.ended, true);
  assert.equal(calls, 0);
});

test("allows only a bounded HEAD probe against the verified project", async () => {
  process.env.AMJ_DB_HEALTHCHECK_TOKEN = "expected-token";
  process.env.VITE_SUPABASE_URL = "https://dekyswplvzsbqzcdsavu.supabase.co";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "service-role-test-value";
  let request;
  globalThis.fetch = async (url, options) => {
    request = { url, options };
    return { ok: true };
  };

  const res = responseRecorder();
  await handler(
    { method: "GET", headers: { authorization: "Bearer expected-token" } },
    res,
  );

  assert.equal(res.code, 204);
  assert.equal(res.ended, true);
  assert.equal(request.options.method, "HEAD");
  assert.equal(request.url.hostname, "dekyswplvzsbqzcdsavu.supabase.co");
  assert.equal(request.url.pathname, "/rest/v1/leads");
  assert.equal(request.url.searchParams.get("select"), "id");
  assert.equal(request.url.searchParams.get("limit"), "1");
  assert.equal(request.options.headers.apikey, "service-role-test-value");
  assert.equal(request.options.headers.Authorization, "Bearer service-role-test-value");
  assert.equal(request.options.redirect, "error");
  assert.equal(request.options.signal.aborted, false);
});

test("returns a generic failure when the database probe fails", async () => {
  process.env.AMJ_DB_HEALTHCHECK_TOKEN = "expected-token";
  process.env.VITE_SUPABASE_URL = "https://dekyswplvzsbqzcdsavu.supabase.co";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "service-role-test-value";
  globalThis.fetch = async () => ({ ok: false, status: 500 });

  const res = responseRecorder();
  await handler(
    { method: "GET", headers: { authorization: "Bearer expected-token" } },
    res,
  );

  assert.equal(res.code, 503);
  assert.equal(res.ended, true);
});

test("refuses a configured URL for a different Supabase project", async () => {
  process.env.AMJ_DB_HEALTHCHECK_TOKEN = "expected-token";
  process.env.VITE_SUPABASE_URL = "https://other-project.supabase.co";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "service-role-test-value";
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    throw new Error("should not be called");
  };

  const res = responseRecorder();
  await handler(
    { method: "GET", headers: { authorization: "Bearer expected-token" } },
    res,
  );

  assert.equal(res.code, 503);
  assert.equal(calls, 0);
});

test("rejects unsupported methods", async () => {
  process.env.AMJ_DB_HEALTHCHECK_TOKEN = "expected-token";
  const res = responseRecorder();
  await handler({ method: "POST", headers: {} }, res);
  assert.equal(res.code, 405);
  assert.equal(res.headers.Allow, "GET, HEAD");
});

test("scheduled runs stay gated until enabled; manual verification bypasses the gate", () => {
  const expression =
    "if: ${{ github.event_name == 'workflow_dispatch' || vars.AMJ_DB_HEALTHCHECK_ENABLED == 'true' }}";
  assert.ok(workflow.includes(expression));
  assert.match(workflow, /schedule:\s*\n\s+- cron: "13 \*\/6 \* \* \*"/);

  const shouldRun = (eventName, enabled) =>
    eventName === "workflow_dispatch" || enabled === "true";
  assert.equal(shouldRun("schedule", undefined), false);
  assert.equal(shouldRun("schedule", "false"), false);
  assert.equal(shouldRun("schedule", "true"), true);
  assert.equal(shouldRun("workflow_dispatch", undefined), true);
});

test("workflow targets the canonical host and does not follow redirects", () => {
  assert.ok(workflow.includes("https://www.amjingenieria.cl/api/health/database"));
  assert.match(workflow, /--max-redirs 0/);
  assert.doesNotMatch(workflow, /curl[^\n]*\s-L(?:\s|\\|$)/);
});

test("redirect responses fail without forwarding service-role authorization", async () => {
  process.env.AMJ_DB_HEALTHCHECK_TOKEN = "expected-token";
  process.env.VITE_SUPABASE_URL = "https://dekyswplvzsbqzcdsavu.supabase.co";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "service-role-test-value";
  globalThis.fetch = async (_url, options) => {
    assert.equal(options.redirect, "error");
    throw new TypeError("redirect rejected");
  };

  const res = responseRecorder();
  await handler(
    { method: "GET", headers: { authorization: "Bearer expected-token" } },
    res,
  );

  assert.equal(res.code, 503);
  assert.equal(res.ended, true);
});
