# AGENTS.md — Brand & Design System

Shared reference for all agents working on AMJ Ingeniería web properties.

## Company

AMJ Ingeniería — cybersecurity consultancy in Santiago, Chile (Las Condes).
15+ years, 5.361+ threats detected, 1.761+ endpoints protected.
Bitdefender Gold Partner. All copy in Spanish (es-CL).

## Brand Colors

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| Primary CTA | `bg-gradient-to-r from-[#25327D] to-[#103A8F]` | `bg-gradient-to-r from-amber-400 to-amber-500` | All primary buttons |
| CTA text | `text-white` | `text-zinc-900` | Button text |
| Accent text | `text-[#25327D]` | `text-amber-400` | Serif italic highlights |
| Background | `bg-white` / `bg-zinc-50` | `bg-zinc-950` / `bg-zinc-900` | Page / card backgrounds |
| Body text | `text-zinc-500` | `text-zinc-400` | Paragraphs, descriptions |
| Heading text | `text-zinc-900` | `text-white` | H1-H4 |
| Muted text | `text-zinc-400` | `text-zinc-500` | Labels, uppercase tracking |
| Borders | `border-zinc-200` | `border-zinc-800` | Dividers, card borders |
| Logo | `brightness-0` (makes yellow→black) | `brightness-100` (native yellow) | Nav, Footer |

## Typography

| Element | Classes |
|---------|---------|
| Sans font | `font-sans` → Inter (300, 400, 500, 600) |
| Serif font | `font-serif` → Instrument Serif (italic) |
| Hero heading | `text-5xl sm:text-6xl lg:text-[5.5rem] font-light tracking-tight` |
| Section heading | `text-4xl md:text-5xl font-light tracking-tight` |
| Accent word pattern | `font-serif italic text-[#25327D] dark:text-amber-400` |
| Body text | `text-lg font-light leading-relaxed` |
| Uppercase label | `text-[11px] uppercase tracking-[0.22em] font-medium` |
| Stat number | `text-2xl sm:text-3xl md:text-4xl font-light tracking-tight tabular-nums` |

## Design Patterns

### Editorial Layout
- No cards wrapping cards — use hairline dividers (`h-px bg-zinc-200 dark:bg-zinc-800`)
- Grid layouts with cross-hair dividers (horizontal + vertical `w-px` / `h-px`)
- Section padding: `py-32 md:py-48` for major sections
- Max width: `max-w-7xl mx-auto px-6`

### Animation Rules
- Easing: `[0.16, 1, 0.3, 1]` (ease-out-expo) for all motion
- All `whileInView` uses `once: false` — animations replay on scroll re-entry
- Entrance offsets: 8-12px Y translation (subtle, not jarring)
- Exit: fade-only, no position shift
- Stagger: 0.1s between siblings
- Duration: 0.5-0.8s for reveals, 0.3s for hovers
- Respect `useReducedMotion` — provide non-animated alternatives

### Component Conventions
- No `rounded-full` on non-circular elements — use `rounded-md` or `rounded-xl`
- Primary buttons: full-width on mobile (`w-full md:w-auto`), `min-h-[3.5rem]`, `rounded-md`
- Ghost/secondary buttons: `border border-zinc-300 dark:border-zinc-700` outline style
- Icon circles: `w-12 h-12 rounded-full border` with centered lucide icon
- Stat strips: `grid grid-cols-3` with count-up animation, centered items

### Copy Rules
- All UI copy in Spanish (es-CL)
- Never mention: Kaspersky, Microsoft 365, GravityZone as product names
- Allowed: "Bitdefender Gold Partner" as a credential (product page only)
- Use "plataformas líderes" or "marcas de renombre mundial" for generic vendor references
- Use "análisis de vulnerabilidad" not "pentesting"
- Number formatting: `toLocaleString("es-CL")` (dots for thousands)

## Static Assets

| File | Purpose |
|------|---------|
| `public/logo-iso.png` | AMJ wordmark (yellow on transparent) |
| `public/lottie-shield.json` | Hero shield animation (Lottie) |
| `public/favicon.svg` | Browser tab icon |
