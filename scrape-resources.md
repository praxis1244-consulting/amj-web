# Shari | AI Consultancy Landing Page — Complete Replication Guide

> Source: https://ai-consultant-shari.aura.build/
> Template by: Meng To (Aura)
> This document contains EVERYTHING needed for an agent to replicate this site for another business.

---

## 1. TECH STACK & CDN DEPENDENCIES

This is a **single HTML file** landing page using CDN-loaded libraries. No build tools required.

### External CDNs (loaded via `<script>` / `<link>`)

```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&display=swap" rel="stylesheet">

<!-- Tailwind CSS (CDN) -->
<script src="https://cdn.tailwindcss.com/"></script>

<!-- Iconify Icons -->
<script src="https://cdn.jsdelivr.net/npm/iconify-icon@2.1.0/dist/iconify-icon.min.js"></script>
<script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>

<!-- GSAP + ScrollTrigger -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
```

### Tailwind Config (inline)

```js
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        zinc: {
          850: '#1f1f22',
          950: '#09090b',
        }
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    }
  }
}
```

---

## 2. DESIGN SYSTEM

### 2.1 Color Palette

| Token               | Value              | Usage                                   |
|----------------------|--------------------|-----------------------------------------|
| Background           | `#FFFFFF` (white)  | Page background                         |
| Text Primary         | `#171717` (zinc-900) | Headings, body text                   |
| Text Secondary       | `zinc-500`         | Body paragraphs, descriptions           |
| Text Tertiary        | `zinc-400`         | Labels, metadata                        |
| Text Muted           | `zinc-300`         | List item numbers, decorative           |
| Accent               | `zinc-900`         | Buttons, active tabs                    |
| Accent Hover         | `zinc-800`         | Button hover state                      |
| Success/Highlight    | `green-400`        | Status dots, positive metrics           |
| Surface Light        | `zinc-50`          | Card backgrounds, section backgrounds   |
| Border               | `zinc-100`         | Dividers, list borders                  |
| Border Subtle        | `zinc-200`         | Card borders, icon button borders       |
| Footer BG            | `zinc-950` (#09090b) | Dark footer section                   |
| Footer Text Muted    | `zinc-500`         | Footer secondary text                   |
| Footer Divider       | `white/10`         | Footer border lines                     |

### 2.2 Typography

| Element                  | Font Family          | Weight   | Size                | Style        | Tracking        |
|--------------------------|----------------------|----------|---------------------|--------------|-----------------|
| Body text                | Inter                | 300 (light) | `text-lg`        | Normal       | Normal          |
| Nav links                | Inter                | 500 (medium) | `text-sm`       | Normal       | Normal          |
| Brand name (nav)         | Inter                | 500 (medium) | `text-lg`       | Normal       | `tracking-tighter` |
| Brand name (footer)      | Playfair Display     | 500 (medium) | `text-lg`       | Italic       | `tracking-tighter` |
| Hero H1                  | Inter                | 300 (light) | `text-6xl md:text-8xl` | Normal  | `tracking-tight` |
| Hero H1 serif line       | Playfair Display     | 400      | `text-6xl md:text-8xl` | Italic  | `tracking-tight` |
| Section subtitle (serif) | Playfair Display     | 400      | `text-3xl` / `text-4xl` | Italic | Normal          |
| Section heading          | Inter                | 300 (light) | `text-4xl md:text-5xl` | Normal | `tracking-tight` |
| Feature title (serif)    | Playfair Display     | 400      | `text-4xl`           | Normal   | Normal          |
| Feature italic part      | Playfair Display     | 400      | Inherits             | Italic   | Normal          |
| List item title          | Playfair Display     | 400      | `text-2xl`           | Italic   | Normal          |
| Stat numbers             | Playfair Display     | 400      | `text-3xl`           | Normal   | Normal          |
| Footer CTA email         | Inter                | 300 (light) | `text-5xl md:text-8xl` | Normal | `tracking-tighter` |
| Tags/Labels              | Inter                | 500 (medium) | `text-xs`         | Uppercase  | `tracking-wide` / `tracking-widest` |
| Button text              | Inter                | 500 (medium) | `text-sm`          | Normal     | Normal          |
| Body paragraphs          | Inter                | 300 (light) | `text-lg`          | Normal     | Normal          |

**Key typography pattern**: Serif (Playfair Display) is used for elegant/accent headings, often in italic. Sans-serif (Inter) at light weight for main headings gives a modern, clean feel. The contrast between serif italic and sans light creates the premium look.

### 2.3 Spacing & Layout

- **Max width container**: `max-w-7xl mx-auto px-6`
- **Section vertical padding**: `py-24` or `py-32` (generous whitespace)
- **Grid system**: 12-column grid (`grid-cols-12`) with named spans
- **Border radius**:
  - Cards/sections: `rounded-[2rem]` (32px) or `rounded-3xl`
  - Buttons: `rounded-full`
  - Small cards: `rounded-xl` or `rounded-2xl`
  - Footer: `rounded-t-[3rem]` (48px top corners only)
- **Card padding**: `p-4 md:p-6` inside outer containers, `p-8 md:p-12` for hero content

### 2.4 Icons

All icons use **Iconify** with the **Solar** icon set. Usage pattern:

```html
<iconify-icon icon="solar:icon-name-linear" class="text-2xl text-zinc-900"></iconify-icon>
```

Icons used in the template:
| Icon ID                              | Location                    | Style     |
|--------------------------------------|-----------------------------|-----------|
| `solar:code-circle-linear`           | Nav logo, Footer logo       | Linear    |
| `solar:arrow-right-linear`           | Buttons, list arrows        | Linear    |
| `solar:arrow-right-up-linear`        | "Our Process" button        | Linear    |
| `solar:arrow-left-linear`            | Case study prev button      | Linear    |
| `solar:server-square-linear`         | Case study icon             | Linear    |
| `solar:database-bold-duotone`        | Feature list item icon      | Duotone   |
| `solar:shield-check-bold-duotone`    | Feature list item icon      | Duotone   |
| `solar:graph-up-bold-duotone`        | Feature list item icon      | Duotone   |

Brand/logo icons in marquee (all use `simple-icons:` prefix):
`nasa`, `spacex`, `uber`, `visa`, `stripe`, `openai`, `vercel`, `notion`

---

## 3. PAGE SECTIONS (Top to Bottom)

### 3.1 Progressive Blur Top Bar

A fixed gradient blur at the top of the page that creates a frosted glass effect as content scrolls beneath the nav.

```html
<div class="gradient-blur">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>
```

**CSS (CRITICAL - must be included exactly):**

```css
.gradient-blur {
    position: fixed;
    z-index: 40;
    inset: 0 0 auto;
    height: 12%;
    pointer-events: none;
}

.gradient-blur > div,
.gradient-blur::before,
.gradient-blur::after {
    position: absolute;
    inset: 0;
}

.gradient-blur::before {
    content: "";
    z-index: 1;
    backdrop-filter: blur(0.5px);
    mask: linear-gradient(to top, rgba(0,0,0,0) 0%, rgb(0,0,0) 12.5%, rgb(0,0,0) 25%, rgba(0,0,0,0) 37.5%);
}

.gradient-blur > div:nth-of-type(1) {
    z-index: 2;
    backdrop-filter: blur(1px);
    mask: linear-gradient(to top, rgba(0,0,0,0) 12.5%, rgb(0,0,0) 25%, rgb(0,0,0) 37.5%, rgba(0,0,0,0) 50%);
}

.gradient-blur > div:nth-of-type(2) {
    z-index: 3;
    backdrop-filter: blur(2px);
    mask: linear-gradient(to top, rgba(0,0,0,0) 25%, rgb(0,0,0) 37.5%, rgb(0,0,0) 50%, rgba(0,0,0,0) 62.5%);
}

.gradient-blur > div:nth-of-type(3) {
    z-index: 4;
    backdrop-filter: blur(4px);
    mask: linear-gradient(to top, rgba(0,0,0,0) 37.5%, rgb(0,0,0) 50%, rgb(0,0,0) 62.5%, rgba(0,0,0,0) 75%);
}

.gradient-blur > div:nth-of-type(4) {
    z-index: 5;
    backdrop-filter: blur(8px);
    mask: linear-gradient(to top, rgba(0,0,0,0) 50%, rgb(0,0,0) 62.5%, rgb(0,0,0) 75%, rgba(0,0,0,0) 87.5%);
}

.gradient-blur > div:nth-of-type(5) {
    z-index: 6;
    backdrop-filter: blur(16px);
    mask: linear-gradient(to top, rgba(0,0,0,0) 62.5%, rgb(0,0,0) 75%, rgb(0,0,0) 87.5%, rgba(0,0,0,0) 100%);
}

.gradient-blur > div:nth-of-type(6) {
    z-index: 7;
    backdrop-filter: blur(32px);
    mask: linear-gradient(to top, rgba(0,0,0,0) 75%, rgb(0,0,0) 87.5%, rgb(0,0,0) 100%);
}

.gradient-blur::after {
    content: "";
    z-index: 8;
    backdrop-filter: blur(64px);
    mask: linear-gradient(to top, rgba(0,0,0,0) 87.5%, rgb(0,0,0) 100%);
}
```

### 3.2 Navigation

```html
<nav class="fixed top-0 w-full z-50 bg-white/50 border-b border-zinc-100/50 backdrop-blur-[2px]">
    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <!-- Logo: icon + brand name -->
        <div class="flex items-center gap-2">
            <iconify-icon icon="solar:code-circle-linear" class="text-2xl text-zinc-900"></iconify-icon>
            <span class="text-lg font-medium tracking-tighter">BrandName</span>
        </div>

        <!-- Nav links (hidden on mobile) -->
        <div class="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-500">
            <a href="#" class="hover:text-black transition-colors">Link 1</a>
            <a href="#" class="hover:text-black transition-colors">Link 2</a>
            <a href="#" class="hover:text-black transition-colors">Link 3</a>
            <a href="#" class="hover:text-black transition-colors">Link 4</a>
        </div>

        <!-- Right side: language + CTA button -->
        <div class="flex items-center gap-4 text-xs font-medium">
            <span class="text-zinc-400 hidden sm:block">EN</span>
            <button class="bg-zinc-900 text-white px-5 py-2.5 rounded-full hover:bg-zinc-800 transition-colors">
                CTA Button
            </button>
        </div>
    </div>
</nav>
```

**Key details:**
- Semi-transparent background: `bg-white/50`
- Very subtle border: `border-b border-zinc-100/50`
- Minimal backdrop blur: `backdrop-blur-[2px]` (the gradient-blur div above handles the heavy blur)
- z-index: `z-50`

### 3.3 Hero Section

Full-height card with background image, overlay, floating content, and a bottom filter bar.

```html
<header class="relative pt-24 pb-6 px-4 md:px-6 max-w-7xl mx-auto">
    <div class="relative w-full h-[85vh] rounded-[2rem] overflow-hidden group">
        <!-- Background Image with hover zoom-out effect -->
        <img src="[IMAGE_URL]" alt="..."
             class="absolute inset-0 w-full h-full object-cover brightness-[0.6] scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out">

        <!-- Gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

        <!-- Content container -->
        <div class="relative h-full flex flex-col justify-between p-8 md:p-12 text-white">

            <!-- Top: Status tag + category pill -->
            <div class="flex justify-between items-start">
                <p class="text-xs font-medium tracking-wide opacity-80 flex items-center gap-2">
                    <span class="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    STATUS TEXT
                </p>
                <div class="flex gap-2">
                    <span class="border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-medium">Category Tag</span>
                </div>
            </div>

            <!-- Main Title (with reveal animation) -->
            <div class="mt-auto mb-12">
                <h1 class="reveal-text text-6xl md:text-8xl font-light tracking-tight leading-[0.9]">
                    Main Title
                </h1>
                <h1 class="font-serif italic font-normal text-zinc-200 text-6xl md:text-8xl mt-2 tracking-tight">
                    <span class="reveal-text">—Subtitle</span>
                </h1>
            </div>

            <!-- Bottom Filter Bar with border gradient -->
            <div class="border-gradient rounded-full">
                <div class="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-0 bg-black/40 backdrop-blur-xl rounded-full p-2 md:pl-8 items-center relative z-10">
                    <div class="border-r border-white/10 px-4 py-2 hidden md:block">
                        <p class="text-zinc-400 text-xs mb-1">Label</p>
                        <p class="text-sm font-medium">Value</p>
                    </div>
                    <div class="border-r border-white/10 px-4 py-2 hidden md:block">
                        <p class="text-zinc-400 text-xs mb-1">Label</p>
                        <p class="text-sm font-medium">Value</p>
                    </div>
                    <div class="border-r border-white/10 px-4 py-2 hidden md:block">
                        <p class="text-zinc-400 text-xs mb-1">Label</p>
                        <p class="text-sm font-medium">Value</p>
                    </div>
                    <div class="px-4 py-2 hidden md:block">
                        <p class="text-zinc-400 text-xs mb-1">Label</p>
                        <p class="text-sm font-medium text-green-400">+Value</p>
                    </div>
                    <button class="bg-white text-black h-12 rounded-full flex items-center justify-between px-6 hover:bg-zinc-200 transition-colors w-full md:w-auto">
                        <span class="text-sm font-medium">Button Text</span>
                        <iconify-icon icon="solar:arrow-right-linear" class="ml-2 text-lg"></iconify-icon>
                    </button>
                </div>
            </div>
        </div>
    </div>
</header>
```

**Key details:**
- Hero card height: `h-[85vh]`
- Image starts at `scale-105` and transitions to `scale-100` on group hover (subtle zoom-out)
- Image brightness: `brightness-[0.6]`
- Title line-height: `leading-[0.9]` (very tight)
- Title split: first line sans-serif light, second line serif italic in `text-zinc-200`
- Bottom bar uses `border-gradient` class for subtle gradient border effect
- Bottom bar inner: `bg-black/40 backdrop-blur-xl`

### 3.4 Philosophy / Mission Section

Two-column layout (3/9 grid split).

```html
<section class="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-12 gap-12">
    <!-- Left: Serif italic label -->
    <div class="md:col-span-3">
        <h3 class="reveal-text font-serif italic text-3xl text-zinc-400">The Philosophy</h3>
    </div>

    <!-- Right: Main content -->
    <div class="md:col-span-9">
        <h2 class="text-4xl md:text-5xl font-light tracking-tight leading-tight mb-8">
            <span class="reveal-text block">Main heading text with</span>
            <span class="reveal-text block">mixed <span class="font-serif italic text-zinc-500">serif italic</span> words</span>
            <span class="reveal-text block">for emphasis throughout.</span>
        </h2>
        <div class="flex flex-col md:flex-row gap-8 items-start justify-between">
            <p class="text-zinc-500 text-lg max-w-xl leading-relaxed font-light">
                Description paragraph text goes here...
            </p>
            <!-- Pill button with arrow icon -->
            <button class="group flex items-center gap-3 border border-zinc-200 rounded-full pl-6 pr-2 py-2 hover:bg-zinc-50 transition-colors">
                <span class="text-sm font-medium">Button Label</span>
                <div class="w-8 h-8 bg-zinc-900 rounded-full flex items-center justify-center text-white group-hover:rotate-45 transition-transform">
                    <iconify-icon icon="solar:arrow-right-up-linear"></iconify-icon>
                </div>
            </button>
        </div>
    </div>
</section>
```

**Key pattern**: The heading mixes `font-light` sans-serif with inline `font-serif italic text-zinc-500` spans for highlighted/accented words.

### 3.5 Case Study Section

Tabbed interface with large image, detail grid, and stat display.

```html
<section class="max-w-7xl mx-auto px-6 pb-32">
    <!-- Section title -->
    <div class="flex justify-center mb-12">
        <h3 class="reveal-text font-serif italic text-4xl text-zinc-900">Case Study</h3>
    </div>

    <!-- Tab buttons -->
    <div class="flex justify-center mb-8">
        <div class="flex gap-8 text-sm font-medium">
            <button class="bg-zinc-900 text-white px-5 py-2 rounded-full">Overview</button>
            <button class="text-zinc-400 hover:text-black transition-colors">Architecture</button>
            <button class="text-zinc-400 hover:text-black transition-colors">Stack</button>
        </div>
    </div>

    <!-- Card container -->
    <div class="bg-zinc-50 rounded-[2rem] p-4 md:p-6 relative overflow-hidden">
        <!-- Main image -->
        <div class="relative h-[600px] rounded-3xl overflow-hidden mb-6">
            <img src="[IMAGE_URL]" alt="..." class="w-full h-full object-cover">
            <!-- Floating label top-right -->
            <div class="absolute top-6 right-6">
                <span class="bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-medium border border-white/10">Project: Name</span>
            </div>
            <!-- Navigation buttons bottom-right -->
            <div class="absolute bottom-6 right-6 flex gap-2">
                <button class="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors border border-white/10">
                    <iconify-icon icon="solar:arrow-left-linear"></iconify-icon>
                </button>
                <button class="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-zinc-200 transition-colors">
                    <iconify-icon icon="solar:arrow-right-linear"></iconify-icon>
                </button>
            </div>
        </div>

        <!-- Details Grid: icon | text | stats -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 px-4 pb-4">
            <!-- Icon placeholder -->
            <div class="md:col-span-3">
                <div class="border border-zinc-200 bg-white p-4 rounded-xl h-40 flex items-center justify-center">
                    <iconify-icon icon="solar:server-square-linear" class="text-6xl text-zinc-300"></iconify-icon>
                </div>
            </div>

            <!-- Description -->
            <div class="md:col-span-4 flex flex-col justify-center">
                <h4 class="reveal-text font-medium text-lg mb-2">Subheading</h4>
                <p class="text-zinc-500 text-sm leading-relaxed">Description text...</p>
            </div>

            <!-- Stats (separated by border-left) -->
            <div class="md:col-span-5 flex items-center justify-between border-l border-zinc-200 pl-8">
                <div>
                    <h5 class="reveal-text font-serif text-3xl text-zinc-900">Stat 1</h5>
                    <p class="text-xs text-zinc-400 mt-1">Label</p>
                </div>
                <div>
                    <h5 class="reveal-text font-serif text-3xl text-zinc-900">Stat 2</h5>
                    <p class="text-xs text-zinc-400 mt-1">Label</p>
                </div>
                <div>
                    <h5 class="reveal-text font-serif text-3xl text-zinc-900">99.9<span class="text-base">%</span></h5>
                    <p class="text-xs text-zinc-400 mt-1">Label</p>
                </div>
            </div>
        </div>
    </div>
</section>
```

### 3.6 Features List Section

Featured item (image + text) followed by a list of expandable items.

```html
<section class="max-w-7xl mx-auto px-6 pb-24">
    <!-- Featured item: 3-column layout -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-12 items-center mb-16">
        <div class="md:col-span-4">
            <div class="flex items-baseline gap-4 mb-4">
                <span class="font-serif italic text-2xl text-zinc-300">1.</span>
                <h3 class="text-4xl font-serif text-zinc-900 leading-tight">
                    Title <br><span class="italic text-zinc-500">Subtitle</span>
                </h3>
            </div>
        </div>
        <div class="md:col-span-4">
            <div class="h-64 rounded-2xl overflow-hidden relative border-gradient">
                <img src="[IMAGE_URL]" alt="..." class="w-full h-full object-cover relative z-10">
                <div class="absolute inset-0 bg-black/20 z-10 pointer-events-none"></div>
            </div>
        </div>
        <div class="md:col-span-4 pl-4">
            <p class="text-zinc-500 text-lg font-light leading-relaxed mb-8">
                Description text...
            </p>
        </div>
    </div>

    <!-- List Items -->
    <div class="border-t border-zinc-100">
        <!-- Repeating list item pattern -->
        <div class="group py-8 flex items-center justify-between cursor-pointer hover:bg-zinc-50 transition-colors border-b border-zinc-100 px-4">
            <div class="flex items-center gap-8">
                <span class="text-sm font-medium text-zinc-300 w-8">2</span>
                <div class="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                    <iconify-icon icon="solar:database-bold-duotone" width="24"></iconify-icon>
                </div>
                <h3 class="text-2xl font-serif text-zinc-900 italic group-hover:not-italic transition-all">
                    First Word <span class="not-italic group-hover:italic font-normal">Second Word</span>
                </h3>
            </div>
            <div class="w-10 h-10 border border-zinc-200 rounded-full flex items-center justify-center group-hover:border-zinc-900 transition-colors">
                <iconify-icon icon="solar:arrow-right-linear"></iconify-icon>
            </div>
        </div>
        <!-- Repeat for items 3, 4... -->
    </div>
</section>
```

**Key hover interactions:**
- Icon circle: `bg-zinc-100` → `bg-zinc-900` with `text-zinc-600` → `text-white`
- Title: italic text toggles to not-italic (and vice versa) on hover
- Arrow border: `border-zinc-200` → `border-zinc-900`
- Row background: transparent → `bg-zinc-50`

### 3.7 Logo Marquee Section

Infinite horizontal scroll of client/partner logos.

```html
<section class="border-y border-zinc-100 bg-zinc-50/50 py-12 overflow-hidden">
    <div class="flex w-full overflow-hidden">
        <div class="flex animate-marquee whitespace-nowrap gap-16 md:gap-32 items-center min-w-full">
            <!-- Set 1 -->
            <iconify-icon icon="simple-icons:nasa" width="40" class="text-zinc-400 opacity-60 hover:opacity-100 transition-opacity"></iconify-icon>
            <iconify-icon icon="simple-icons:spacex" width="40" class="text-zinc-400 opacity-60 hover:opacity-100 transition-opacity"></iconify-icon>
            <iconify-icon icon="simple-icons:uber" width="40" class="text-zinc-400 opacity-60 hover:opacity-100 transition-opacity"></iconify-icon>
            <iconify-icon icon="simple-icons:visa" width="40" class="text-zinc-400 opacity-60 hover:opacity-100 transition-opacity"></iconify-icon>
            <iconify-icon icon="simple-icons:stripe" width="40" class="text-zinc-400 opacity-60 hover:opacity-100 transition-opacity"></iconify-icon>
            <iconify-icon icon="simple-icons:openai" width="40" class="text-zinc-400 opacity-60 hover:opacity-100 transition-opacity"></iconify-icon>
            <iconify-icon icon="simple-icons:vercel" width="40" class="text-zinc-400 opacity-60 hover:opacity-100 transition-opacity"></iconify-icon>
            <iconify-icon icon="simple-icons:notion" width="40" class="text-zinc-400 opacity-60 hover:opacity-100 transition-opacity"></iconify-icon>

            <!-- Set 2 (exact duplicate for seamless loop) -->
            <iconify-icon icon="simple-icons:nasa" width="40" class="text-zinc-400 opacity-60 hover:opacity-100 transition-opacity"></iconify-icon>
            <iconify-icon icon="simple-icons:spacex" width="40" class="text-zinc-400 opacity-60 hover:opacity-100 transition-opacity"></iconify-icon>
            <!-- ... repeat all icons ... -->
        </div>
    </div>
</section>
```

**Marquee animation** (defined in Tailwind config):
- `animate-marquee`: `marquee 25s linear infinite`
- Keyframes: `translateX(0%)` → `translateX(-50%)`
- Icons must be duplicated (Set 1 + Set 2) so the loop is seamless

### 3.8 Portfolio / Deployments Grid

Image cards with hover zoom effect.

```html
<section class="max-w-7xl mx-auto px-6 py-32">
    <!-- Section header -->
    <div class="text-center mb-16 max-w-2xl mx-auto">
        <h3 class="reveal-text font-serif italic text-4xl text-zinc-900 mb-6">Deployments</h3>
        <p class="text-zinc-500 font-light text-lg">Description text...</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Card 1 (half-width) -->
        <div class="relative group h-[400px] rounded-[2rem] overflow-hidden cursor-pointer">
            <img src="[IMAGE_URL]" alt="..." class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
            <div class="absolute bottom-8 left-8 text-white">
                <p class="text-xs uppercase tracking-widest text-zinc-300 mb-2">Category Label</p>
                <h4 class="font-serif text-2xl italic">Card Title</h4>
            </div>
        </div>

        <!-- Card 2 (half-width) -->
        <div class="relative group h-[400px] rounded-[2rem] overflow-hidden cursor-pointer">
            <img src="[IMAGE_URL]" alt="..." class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
            <div class="absolute bottom-8 left-8 text-white">
                <p class="text-xs uppercase tracking-widest text-zinc-300 mb-2">Category Label</p>
                <h4 class="font-serif text-2xl italic">Card Title</h4>
            </div>
        </div>

        <!-- Card 3 (full-width) -->
        <div class="md:col-span-2 relative group h-[500px] rounded-[2rem] overflow-hidden cursor-pointer">
            <img src="[IMAGE_URL]" alt="..." class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
            <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-12 w-full md:w-1/2">
                <h4 class="font-serif text-4xl text-white italic mb-4">Card Title</h4>
                <p class="text-zinc-300 font-light mb-8">Description...</p>

                <!-- Border gradient CTA button -->
                <div class="border-gradient rounded-full inline-block">
                    <div class="flex justify-between items-center bg-white/10 backdrop-blur-md rounded-full p-1 pr-2 w-max gap-4 relative z-10">
                        <span class="text-white text-xs pl-4">Button Text</span>
                        <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black">
                            <iconify-icon icon="solar:arrow-right-linear"></iconify-icon>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

**Key details:**
- Half cards: `h-[400px]`, full card: `h-[500px]`
- Image hover: `transition-transform duration-700 group-hover:scale-110` (or `scale-105` for larger card)
- Half cards: gradient `from-black/80 via-transparent to-transparent` (bottom-up)
- Full card: gradient `from-black/70 via-black/20 to-transparent` (left-to-right)

### 3.9 Footer

Dark section with large CTA email, brand info, and social links.

```html
<footer class="bg-zinc-950 text-white rounded-t-[3rem] overflow-hidden relative">
    <div class="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <!-- Top: Brand + tagline + menu -->
        <div class="flex justify-between items-center border-b border-white/10 pb-8 mb-16">
            <div class="flex items-center gap-2">
                <iconify-icon icon="solar:code-circle-linear" class="text-2xl text-white"></iconify-icon>
                <span class="text-lg font-medium tracking-tighter italic font-serif">BrandName</span>
            </div>
            <div class="flex gap-8 text-xs text-zinc-500 uppercase tracking-widest">
                <span>Value 1</span>
                <span class="text-zinc-700">//</span>
                <span>Value 2</span>
                <span class="text-zinc-700">//</span>
                <span>Value 3</span>
            </div>
            <button class="text-sm font-medium hover:text-zinc-300">Menu</button>
        </div>

        <!-- Large CTA -->
        <div class="text-center mb-24">
            <p class="font-serif italic text-3xl mb-4 text-zinc-300">/ Get in Touch</p>
            <a href="mailto:email@example.com" class="reveal-text text-5xl md:text-8xl font-light tracking-tighter hover:text-zinc-300 transition-colors inline-block">
                email@example.com
            </a>
        </div>

        <!-- Bottom: 3-column grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-zinc-500">
            <div>
                <p class="mb-1 text-white">All rights reserved.</p>
                <p>&copy;2024 Company Name</p>
            </div>
            <div class="text-center">
                <p>Address Line</p>
                <p>Phone Number</p>
            </div>
            <div class="flex justify-end gap-6">
                <a href="#" class="hover:text-white transition-colors">LinkedIn</a>
                <a href="#" class="hover:text-white transition-colors">Twitter</a>
                <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
            </div>
        </div>
    </div>
</footer>
```

---

## 4. ANIMATIONS & INTERACTIONS (CRITICAL)

### 4.1 GSAP Scroll-Triggered Text Reveal

This is the **signature animation** of the template. Text slides up from below when scrolling into view.

**CSS (required):**

```css
.word-wrapper {
    display: inline-block;
    overflow: hidden;
    vertical-align: bottom;
    padding-bottom: 0.1em;
    margin-bottom: -0.1em;
}

.word-inner {
    display: inline-block;
    transform: translateY(120%);
}
```

**JavaScript (required — runs on DOMContentLoaded):**

```js
document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    // Split text into word spans for reveal animation
    const splitTextElements = document.querySelectorAll(".reveal-text");

    splitTextElements.forEach((element) => {
        if (element.children.length === 0) {
            const text = element.innerText;
            const words = text.split(" ");
            element.innerHTML = words.map(word =>
                `<span class="word-wrapper"><span class="word-inner">${word}&nbsp;</span></span>`
            ).join("");
        } else {
            const wrapper = document.createElement("span");
            wrapper.className = "word-wrapper";
            const inner = document.createElement("span");
            inner.className = "word-inner";
            inner.innerHTML = element.innerHTML;
            element.innerHTML = "";
            wrapper.appendChild(inner);
            element.appendChild(wrapper);
        }
    });

    // Animate words sliding up into view
    const reveals = document.querySelectorAll(".reveal-text");
    reveals.forEach((section) => {
        const words = section.querySelectorAll(".word-inner");
        gsap.to(words, {
            y: 0,                        // Slide to natural position
            duration: 1,                 // 1 second duration
            stagger: 0.05,               // 50ms between each word
            ease: "power4.out",          // Fast start, slow end
            scrollTrigger: {
                trigger: section,
                start: "top 85%",        // Triggers when top of element hits 85% viewport
                toggleActions: "play none none reverse"  // Play on enter, reverse on leave
            }
        });
    });
});
```

**Usage:** Add `class="reveal-text"` to any text element. Words will automatically be split and animated.

### 4.2 Border Gradient Effect

Subtle animated gradient border used on the hero filter bar and CTA buttons.

```css
.border-gradient {
    position: relative;
}

