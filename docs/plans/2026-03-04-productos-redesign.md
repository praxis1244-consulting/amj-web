# Product Page Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite `productos.html` with unique layouts per section while keeping the Shari design system, so it feels like the same site as `index.html` but not a copy of it.

**Architecture:** Single HTML file rewrite. Same CDNs, Tailwind config, CSS, and GSAP script as `index.html`. Every middle section uses a different layout pattern than the homepage. One additional CSS rule for hidden scrollbar on horizontal scroll.

**Tech Stack:** Tailwind CSS (CDN), GSAP + ScrollTrigger, Iconify (Solar icons), Google Fonts (Inter + Playfair Display)

---

### Task 1: Head, CSS, Progressive Blur, and Nav

**Files:**
- Modify: `productos.html` (full rewrite — replace everything)

**Step 1: Write the head, styles, progressive blur, and navigation**

Replace the entire file content. The head block, CSS, progressive blur, and nav are identical to `index.html` with these differences:
- `<title>`: "Bitdefender GravityZone — AMJ Ingeniería"
- `<meta description>`: product-specific
- Nav: "Productos" link has `text-black` (active), "Inicio" links to `index.html`, brand name is an `<a>` to `index.html`
- CTA says "Demo Gratis"
- Add `.scroll-hide` CSS class for hidden scrollbar

Add this CSS rule inside the existing `<style>` block, after the scrollbar rules:

```css
/* Hide scrollbar for horizontal scroll */
.scroll-hide::-webkit-scrollbar { display: none; }
.scroll-hide { -ms-overflow-style: none; scrollbar-width: none; }
```

**Step 2: Verify in browser**

Open `productos.html` — should see white page with nav and progressive blur. Nav should look identical to index.html.

**Step 3: Commit**

```bash
git add productos.html
git commit -m "feat(productos): scaffold head, CSS, nav — matching index.html design system"
```

---

### Task 2: Text-Dominant Hero

**Files:**
- Modify: `productos.html` (add after `</nav>`)

**Step 1: Write the hero section**

```html
<!-- Hero Section -->
<header class="pt-32 pb-16 max-w-7xl mx-auto px-6">
    <!-- Status Tag -->
    <div class="flex items-center gap-2 mb-8">
        <span class="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
        <span class="text-xs font-medium tracking-wide text-zinc-500 uppercase">Partner Certificado</span>
    </div>

    <!-- Product Name -->
    <h1 class="reveal-text text-7xl md:text-9xl font-light tracking-tight leading-[0.9] mb-2">
        Bitdefender
    </h1>
    <h1 class="font-serif italic font-normal text-zinc-400 text-7xl md:text-9xl tracking-tight leading-[0.9]">
        <span class="reveal-text">GravityZone</span>
    </h1>

    <!-- Tagline -->
    <p class="text-xl text-zinc-500 font-light mt-8 max-w-xl">
        Protección endpoint de clase mundial. Distribuido por AMJ Ingeniería en Chile.
    </p>

    <!-- Stat Pills -->
    <div class="flex flex-wrap gap-3 mt-10">
        <span class="border border-zinc-200 rounded-full px-4 py-2 text-sm text-zinc-600 font-medium">100% MITRE</span>
        <span class="border border-zinc-200 rounded-full px-4 py-2 text-sm text-zinc-600 font-medium">500M+ Endpoints</span>
        <span class="border border-zinc-200 rounded-full px-4 py-2 text-sm text-zinc-600 font-medium">#1 AV-Test</span>
        <span class="border border-zinc-200 rounded-full px-4 py-2 text-sm text-green-600 font-medium">24/7</span>
    </div>

    <!-- CTA -->
    <div class="mt-10">
        <a href="#contacto" class="inline-flex items-center gap-2 bg-zinc-900 text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors">
            Solicitar Demo
            <iconify-icon icon="solar:arrow-right-linear" class="text-lg"></iconify-icon>
        </a>
    </div>
</header>
```

**Step 2: Verify in browser**

Big "Bitdefender / GravityZone" text on white. Status tag, tagline, stat pills, and CTA button below. No image card. GSAP reveal-text should animate on load.

**Step 3: Commit**

```bash
git add productos.html
git commit -m "feat(productos): add text-dominant hero with stat pills"
```

