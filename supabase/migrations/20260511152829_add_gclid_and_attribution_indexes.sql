-- 2026-05-11 · Attribution capture (UTM + gclid) for Google Ads campaigns.
-- Idempotent: re-running is safe.

ALTER TABLE leads ADD COLUMN IF NOT EXISTS gclid text;

CREATE INDEX IF NOT EXISTS leads_gclid_idx
  ON leads (gclid)
  WHERE gclid IS NOT NULL;

CREATE INDEX IF NOT EXISTS leads_custom_fields_gin
  ON leads
  USING gin (custom_fields);