.border-gradient::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    mask: linear-gradient(#fff 0, #fff 0) content-box exclude,
          linear-gradient(#fff 0, #fff 0);
    background: linear-gradient(225deg,
        rgba(255,255,255,0) 0%,
        rgba(255,255,255,0.4) 50%,
        rgba(255,255,255,0) 100%
    );
    pointer-events: none;
}
```

### 4.3 Hero Image Hover

```css
/* Applied via Tailwind classes */
/* Image starts zoomed in slightly, zooms out on card hover */
.group img {
    /* scale-105 → group-hover:scale-100 */
    /* transition-transform duration-1000 ease-out */
}
```

### 4.4 Portfolio Card Image Hover

```css
/* Images zoom in on hover */
/* transition-transform duration-700 group-hover:scale-110 */
```

### 4.5 Feature List Item Hover Effects

On `.group` hover:
- Number: stays `text-zinc-300`
- Icon circle: `bg-zinc-100 text-zinc-600` → `bg-zinc-900 text-white`
- Title italic toggles: `italic` → `not-italic` and `not-italic` → `italic`
- Arrow border: `border-zinc-200` → `border-zinc-900`
- Row bg: transparent → `bg-zinc-50`

### 4.6 Button Arrow Rotation

```html
<!-- "Our Process" button — arrow rotates 45deg on hover -->
<div class="w-8 h-8 bg-zinc-900 rounded-full ... group-hover:rotate-45 transition-transform">
```

### 4.7 Green Pulse Dot

```html
<span class="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
```

### 4.8 Scrollbar Styling

```css
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgb(228, 228, 231); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: rgb(212, 212, 216); }
```

---

## 5. BODY & HTML BASE CLASSES

```html
<html lang="en" class="scroll-smooth" style="scroll-behavior: smooth;">
<body class="bg-white text-zinc-900 antialiased font-sans selection:bg-zinc-200 selection:text-black">
```

- Smooth scrolling enabled
- Antialiased text rendering
- Custom text selection colors: zinc-200 background, black text

---

## 6. IMAGE REFERENCES (from template)

These are the images used in the template. Replace with your own business images:

| Image               | URL | Usage |
|----------------------|-----|-------|
| Hero / Chipset       | `https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg` | Hero background, Portfolio card 2 |
| Server Room          | `https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c543a9e1-f226-4ced-80b0-feb8445a75b9_1600w.jpg` | Case study, Portfolio card 3 |
| AI Model             | `https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5bab247f-35d9-400d-a82b-fd87cfe913d2_1600w.webp` | Features section |
| Cybersecurity        | `https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg` | Portfolio card 1 |

---

## 7. RESPONSIVE BEHAVIOR

| Breakpoint | Changes |
|------------|---------|
| Mobile (default) | Single column layouts, nav links hidden, filter bar items hidden, stacked content |
| `sm:` (640px+) | Language label shown |
| `md:` (768px+) | 12-column grid layouts activate, nav links shown, filter bar items shown, side-by-side content |

---

## 8. FULL PAGE STRUCTURE (ordered)

```
1. Progressive Blur (fixed, z-40)
2. Navigation (fixed, z-50)
3. Hero Section (85vh card with image, title, filter bar)
4. Philosophy Section (3/9 grid, serif italic label + sans heading)
5. Case Study Section (tabs + image + detail grid)
6. Features List (featured item + expandable list)
7. Logo Marquee (infinite scroll, border-y)
8. Deployments Grid (2 half cards + 1 full card)
9. Footer (dark bg, large CTA email, 3-col info)
```

---

## 9. DESIGN CONVENTIONS SUMMARY

1. **Color philosophy**: Monochromatic zinc palette with green-400 as the only accent color
2. **Typography pattern**: Inter light (300) for headings + Playfair Display italic for serif accents
3. **Border radius**: Very rounded corners (`2rem`/`3rem`) for major containers, `rounded-full` for buttons/pills
4. **Spacing**: Generous vertical padding (`py-24` to `py-32`), consistent `max-w-7xl` container
5. **Hover states**: Subtle color transitions, image scale transforms, icon style toggles
6. **Overlays**: Heavy use of `backdrop-blur` and gradient overlays on images
7. **Glass morphism**: `bg-white/50`, `bg-black/40`, `bg-white/10` with `backdrop-blur`
8. **Animation approach**: GSAP ScrollTrigger for text reveals, CSS for hovers/transitions
9. **Visual hierarchy**: Large serif italic headings create focal points, light sans-serif for body
10. **Content pattern**: Every section uses a 12-column grid with asymmetric splits (3/9, 4/4/4, 3/4/5)
