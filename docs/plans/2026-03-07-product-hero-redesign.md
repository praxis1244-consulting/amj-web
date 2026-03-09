# Product Hero Redesign — "Apple Stack" with Merged Dashboard

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Merge `ProductHeroSection` and `ConsoleDashboardSection` into a single high-impact hero that shows what Bitdefender GravityZone looks like immediately on page load.

**Architecture:** The text zone (partner tag, product name, tagline, stat pills, CTA) stays on top. Below it, the GravityZone console dashboard mockup rises into view with a perspective tilt, blue ambient glow, and a gradient fade at the bottom. The standalone `ConsoleDashboardSection` is deleted. On mobile, the dashboard is simplified to stat cards + shield status (no sidebar, no chart).

**Tech Stack:** React, Tailwind CSS v4, framer-motion, lucide-react

---

### Task 1: Rewrite ProductHeroSection with merged dashboard

**Files:**
- Modify: `client/src/components/sections/ProductHeroSection.tsx` (full rewrite)

**Step 1: Replace the contents of `ProductHeroSection.tsx` with the merged component**

```tsx
import { ArrowRight, ShieldCheck } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import RevealText from "@/components/ui/RevealText";

const barHeights = [30, 45, 25, 60, 35, 80, 50, 40, 65, 30, 55, 70, 20, 15];

export default function ProductHeroSection() {
  const dashRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(dashRef, { once: true, margin: "-10% 0px" });

  return (
    <header className="pt-32 pb-0 max-w-7xl mx-auto px-6 overflow-hidden">
      {/* Status Tag */}
      <div className="flex items-center gap-2 mb-8">
        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
        <span className="text-xs font-medium tracking-wide text-zinc-500 dark:text-zinc-400 uppercase">
          Partner Certificado
        </span>
      </div>

      {/* Product Name */}
      <h1 className="text-5xl md:text-7xl lg:text-9xl font-light tracking-tight leading-[0.9] mb-2">
        <RevealText text="Bitdefender" />
      </h1>
      <h1 className="font-serif font-normal text-zinc-400 dark:text-zinc-500 text-5xl md:text-7xl lg:text-9xl tracking-tight leading-[0.9]">
        <RevealText text="GravityZone" />
      </h1>

      {/* Tagline */}
      <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 font-light mt-8 max-w-xl">
        Protección endpoint de clase mundial. Distribuido por AMJ Ingeniería en
        Chile.
      </p>

      {/* Stat Pills */}
      <div className="flex flex-wrap gap-2 md:gap-3 mt-8 md:mt-10">
        <span className="border border-zinc-200 dark:border-zinc-700 rounded-full px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-zinc-600 dark:text-zinc-300 font-medium">
          100% MITRE
        </span>
        <span className="border border-zinc-200 dark:border-zinc-700 rounded-full px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-zinc-600 dark:text-zinc-300 font-medium">
          500M+ Endpoints
        </span>
        <span className="border border-zinc-200 dark:border-zinc-700 rounded-full px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-zinc-600 dark:text-zinc-300 font-medium">
          #1 AV-Test
        </span>
        <span className="border border-zinc-200 dark:border-zinc-700 rounded-full px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-green-600 dark:text-green-400 font-medium">
          24/7
        </span>
      </div>

      {/* CTA */}
      <div className="mt-8 md:mt-10">
        <a
          href="#contacto"
          className="inline-flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-8 py-3.5 rounded-full text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
        >
          Solicitar Demo
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* Dashboard Zone */}
      <div ref={dashRef} className="relative mt-12 md:mt-16">
        {/* Blue ambient glow */}
        <div className="absolute inset-x-10 top-10 bottom-0 bg-blue-500/20 dark:bg-blue-500/25 blur-3xl rounded-full pointer-events-none" />

        {/* Dashboard with perspective tilt */}
        <motion.div
          style={{ perspective: 1200 }}
          initial={{ opacity: 0, y: 60 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 60 }
          }
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="bg-zinc-900 rounded-t-2xl sm:rounded-t-[2rem] overflow-hidden"
            style={{ transform: "rotateX(4deg)" }}
          >
            {/* Window Chrome */}
            <div className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-3 sm:py-4 border-b border-zinc-800">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-zinc-700" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-zinc-700" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-zinc-700" />
              <span className="ml-3 sm:ml-4 text-[10px] sm:text-xs text-zinc-500 font-medium">
                GravityZone Console
              </span>
            </div>

            <div className="flex overflow-hidden">
              {/* Sidebar — hidden on mobile */}
              <div className="w-16 md:w-48 border-r border-zinc-800 p-4 hidden sm:flex flex-col gap-4">
                <div className="flex items-center gap-3 text-white text-sm px-2 py-2 bg-zinc-800 rounded-lg">
                  <svg
                    className="w-[18px] h-[18px]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                  <span className="hidden md:inline">Dashboard</span>
                </div>
                {["Protección", "Endpoints", "Reportes"].map((label) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 text-zinc-500 text-sm px-2 py-2"
                  >
                    <div className="w-[18px] h-[18px]" />
                    <span className="hidden md:inline">{label}</span>
                  </div>
                ))}
              </div>

              {/* Main Content */}
              <div className="flex-1 p-4 sm:p-6">
                {/* Stat Cards */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <div className="bg-zinc-800 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <p className="text-zinc-500 text-[10px] sm:text-xs mb-1">
                      Endpoints Activos
                    </p>
                    <p className="text-white text-lg sm:text-2xl font-light">
                      847
                    </p>
                    <p className="text-green-400 text-[10px] sm:text-xs mt-1">
                      +12 esta semana
                    </p>
                  </div>
                  <div className="bg-zinc-800 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <p className="text-zinc-500 text-[10px] sm:text-xs mb-1">
                      Amenazas Bloqueadas
                    </p>
                    <p className="text-white text-lg sm:text-2xl font-light">
                      2,341
                    </p>
                    <p className="text-green-400 text-[10px] sm:text-xs mt-1">
                      100% detectadas
                    </p>
                  </div>
                  <div className="bg-zinc-800 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <p className="text-zinc-500 text-[10px] sm:text-xs mb-1">
                      Score de Riesgo
                    </p>
                    <p className="text-white text-lg sm:text-2xl font-light">
                      94
                      <span className="text-[10px] sm:text-sm text-zinc-500">
                        /100
                      </span>
                    </p>
                    <p className="text-green-400 text-[10px] sm:text-xs mt-1">
                      Excelente
                    </p>
                  </div>
                </div>

                {/* Chart — hidden on mobile */}
                <div className="bg-zinc-800 rounded-xl p-4 mb-4 h-48 hidden sm:flex flex-col">
                  <p className="text-zinc-500 text-xs mb-4">
                    Actividad de Amenazas — Últimos 30 días
                  </p>
                  <div className="flex-1 flex items-end gap-1.5">
                    {barHeights.map((h, i) => (
                      <div
                        key={i}
                        className={`flex-1 ${i >= 12 ? "bg-zinc-600" : "bg-zinc-700"} rounded-sm`}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Shield Status */}
                <div className="bg-zinc-800 rounded-lg sm:rounded-xl p-3 sm:p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-400/10 rounded-full flex items-center justify-center">
                      <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white text-xs sm:text-sm">
                        Todos los endpoints protegidos
                      </p>
                      <p className="text-zinc-500 text-[10px] sm:text-xs">
                        Última verificación: hace 2 min
                      </p>
                    </div>
                  </div>
                  <span className="text-green-400 text-[10px] sm:text-xs font-medium bg-green-400/10 px-2 sm:px-3 py-1 rounded-full">
                    Seguro
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white dark:from-zinc-950 via-white/80 dark:via-zinc-950/80 to-transparent pointer-events-none" />
      </div>
    </header>
  );
}
```

