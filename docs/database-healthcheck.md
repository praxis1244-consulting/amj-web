# AMJ database health check

This check targets the confirmed production Supabase project
`dekyswplvzsbqzcdsavu` used by `www.amjingenieria.cl`. Vercel's Domains
settings show the apex `amjingenieria.cl` redirects with HTTP 307 to `www`;
the workflow calls `www` directly and does not follow redirects.

## What it checks

`GET /api/health/database` requires the `AMJ_DB_HEALTHCHECK_TOKEN` bearer
secret. It makes one five-second, read-only PostgREST `HEAD` request against
`public.leads`, selecting only `id` with `limit=1`. It returns `204` on success
and a bodyless `503` on configuration, timeout, network, or database failure.
It does not return lead data or write to the database. The service-role key
stays in Vercel and is never added to GitHub.

GitHub Actions calls the endpoint at minute 13 every six hours (`13 */6 * *
*`). Failed runs use the account's existing failed-workflow GitHub/email
notifications. Each failed scheduled run can send another notification; this
implementation does not deduplicate repeated outage alerts.

Scheduled checks are gated by the non-secret GitHub repository variable
`AMJ_DB_HEALTHCHECK_ENABLED`. An unset or non-`true` value keeps scheduled jobs
skipped. Manual workflow dispatch remains available while this gate is off.

## Activate safely

Before merging the scheduled workflow, generate a fresh random 32-byte token
locally (for example, with `openssl rand -hex 32`) and enter the same value
directly in both secret forms. Do not commit or send the value in chat.

1. In Vercel, open team **Praxis' projects Hobby** → project **amj-web** →
   **Settings** → **Environment Variables**. Add
   `AMJ_DB_HEALTHCHECK_TOKEN` for **Production** only.
2. In GitHub, open `praxis1244-consulting/amj-web` → **Settings** → **Secrets
   and variables** → **Actions** → **New repository secret**. Name it
   `AMJ_DB_HEALTHCHECK_TOKEN` and enter the same token.
3. Once both secrets are saved, merge the health-check change. The schedule
   remains gated off by default. A missing token never reaches Supabase; the
   workflow explicitly refuses the probe.
4. In Actions → **AMJ database health check** → **Run workflow**, select
   `simulate_failure=true` to verify the owner-only GitHub failure email path.
   That run intentionally fails before making an HTTP request. Then dispatch
   again with `simulate_failure=false` to verify the deployed endpoint and
   production database connection.
5. After both manual checks succeed, open GitHub **Settings → Secrets and
   variables → Actions → Variables** and create repository variable
   `AMJ_DB_HEALTHCHECK_ENABLED` with value `true`. Scheduled checks then begin
   at the next six-hour cron slot.

The manual failure simulation must be dispatched by the same verified owner
account that will own schedule notifications. A failed run confirms GitHub
created the failed-run event; verify the email reached the owner's inbox
before enabling the schedule.

The Vercel project already has a service-role key; it is used only server-side
for the bounded read. Keep its value in Vercel. The new token authorizes only
the application health route, but it is a bearer token and should be stored
only in the two named secret fields.

## Disable

In GitHub, open Actions → **AMJ database health check** → the workflow menu
(**…**) → **Disable workflow** to stop schedules and manual runs. To pause
only scheduled checks while retaining manual verification, change repository
variable `AMJ_DB_HEALTHCHECK_ENABLED` to anything other than `true` or remove
it. To remove the endpoint as well, revert the change and redeploy AMJ.

Free-plan inactivity protection is best-effort; periodic checks do not
guarantee that Supabase will keep the project unpaused.
