import assert from "node:assert/strict";
import { test } from "node:test";
import handler from "../api/health/database.ts";

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
