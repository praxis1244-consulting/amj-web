# CLAUDE.md

Read AGENTS.md for brand guidelines, colors, typography, and design system.

## Stack
React 19 · Tailwind 4 · Framer Motion · Wouter · tRPC · Express 5 · Supabase · Vite 6 · pnpm

## Domain
| Term | Meaning |
|------|---------|
| Lead | Contact form submission → Supabase `leads` table |
| SITE_ID | UUID linking leads to this site in multi-site Supabase setup |
| GravityZone | Bitdefender product — only mention as "Gold Partner" credential, never as product listing |

## Invariants
| Rule | Files |
|------|-------|
| No brand names in copy (Kaspersky, Microsoft 365) — only "Bitdefender Gold Partner" as credential | All section components |
| No "pentesting" — use "análisis de vulnerabilidad" | `ServicesSection.tsx` |
| Dark theme default — `if(t!=='light')` adds `.dark` class | `index.html` line 5 |
| Theme toggle: class-based `.dark` on `<html>`, persists to `localStorage.theme` | `useTheme.ts` · `index.html` |
| Logo brightness filter: `brightness-0` (light) · `brightness-100` (dark) | `Nav.tsx` · `Footer.tsx` |
| CTA colors: navy gradient light `#25327D→#103A8F` · amber gradient dark `amber-400→amber-500` | All CTA buttons |
| Supabase URL hardcoded in client (anon key), server uses env `SUPABASE_SERVICE_ROLE_KEY` | `client/lib/supabase.ts` · `server/db.ts` |
| Lead insert requires `site_id` from env | `server/leads/router.ts` · `server/_core/env.ts` |

## Commands
| Action | Command |
|--------|---------|
| Dev (full) | `pnpm dev` |
| Dev (client) | `pnpm dev:client` |
| Build | `pnpm build` |
| Preview | `pnpm preview` |

## Gotchas
- `.env` needs `SUPABASE_SERVICE_ROLE_KEY` and `SITE_ID` — server crashes without them
- `*.png` gitignored at root — only `public/**/*.png` is tracked
- Tailwind 4 uses `@import "tailwindcss"` not `@tailwind` directives — see `index.css`
- Dark variant uses `@custom-variant dark (&:where(.dark, .dark *))` not media query
- Fonts: Inter (sans) + Instrument Serif (serif) loaded via Google Fonts in `index.html`
- All scroll animations use `once: false` — they replay on re-entry with subtle transitions (8-12px Y offset)
- No `rounded-full` on non-circular elements — use `rounded-md` or `rounded-xl`
