-- 2026-05-11 · Attribution capture (UTM + gclid) for Google Ads campaigns
--
-- Run in Supabase SQL Editor BEFORE deploying the code that writes the gclid
-- column. The handler at api/lead.ts will log a warning and continue if the
-- column is missing, so order isn't catastrophic — but Enhanced Conversions
-- needs the column populated to work.
--
-- Idempotent: re-running is safe.

ALTER TABLE leads ADD COLUMN IF NOT EXISTS gclid text;

CREATE INDEX IF NOT EXISTS leads_gclid_idx
  ON leads (gclid)
  WHERE gclid IS NOT NULL;

CREATE INDEX IF NOT EXISTS leads_custom_fields_gin
  ON leads
  USING gin (custom_fields);

-- Verification
--   SELECT column_name, data_type
--     FROM information_schema.columns
--    WHERE table_name = 'leads' AND column_name = 'gclid';
--
--   SELECT indexname FROM pg_indexes
--    WHERE tablename = 'leads'
--      AND indexname IN ('leads_gclid_idx', 'leads_custom_fields_gin');