**Step 2: Verify the component renders**

Run: `cd /home/alonso/projects/amj-web && npx tsc --noEmit`
Expected: No type errors

**Step 3: Commit**

```bash
git add client/src/components/sections/ProductHeroSection.tsx
git commit -m "feat: merge dashboard into product hero with perspective tilt and glow"
```

---

### Task 2: Remove ConsoleDashboardSection

**Files:**
- Delete: `client/src/components/sections/ConsoleDashboardSection.tsx`
- Modify: `client/src/pages/products.tsx`

**Step 1: Update `products.tsx` to remove the import and usage**

Remove line 5 (`import ConsoleDashboardSection`) and line 19 (`<ConsoleDashboardSection />`). The resulting file:

```tsx
import ProgressiveBlur from "@/components/layout/ProgressiveBlur";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ProductHeroSection from "@/components/sections/ProductHeroSection";
import FeaturesScrollSection from "@/components/sections/FeaturesScrollSection";
import AwardsMarquee from "@/components/sections/AwardsMarquee";
import PlansSection from "@/components/sections/PlansSection";
import WhyAmjSection from "@/components/sections/WhyAmjSection";
import ContactFormD from "@/components/sections/ContactFormD";

export default function ProductsPage() {
  return (
    <>
      <ProgressiveBlur />
      <Nav />
      <main>
        <ProductHeroSection />
        <FeaturesScrollSection />
        <AwardsMarquee />
        <PlansSection />
        <WhyAmjSection />
        <ContactFormD />
      </main>
      <Footer />
    </>
  );
}
```

**Step 2: Delete `ConsoleDashboardSection.tsx`**

```bash
rm client/src/components/sections/ConsoleDashboardSection.tsx
```

**Step 3: Verify no broken imports**

Run: `cd /home/alonso/projects/amj-web && npx tsc --noEmit`
Expected: No errors

**Step 4: Commit**

```bash
git add client/src/pages/products.tsx
git rm client/src/components/sections/ConsoleDashboardSection.tsx
git commit -m "refactor: remove standalone ConsoleDashboardSection (merged into hero)"
```

---

### Task 3: Visual QA

**Step 1: Start dev server and check desktop**

Run: `cd /home/alonso/projects/amj-web && npm run dev`

Open the products page in browser. Verify:
- Text zone renders with RevealText animations
- Dashboard rises into view with tilt after text finishes
- Blue glow is visible behind dashboard
- Gradient fade hides bottom edge cleanly
- Sidebar + chart + stat cards + shield status all visible
- Light/dark mode both work

**Step 2: Check mobile (375px width)**

Resize to 375px or use dev tools mobile view. Verify:
- Title scales down to `text-5xl`
- Stat pills use smaller padding
- Dashboard: no sidebar, no chart
- Stat cards show 3-across with compact text
- Shield status bar visible
- Tilt is subtler (4deg still works at this width via CSS)
- Nothing overflows horizontally

**Step 3: Fix any issues found, commit if needed**

```bash
git add -u
git commit -m "fix: visual QA adjustments for product hero"
```