---

### Task 3: Console Showcase

**Files:**
- Modify: `productos.html` (add after `</header>`)

**Step 1: Write the console section**

```html
<!-- Console Section -->
<section class="py-24 max-w-7xl mx-auto px-6">
    <!-- Section Title -->
    <div class="mb-12">
        <h2 class="reveal-text font-serif italic text-4xl text-zinc-900">Consola</h2>
        <h2 class="reveal-text text-4xl font-light tracking-tight text-zinc-400">Centralizada</h2>
    </div>

    <!-- Dashboard Card -->
    <div class="relative bg-zinc-900 rounded-[2rem] overflow-hidden">
        <div class="w-full flex flex-col">
            <!-- Window Chrome -->
            <div class="flex items-center gap-2 px-6 py-4 border-b border-zinc-800">
                <div class="w-3 h-3 rounded-full bg-zinc-700"></div>
                <div class="w-3 h-3 rounded-full bg-zinc-700"></div>
                <div class="w-3 h-3 rounded-full bg-zinc-700"></div>
                <span class="ml-4 text-xs text-zinc-500 font-medium">GravityZone Console</span>
            </div>
            <div class="flex overflow-hidden">
                <!-- Sidebar -->
                <div class="w-16 md:w-48 border-r border-zinc-800 p-4 hidden sm:flex flex-col gap-4">
                    <div class="flex items-center gap-3 text-white text-sm px-2 py-2 bg-zinc-800 rounded-lg">
                        <iconify-icon icon="solar:chart-square-bold-duotone" width="18"></iconify-icon>
                        <span class="hidden md:inline">Dashboard</span>
                    </div>
                    <div class="flex items-center gap-3 text-zinc-500 text-sm px-2 py-2">
                        <iconify-icon icon="solar:shield-check-bold-duotone" width="18"></iconify-icon>
                        <span class="hidden md:inline">Protección</span>
                    </div>
                    <div class="flex items-center gap-3 text-zinc-500 text-sm px-2 py-2">
                        <iconify-icon icon="solar:monitor-bold-duotone" width="18"></iconify-icon>
                        <span class="hidden md:inline">Endpoints</span>
                    </div>
                    <div class="flex items-center gap-3 text-zinc-500 text-sm px-2 py-2">
                        <iconify-icon icon="solar:document-bold-duotone" width="18"></iconify-icon>
                        <span class="hidden md:inline">Reportes</span>
                    </div>
                </div>
                <!-- Main Content -->
                <div class="flex-1 p-6">
                    <!-- Stat Cards -->
                    <div class="grid grid-cols-3 gap-4 mb-6">
                        <div class="bg-zinc-800 rounded-xl p-4">
                            <p class="text-zinc-500 text-xs mb-1">Endpoints Activos</p>
                            <p class="text-white text-2xl font-light">847</p>
                            <p class="text-green-400 text-xs mt-1">+12 esta semana</p>
                        </div>
                        <div class="bg-zinc-800 rounded-xl p-4">
                            <p class="text-zinc-500 text-xs mb-1">Amenazas Bloqueadas</p>
                            <p class="text-white text-2xl font-light">2,341</p>
                            <p class="text-green-400 text-xs mt-1">100% detectadas</p>
                        </div>
                        <div class="bg-zinc-800 rounded-xl p-4">
                            <p class="text-zinc-500 text-xs mb-1">Score de Riesgo</p>
                            <p class="text-white text-2xl font-light">94<span class="text-sm text-zinc-500">/100</span></p>
                            <p class="text-green-400 text-xs mt-1">Excelente</p>
                        </div>
                    </div>
                    <!-- Chart -->
                    <div class="bg-zinc-800 rounded-xl p-4 mb-4 h-48 flex flex-col">
                        <p class="text-zinc-500 text-xs mb-4">Actividad de Amenazas — Últimos 30 días</p>
                        <div class="flex-1 flex items-end gap-1.5">
                            <div class="flex-1 bg-zinc-700 rounded-sm" style="height: 30%"></div>
                            <div class="flex-1 bg-zinc-700 rounded-sm" style="height: 45%"></div>
                            <div class="flex-1 bg-zinc-700 rounded-sm" style="height: 25%"></div>
                            <div class="flex-1 bg-zinc-700 rounded-sm" style="height: 60%"></div>
                            <div class="flex-1 bg-zinc-700 rounded-sm" style="height: 35%"></div>
                            <div class="flex-1 bg-zinc-700 rounded-sm" style="height: 80%"></div>
                            <div class="flex-1 bg-zinc-700 rounded-sm" style="height: 50%"></div>
                            <div class="flex-1 bg-zinc-700 rounded-sm" style="height: 40%"></div>
                            <div class="flex-1 bg-zinc-700 rounded-sm" style="height: 65%"></div>
                            <div class="flex-1 bg-zinc-700 rounded-sm" style="height: 30%"></div>
                            <div class="flex-1 bg-zinc-700 rounded-sm" style="height: 55%"></div>
                            <div class="flex-1 bg-zinc-700 rounded-sm" style="height: 70%"></div>
                            <div class="flex-1 bg-zinc-600 rounded-sm" style="height: 20%"></div>
                            <div class="flex-1 bg-zinc-600 rounded-sm" style="height: 15%"></div>
                        </div>
                    </div>
                    <!-- Threat Notification -->
                    <div class="bg-zinc-800 rounded-xl p-4 flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 bg-green-400/10 rounded-full flex items-center justify-center">
                                <iconify-icon icon="solar:shield-check-bold-duotone" class="text-green-400" width="16"></iconify-icon>
                            </div>
                            <div>
                                <p class="text-white text-sm">Todos los endpoints protegidos</p>
                                <p class="text-zinc-500 text-xs">Última verificación: hace 2 min</p>
                            </div>
                        </div>
                        <span class="text-green-400 text-xs font-medium bg-green-400/10 px-3 py-1 rounded-full">Seguro</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom Overlay with Description -->
        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-zinc-900 via-zinc-900/90 to-transparent p-8 md:p-12 pt-24">
            <div class="flex flex-col md:flex-row items-end justify-between gap-6">
                <p class="text-zinc-400 text-lg font-light max-w-lg">
                    Visibilidad completa de tu infraestructura en una única consola cloud. Políticas unificadas y respuesta automatizada.
                </p>
                <a href="#contacto" class="group flex items-center gap-3 border border-zinc-700 rounded-full pl-6 pr-2 py-2 hover:border-zinc-500 transition-colors">
                    <span class="text-sm font-medium text-white">Ver Demo</span>
                    <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black group-hover:rotate-45 transition-transform">
                        <iconify-icon icon="solar:arrow-right-up-linear"></iconify-icon>
                    </div>
                </a>
            </div>
        </div>
    </div>
</section>
```

