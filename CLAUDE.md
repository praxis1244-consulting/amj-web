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

## Design Context

### Users
CTOs and IT Directors evaluating cybersecurity partners. Technical decision-makers who respect precision, distrust marketing fluff, and judge credibility by design quality before reading a single word. They're comparing AMJ against international firms — the site must hold up.

### Brand Personality
**Serious · Trustworthy · Expert** — A cybersecurity authority that earns trust through restraint, not noise. Confidence expressed through what is NOT said. No exclamation marks, no "innovative solutions", no stock-photo energy.

### Aesthetic Direction
Dark editorial minimalism. Think Integrated Biosciences meets cybersecurity — generous whitespace (even in dark mode), fluid typography, scientific precision in layout. Instrument Serif for warmth and authority, Inter for clarity. Amber accents on zinc-950 feel like gold on obsidian.

**Reference:** [integratedbiosciences.com](https://integratedbiosciences.com/) — the restraint, whitespace philosophy, and fluid type hierarchy. Apply that level of refinement to AMJ's dark editorial identity.

**Anti-references:** Elementor templates, neon cyber aesthetics, "hacker green on black" tropes, stock-photo grid layouts, aggressive CTA stacking.

### Design Principles
1. **Restraint is confidence** — Every element earns its place. If removing it doesn't hurt, it shouldn't exist.
2. **Dark ≠ heavy** — Generous spacing, hairline dividers, and typography hierarchy keep the dark palette feeling open and airy, not dense.
3. **Precision over decoration** — No gratuitous animation, no rounded-full badges, no gradient overload. Each interaction should feel deliberate, like a well-engineered system.
4. **Typography carries the brand** — Headlines in Instrument Serif (light, italic) create warmth; Inter at light/regular weights keeps body text effortless to scan.
5. **Earn trust visually** — A CTO should feel "these people are meticulous" within 3 seconds of landing. Pixel-perfect alignment, consistent tokens, zero visual jank.

## Gotchas
- `.env` needs `SUPABASE_SERVICE_ROLE_KEY` and `SITE_ID` — server crashes without them
- `*.png` gitignored at root — only `public/**/*.png` is tracked
- Tailwind 4 uses `@import "tailwindcss"` not `@tailwind` directives — see `index.css`
- Dark variant uses `@custom-variant dark (&:where(.dark, .dark *))` not media query
- Fonts: Inter (sans) + Instrument Serif (serif) loaded via Google Fonts in `index.html`
- All scroll animations use `once: false` — they replay on re-entry with subtle transitions (8-12px Y offset)
- No `rounded-full` on non-circular elements — use `rounded-md` or `rounded-xl`
