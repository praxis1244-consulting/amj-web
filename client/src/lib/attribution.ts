import { useEffect } from "react";
import { useLocation } from "wouter";
import type { Attribution } from "@shared/schemas";

const STORAGE_KEY = "amj_attribution";
const TTL_MS = 90 * 24 * 60 * 60 * 1000;

const GCLID_REGEX = /^[A-Za-z0-9_-]{20,200}$/;

const UTM_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

const CLICK_ID_FIELDS = [
  "gclid",
  "gad_source",
  "wbraid",
  "gbraid",
  "fbclid",
  "li_fat_id",
] as const;

type CapturedField = (typeof UTM_FIELDS)[number] | (typeof CLICK_ID_FIELDS)[number];

const URL_LENGTH_CAP = 2048;
const UTM_LENGTH_CAP = 255;
const CLICK_ID_LENGTH_CAP = 500;

type AttributionTouch = {
  captured_at: string;
  url?: string;
  referrer?: string;
} & Partial<Record<CapturedField, string>>;

type StoredAttribution = {
  first_touch?: AttributionTouch;
  last_touch?: AttributionTouch;
};

type StoredWrapper = {
  data: StoredAttribution;
  expires_at: number;
};

let memoryFallback: StoredAttribution = {};

function safeLocalStorage(): Storage | null {
  try {
    if (typeof window === "undefined" || !window.localStorage) return null;
    const testKey = "__amj_test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return window.localStorage;
  } catch {
    return null;
  }
}

function readStorage(): StoredAttribution {
  const ls = safeLocalStorage();
  if (!ls) return memoryFallback;
  try {
    const raw = ls.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as StoredWrapper;
    if (!parsed || typeof parsed.expires_at !== "number") return {};
    if (Date.now() > parsed.expires_at) {
      ls.removeItem(STORAGE_KEY);
      return {};
    }
    return parsed.data ?? {};
  } catch {
    return {};
  }
}

function writeStorage(data: StoredAttribution): void {
  memoryFallback = data;
  const ls = safeLocalStorage();
  if (!ls) return;
  const wrapper: StoredWrapper = {
    data,
    expires_at: Date.now() + TTL_MS,
  };
  try {
    ls.setItem(STORAGE_KEY, JSON.stringify(wrapper));
  } catch {
    /* quota or serialization errors fall back to memory */
  }
}

function trimToCap(value: string, cap: number): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.length > cap ? trimmed.slice(0, cap) : trimmed;
}

function extractTouchFromUrl(url: URL): AttributionTouch | null {
  const touch: AttributionTouch = { captured_at: new Date().toISOString() };
  let hasAny = false;

  for (const field of UTM_FIELDS) {
    const raw = url.searchParams.get(field);
    if (!raw) continue;
    const clean = trimToCap(raw, UTM_LENGTH_CAP);
    if (!clean) continue;
    touch[field] = clean;
    hasAny = true;
  }

  for (const field of CLICK_ID_FIELDS) {
    const raw = url.searchParams.get(field);
    if (!raw) continue;
    const clean = trimToCap(raw, CLICK_ID_LENGTH_CAP);
    if (!clean) continue;
    if (field === "gclid" && !GCLID_REGEX.test(clean)) continue;
    touch[field] = clean;
    hasAny = true;
  }

  if (!hasAny) return null;

  const urlString = url.toString();
  if (urlString) touch.url = trimToCap(urlString, URL_LENGTH_CAP) ?? undefined;

  if (typeof document !== "undefined" && document.referrer) {
    const ref = trimToCap(document.referrer, URL_LENGTH_CAP);
    if (ref) touch.referrer = ref;
  }

  return touch;
}

export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  let url: URL;
  try {
    url = new URL(window.location.href);
  } catch {
    return;
  }
  const incoming = extractTouchFromUrl(url);
  if (!incoming) return;

  const stored = readStorage();
  const next: StoredAttribution = {
    first_touch: stored.first_touch ?? incoming,
    last_touch: incoming,
  };
  writeStorage(next);
}

export function getAttribution(): Attribution {
  const stored = readStorage();
  const last = stored.last_touch;
  const first = stored.first_touch;
  if (!last && !first) return {};

  const result: Attribution = {};
  const source = last ?? first!;

  for (const field of UTM_FIELDS) {
    if (source[field]) result[field] = source[field];
  }
  for (const field of CLICK_ID_FIELDS) {
    if (source[field]) result[field] = source[field];
  }

  if (first?.url) result.first_touch_url = first.url;
  if (last?.url) result.last_touch_url = last.url;

  const referrer = last?.referrer ?? first?.referrer;
  if (referrer) result.referrer = referrer;

  return result;
}

export function useAttributionCapture(): void {
  const [location] = useLocation();
  useEffect(() => {
    captureAttribution();
  }, [location]);
}