**Step 2: Verify in browser**

Dark dashboard card on white background. No zinc-50 wrapper, no tabs, no details grid. Bottom has gradient overlay with description text and "Ver Demo" pill button.

**Step 3: Commit**

```bash
git add productos.html
git commit -m "feat(productos): add simplified console showcase with overlay CTA"
```

---

### Task 4: Horizontal Scroll Features

**Files:**
- Modify: `productos.html` (add after console section)

**Step 1: Write the features section**

```html
<!-- Features Section -->
<section class="py-32 max-w-7xl mx-auto px-6">
    <div class="flex flex-col md:flex-row gap-12">
        <!-- Left Title -->
        <div class="md:w-48 flex-shrink-0">
            <h3 class="reveal-text font-serif italic text-3xl text-zinc-400 md:sticky md:top-32">Capacidades</h3>
        </div>

        <!-- Scrollable Cards -->
        <div class="flex-1 overflow-hidden">
            <div class="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scroll-hide">
                <!-- Card 1: Protección Multi-capa -->
                <div class="min-w-[300px] md:min-w-[340px] h-[420px] bg-zinc-50 rounded-[2rem] p-8 snap-start flex-shrink-0 flex flex-col">
                    <div class="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center text-white">
                        <iconify-icon icon="solar:layers-bold-duotone" width="24"></iconify-icon>
                    </div>
                    <h4 class="font-serif italic text-2xl text-zinc-900 mt-6 mb-3">Protección Multi-capa</h4>
                    <p class="text-zinc-500 text-sm font-light leading-relaxed flex-1">
                        Motor de detección con machine learning, análisis heurístico avanzado y protección contra amenazas de día cero. Múltiples capas trabajando en conjunto para una defensa integral.
                    </p>
                    <div class="flex flex-wrap gap-2 mt-6">
                        <span class="border border-zinc-200 rounded-full px-3 py-1 text-xs text-zinc-400">Machine Learning</span>
                        <span class="border border-zinc-200 rounded-full px-3 py-1 text-xs text-zinc-400">Zero-Day</span>
                        <span class="border border-zinc-200 rounded-full px-3 py-1 text-xs text-zinc-400">Heurístico</span>
                    </div>
                </div>

                <!-- Card 2: Anti-Ransomware -->
                <div class="min-w-[300px] md:min-w-[340px] h-[420px] bg-zinc-50 rounded-[2rem] p-8 snap-start flex-shrink-0 flex flex-col">
                    <div class="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center text-white">
                        <iconify-icon icon="solar:shield-check-bold-duotone" width="24"></iconify-icon>
                    </div>
                    <h4 class="font-serif italic text-2xl text-zinc-900 mt-6 mb-3">Anti-Ransomware</h4>
                    <p class="text-zinc-500 text-sm font-light leading-relaxed flex-1">
                        Protección proactiva contra ransomware con rollback automático de archivos cifrados. Copias de seguridad en tiempo real y mitigación instantánea ante ataques.
                    </p>
                    <div class="flex flex-wrap gap-2 mt-6">
                        <span class="border border-zinc-200 rounded-full px-3 py-1 text-xs text-zinc-400">Rollback</span>
                        <span class="border border-zinc-200 rounded-full px-3 py-1 text-xs text-zinc-400">Backup Automático</span>
                        <span class="border border-zinc-200 rounded-full px-3 py-1 text-xs text-zinc-400">Mitigación</span>
                    </div>
                </div>

                <!-- Card 3: Defensa de Red -->
                <div class="min-w-[300px] md:min-w-[340px] h-[420px] bg-zinc-50 rounded-[2rem] p-8 snap-start flex-shrink-0 flex flex-col">
                    <div class="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center text-white">
                        <iconify-icon icon="solar:lock-keyhole-bold-duotone" width="24"></iconify-icon>
                    </div>
                    <h4 class="font-serif italic text-2xl text-zinc-900 mt-6 mb-3">Defensa de Red</h4>
                    <p class="text-zinc-500 text-sm font-light leading-relaxed flex-1">
                        Protección a nivel de red contra ataques antes de que lleguen a los endpoints. Firewall inteligente, detección de intrusiones y control granular de tráfico.
                    </p>
                    <div class="flex flex-wrap gap-2 mt-6">
                        <span class="border border-zinc-200 rounded-full px-3 py-1 text-xs text-zinc-400">Firewall</span>
                        <span class="border border-zinc-200 rounded-full px-3 py-1 text-xs text-zinc-400">IDS/IPS</span>
                        <span class="border border-zinc-200 rounded-full px-3 py-1 text-xs text-zinc-400">Control de Tráfico</span>
                    </div>
                </div>

                <!-- Card 4: Gestión de Riesgos -->
                <div class="min-w-[300px] md:min-w-[340px] h-[420px] bg-zinc-50 rounded-[2rem] p-8 snap-start flex-shrink-0 flex flex-col">
                    <div class="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center text-white">
                        <iconify-icon icon="solar:graph-up-bold-duotone" width="24"></iconify-icon>
                    </div>
                    <h4 class="font-serif italic text-2xl text-zinc-900 mt-6 mb-3">Gestión de Riesgos</h4>
                    <p class="text-zinc-500 text-sm font-light leading-relaxed flex-1">
                        Análisis continuo de riesgos con scoring automatizado, evaluación de vulnerabilidades y recomendaciones de hardening para cumplimiento normativo.
                    </p>
                    <div class="flex flex-wrap gap-2 mt-6">
                        <span class="border border-zinc-200 rounded-full px-3 py-1 text-xs text-zinc-400">Scoring</span>
                        <span class="border border-zinc-200 rounded-full px-3 py-1 text-xs text-zinc-400">Vulnerabilidades</span>
                        <span class="border border-zinc-200 rounded-full px-3 py-1 text-xs text-zinc-400">Compliance</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

**Step 2: Verify in browser**

Cards should be horizontally scrollable. On desktop, "Capacidades" stays on the left. Cards snap into place when scrolling. No visible scrollbar.

**Step 3: Commit**

```bash
git add productos.html
git commit -m "feat(productos): add horizontal scroll feature cards"
```

---

### Task 5: Awards Marquee

**Files:**
- Modify: `productos.html` (add after features section)

**Step 1: Write the awards marquee**

Same pattern as current file — keep it as-is. Copy the awards marquee section from the current `productos.html` (lines 513-553). No changes needed to content or markup.

**Step 2: Verify in browser**

Marquee scrolls seamlessly with award icons and text.

**Step 3: Commit**

```bash
git add productos.html
git commit -m "feat(productos): add awards marquee"
```

---

### Task 6: Plans — Minimal Tier Rows

**Files:**
- Modify: `productos.html` (add after marquee)

**Step 1: Write the plans section**

```html
<!-- Plans Section -->
<section id="planes" class="py-32 max-w-7xl mx-auto px-6">
    <div class="text-center mb-16 max-w-2xl mx-auto">
        <h3 class="reveal-text font-serif italic text-4xl text-zinc-900 mb-6">Planes</h3>
        <p class="text-zinc-500 font-light text-lg">Elige tu nivel de protección. Todos incluyen consola centralizada en la nube.</p>
    </div>

    <!-- Tier Rows -->
    <div class="border-t border-zinc-100 max-w-3xl mx-auto">
        <!-- Business Security -->
        <a href="#contacto" class="group py-8 flex items-center justify-between cursor-pointer hover:bg-zinc-50 transition-colors border-b border-zinc-100 px-4">
            <div>
                <p class="text-xs uppercase tracking-widest text-zinc-400 mb-1">Esencial</p>
                <h4 class="font-serif italic text-2xl text-zinc-900">Business Security</h4>
                <p class="text-zinc-500 text-sm mt-1">Antimalware, firewall y control de dispositivos.</p>
            </div>
            <div class="w-10 h-10 border border-zinc-200 rounded-full flex items-center justify-center group-hover:border-zinc-900 transition-colors flex-shrink-0 ml-4">
                <iconify-icon icon="solar:arrow-right-linear"></iconify-icon>
            </div>
        </a>

        <!-- Business Security Premium -->
        <a href="#contacto" class="group py-8 flex items-center justify-between cursor-pointer hover:bg-zinc-50 transition-colors border-b border-zinc-100 px-4">
            <div>
                <div class="flex items-center gap-3 mb-1">
                    <p class="text-xs uppercase tracking-widest text-zinc-400">Avanzado</p>
                    <span class="text-xs bg-green-400 text-black px-2 py-0.5 rounded-full font-medium">Popular</span>
                </div>
                <h4 class="font-serif italic text-2xl text-zinc-900">Business Security Premium</h4>
                <p class="text-zinc-500 text-sm mt-1">Todo lo esencial + EDR, sandbox y patch management.</p>
            </div>
            <div class="w-10 h-10 border border-zinc-200 rounded-full flex items-center justify-center group-hover:border-zinc-900 transition-colors flex-shrink-0 ml-4">
                <iconify-icon icon="solar:arrow-right-linear"></iconify-icon>
            </div>
        </a>

        <!-- Business Security Enterprise -->
        <a href="#contacto" class="group py-8 flex items-center justify-between cursor-pointer hover:bg-zinc-50 transition-colors border-b border-zinc-100 px-4">
            <div>
                <p class="text-xs uppercase tracking-widest text-zinc-400 mb-1">Máximo</p>
                <h4 class="font-serif italic text-2xl text-zinc-900">Business Security Enterprise</h4>
                <p class="text-zinc-500 text-sm mt-1">Todo Premium + XDR, HyperDetect y análisis de riesgos avanzado.</p>
            </div>
            <div class="w-10 h-10 border border-zinc-200 rounded-full flex items-center justify-center group-hover:border-zinc-900 transition-colors flex-shrink-0 ml-4">
                <iconify-icon icon="solar:arrow-right-linear"></iconify-icon>
            </div>
        </a>
    </div>

    <!-- CTA -->
    <div class="text-center mt-12">
        <a href="#contacto" class="inline-flex items-center gap-2 bg-zinc-900 text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors">
            Solicitar Demo
            <iconify-icon icon="solar:arrow-right-linear" class="text-lg"></iconify-icon>
        </a>
    </div>

    <!-- Add-ons -->
    <div class="text-center mt-8">
        <p class="text-zinc-400 text-sm font-light">Add-ons disponibles: Email Security &middot; Patch Management &middot; Full Disk Encryption &middot; Security for Mobile</p>
    </div>
