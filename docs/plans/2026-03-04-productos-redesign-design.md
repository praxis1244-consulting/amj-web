# Product Page Redesign — Design Document

## Context

`productos.html` currently mirrors index.html section patterns exactly. Goal: keep the same Shari design system (Inter + Playfair, zinc palette, green-400 accent, reveal-text GSAP) but use entirely different layouts so the product page has its own identity.

**Page purpose**: Marketing / demo-driven. Emphasis on benefits and social proof, funneling to demo request.

## Design Decisions

- **Hero**: Text-dominant on white (no image card — home already owns that pattern)
- **Features**: Horizontal scroll cards (vs. home's numbered list)
- **Plans**: Minimal tier rows with single CTA (vs. home's image grid)
- **Why AMJ**: Compact trust bar in single card (vs. home's 3 separate value cards)
- **Console**: Simplified dark card showcase (no tabs, no details grid)
- **Footer**: Identical to index.html

---

## Section 1: Text-Dominant Hero

No image card. Big typography on white background.

- `pt-32 pb-16 max-w-7xl mx-auto px-6`
- Status tag: `PARTNER CERTIFICADO` + green pulse dot
- Product name L1: `text-7xl md:text-9xl font-light tracking-tight` → "Bitdefender"
- Product name L2: `font-serif italic text-7xl md:text-9xl text-zinc-400` → "GravityZone"
- Tagline: `text-xl text-zinc-500 font-light` → "Protección endpoint de clase mundial."
- 4 stat pills in a row: `border border-zinc-200 rounded-full px-4 py-2 text-sm`
  - "100% MITRE" / "500M+ Endpoints" / "#1 AV-Test" / "24/7"
- CTA button: `bg-zinc-900 text-white px-8 py-3 rounded-full`

## Section 2: Console Showcase

Dark card with dashboard mockup. No wrapping card, no tabs.

- `py-24 max-w-7xl mx-auto px-6`
- Section title (2-line): "Consola" (serif italic) + "Centralizada" (light)
- Dashboard card: `bg-zinc-900 rounded-[2rem] p-4 md:p-6` — full-width within container
  - Same internal mockup (window chrome, sidebar, stat cards, chart, threat notification)
  - Bottom overlay text inside the dark card: description + arrow link to #contacto
  - `bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent` overlay at bottom for text legibility

## Section 3: Horizontal Scroll Features

4 capabilities shown as scrollable cards.

- `py-32 max-w-7xl mx-auto px-6`
- Left title (sticky on desktop): `font-serif italic text-3xl text-zinc-400` → "Capacidades"
- Container: `flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4` with hidden scrollbar CSS
- Each card: `min-w-[300px] md:min-w-[340px] h-[420px] bg-zinc-50 rounded-[2rem] p-8 snap-start flex-shrink-0`
  - Icon: `w-12 h-12 bg-zinc-900 rounded-full text-white` with Iconify icon
  - Title: `font-serif italic text-2xl text-zinc-900 mt-6 mb-3`
  - Description: `text-zinc-500 text-sm font-light leading-relaxed`
  - Tag pills: `border border-zinc-200 rounded-full px-3 py-1 text-xs text-zinc-400 mt-auto`

Cards:
1. `solar:layers-bold-duotone` — "Protección Multi-capa" — ML, heuristic, zero-day — tags: Machine Learning, Zero-Day, Heurístico
2. `solar:shield-check-bold-duotone` — "Anti-Ransomware" — automatic rollback, backup — tags: Rollback, Backup Automático, Mitigación
3. `solar:lock-keyhole-bold-duotone` — "Defensa de Red" — network attack defense, firewall — tags: Firewall, IDS/IPS, Control de Tráfico
4. `solar:graph-up-bold-duotone` — "Gestión de Riesgos" — risk analytics, vulnerability assessment — tags: Scoring, Vulnerabilidades, Compliance

## Section 4: Awards Marquee

Keep as-is. Same icon + text marquee with seamless loop.

## Section 5: Plans — Minimal Tier Rows

Centered section with 3 rows (not image cards).

- `py-32 max-w-7xl mx-auto px-6`
- Section title: `font-serif italic text-4xl` → "Planes"
- Subtitle: `text-zinc-500 font-light text-lg`
- 3 rows inside `border-t border-zinc-100`:
  - Each row: `py-8 border-b border-zinc-100 flex items-center justify-between px-4 group hover:bg-zinc-50 cursor-pointer`
  - Left side: category label (`text-xs uppercase tracking-widest text-zinc-400`) + name (`font-serif italic text-2xl`) + "Popular" pill on Premium
  - Center: one-liner description (`text-zinc-500 text-sm`)
  - Right: arrow circle (same hover pattern as home list items)
  - All rows link to `#contacto`
- Below rows: big centered CTA `bg-zinc-900 text-white rounded-full px-8 py-4`
- Add-ons note: `text-zinc-400 text-sm`

## Section 6: Why AMJ — Compact Trust Bar

Single card with 3-column grid.

- `py-24 max-w-7xl mx-auto px-6`
- Outer: `bg-zinc-50 rounded-[2rem] p-8 md:p-12`
- Title inside: `font-serif italic text-3xl mb-8`
- 3-col grid: `grid grid-cols-1 md:grid-cols-3 gap-8`
  - Each item: icon circle (`w-10 h-10 bg-zinc-900 rounded-full text-white`) + title (`font-medium text-lg`) + one-liner (`text-zinc-500 text-sm`)
  - Items: Partner Certificado / Soporte Local / Acompañamiento Continuo

## Section 7: Footer

Identical to index.html. No changes.

---

## Shared Elements (unchanged)

- Head/boilerplate: same CDNs, Tailwind config, CSS (gradient-blur, word-wrapper, border-gradient, scrollbar)
- Progressive blur: same 6-div structure
- Nav: same, with Productos as active link
- GSAP script: same reveal-text animation

## Additional CSS needed

```css
/* Hide scrollbar for horizontal scroll features */
.scroll-hide::-webkit-scrollbar { display: none; }
.scroll-hide { -ms-overflow-style: none; scrollbar-width: none; }
```