</section>
```

**Step 2: Verify in browser**

3 clean rows with tier name, one-liner, and arrow. Hover brightens row. Big centered CTA button below. Add-ons note at bottom.

**Step 3: Commit**

```bash
git add productos.html
git commit -m "feat(productos): add minimal tier rows with single CTA"
```

---

### Task 7: Why AMJ — Compact Trust Bar

**Files:**
- Modify: `productos.html` (add after plans section)

**Step 1: Write the trust bar section**

```html
<!-- Why AMJ Section -->
<section class="py-24 max-w-7xl mx-auto px-6">
    <div class="bg-zinc-50 rounded-[2rem] p-8 md:p-12">
        <h3 class="reveal-text font-serif italic text-3xl text-zinc-900 mb-8">&iquest;Por Qué AMJ?</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Partner Certificado -->
            <div class="flex flex-col gap-3">
                <div class="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center text-white">
                    <iconify-icon icon="solar:shield-star-bold-duotone" width="20"></iconify-icon>
                </div>
                <h4 class="font-medium text-lg text-zinc-900">Partner Certificado</h4>
                <p class="text-zinc-500 text-sm font-light leading-relaxed">Distribuidores oficiales de Bitdefender en Chile con certificaciones y respaldo directo del fabricante.</p>
            </div>
            <!-- Soporte Local -->
            <div class="flex flex-col gap-3">
                <div class="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center text-white">
                    <iconify-icon icon="solar:map-point-bold-duotone" width="20"></iconify-icon>
                </div>
                <h4 class="font-medium text-lg text-zinc-900">Soporte Local</h4>
                <p class="text-zinc-500 text-sm font-light leading-relaxed">Equipo técnico en Chile con +15 años de experiencia. Soporte en español, en tu zona horaria.</p>
            </div>
            <!-- Acompañamiento Continuo -->
            <div class="flex flex-col gap-3">
                <div class="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center text-white">
                    <iconify-icon icon="solar:headphones-round-bold-duotone" width="20"></iconify-icon>
                </div>
                <h4 class="font-medium text-lg text-zinc-900">Acompañamiento Continuo</h4>
                <p class="text-zinc-500 text-sm font-light leading-relaxed">Implementación, configuración, capacitación y monitoreo continuo de tu plataforma de seguridad.</p>
            </div>
        </div>
    </div>
</section>
```

**Step 2: Verify in browser**

Single zinc-50 card with title and 3-column compact items inside (icon, title, one-liner). More compact than the home values section.

**Step 3: Commit**

```bash
git add productos.html
git commit -m "feat(productos): add compact trust bar section"
```

---

### Task 8: Footer and GSAP Script

**Files:**
- Modify: `productos.html` (add after Why AMJ section, close `</body></html>`)

**Step 1: Write footer and GSAP script**

Copy the footer from `index.html` exactly. Only change: the "Menú" link points to `index.html#servicios`.

Copy the GSAP script from `index.html` exactly (no changes).

Close `</body>` and `</html>`.

**Step 2: Final verification**

Open `productos.html` and `index.html` side by side:
- Nav looks identical, Productos is active on product page
- Hero is completely different (text vs image card)
- Console section is unique to product page
- Features use horizontal scroll vs numbered list
- Awards marquee is the shared visual break
- Plans use tier rows vs image grid
- Why AMJ is compact single card vs 3 separate cards
- Footer is identical
- All reveal-text animations fire on scroll
- All links work: nav cross-links, #contacto, #planes, mailto
- Responsive: single column on mobile

**Step 3: Commit**

```bash
git add productos.html
git commit -m "feat(productos): add footer and GSAP — page complete"
```
