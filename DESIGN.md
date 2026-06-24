# ITHAR Design System

> Source of truth for every visual decision on the ITHAR website.
> Every component, every page, every interaction must pass through this document.

---

## 1. Color Palette

### Primary

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-black` | `#0B0B0B` | Primary background, primary text on light |
| `--color-charcoal` | `#1A1A1A` | Card backgrounds, elevated surfaces |
| `--color-charcoal-mid` | `#252525` | Borders, dividers, subtle separators |
| `--color-charcoal-light` | `#2E2E2E` | Hover states on dark surfaces |

### Accent

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-gold` | `#B89A67` | Primary accent — logos, CTAs, highlights, underlines |
| `--color-gold-light` | `#CEB48A` | Hover states on gold elements |
| `--color-gold-muted` | `#8B7355` | Secondary gold, less prominent accents |
| `--color-gold-bright` | `#D4AF37` | Special callouts, calligraphy renders |

### Neutral / Light

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-off-white` | `#EAE2D6` | Primary text on dark, light page backgrounds |
| `--color-cream` | `#F5F0E8` | Light surface backgrounds |
| `--color-warm-gray` | `#9B9189` | Body text at reduced emphasis, captions |
| `--color-stone` | `#6B6460` | Placeholder text, disabled states |

### Semantic

| Token | Value | Usage |
|-------|-------|-------|
| `--color-error` | `#C0392B` | Form errors |
| `--color-success` | `#27AE60` | Order success, in-stock |
| `--color-warning` | `#E67E22` | Low stock indicator |
| `--color-muted` | `#555555` | Out of stock |

---

## 2. Typography

### Font Stack

```
Heading (Display):     Cormorant Garamond — luxury serif, editorial weight
Subheading:            Cormorant Garamond Italic — for editorial captions
Body:                  Inter — clean, neutral, highly legible
Label / UI:            Inter — uppercase, tracked, small
Arabic:                Noto Naskh Arabic — for all Arabic text
Mono:                  JetBrains Mono — for order numbers, codes
```

### Type Scale

| Step | rem | px | Usage |
|------|-----|----|-------|
| `text-display-2xl` | 7.5rem | 120px | Hero headline, single-word statements |
| `text-display-xl` | 5rem | 80px | Section heroes, campaign titles |
| `text-display-lg` | 3.75rem | 60px | Page titles, collection names |
| `text-display-md` | 3rem | 48px | Section headings |
| `text-display-sm` | 2.25rem | 36px | Large card headings |
| `text-xl` | 1.5rem | 24px | Sub-section headings |
| `text-lg` | 1.25rem | 20px | Lead body, intro paragraphs |
| `text-base` | 1rem | 16px | Standard body text |
| `text-sm` | 0.875rem | 14px | Captions, labels, secondary info |
| `text-xs` | 0.75rem | 12px | Legal, footnotes, badges |

### Letter Spacing

| Label | Value | Usage |
|-------|-------|-------|
| `tracking-widest` | 0.25em | Uppercase brand labels ("CLOTHING FOR THE RISERS") |
| `tracking-wider` | 0.15em | Nav items, button text |
| `tracking-wide` | 0.08em | Section labels |
| `tracking-normal` | 0 | Body, paragraphs |
| `tracking-tight` | -0.02em | Large display headings |
| `tracking-tighter` | -0.04em | Hero display text |

### Line Height

| Context | Value |
|---------|-------|
| Display headings | 0.95 — tight, editorial |
| Subheadings | 1.1 |
| Body text | 1.7 — generous, readable |
| Captions | 1.4 |

---

## 3. Spacing System

Base unit: `4px` (0.25rem)

```
space-1   4px    — icon gaps, tight padding
space-2   8px    — small internal padding
space-3   12px   — component internal spacing
space-4   16px   — standard gap
space-5   20px   — comfortable spacing
space-6   24px   — section internal
space-8   32px   — card padding, section padding
space-10  40px   — medium section gap
space-12  48px   — large component gap
space-16  64px   — section gap (mobile)
space-20  80px   — section gap (desktop)
space-24  96px   — large section gap
space-32  128px  — hero internal padding
space-40  160px  — page vertical rhythm
space-48  192px  — hero height padding
space-64  256px  — maximum section padding
```

### Whitespace Philosophy
- **Luxury breathing room**: Every section needs silence around it.
- Minimum `80px` vertical padding on all top-level sections.
- Grid gutters: `24px` mobile, `40px` desktop.
- Never crowd elements. If it feels empty, it's correct.

---

## 4. Layout System

### Breakpoints

```
xs:  320px   — small phones
sm:  640px   — large phones
md:  768px   — tablets
lg:  1024px  — small laptops
xl:  1280px  — standard desktop
2xl: 1536px  — wide desktop
3xl: 1920px  — cinematic wide
```

### Container

```
max-width: 1440px
padding-x: 24px (mobile), 48px (tablet), 80px (desktop), 120px (wide)
```

### Grid

```
Product grid:   1 col (mobile) → 2 col (tablet) → 3 col (desktop) → 4 col (wide)
Editorial grid: 12-column with named areas
Content grid:   max-width 720px, centered, for journal/body copy
```

---

## 5. Component Rules

### Buttons

```
Primary (Gold):
  bg: #B89A67  text: #0B0B0B  border: none
  hover: bg #CEB48A
  active: bg #8B7355
  padding: 14px 32px
  letter-spacing: 0.15em
  font-size: 13px
  font-weight: 500
  text-transform: uppercase

Secondary (Outline):
  bg: transparent  text: #EAE2D6  border: 1px solid #B89A67
  hover: bg #1A1A1A
  padding: 13px 31px (accounting for border)

Ghost (Dark surface):
  bg: transparent  text: #EAE2D6  border: 1px solid #2E2E2E
  hover: border-color #B89A67, text #B89A67

Destructive:
  bg: #C0392B  text: #EAE2D6

Icon Button:
  40px × 40px  border: 1px solid #2E2E2E
  hover: border-color #B89A67

All buttons:
  border-radius: 0  (sharp corners — luxury code)
  transition: all 200ms ease
  cursor: pointer
  font-family: Inter
```

### Cards

```
Product Card:
  bg: #1A1A1A
  image-aspect: 4/5 (portrait)
  hover: image scale 1.04 (300ms ease)
  padding: 0 (image edge-to-edge, info below)
  gap between image and info: 16px

Editorial Card:
  bg: #0B0B0B
  border-top: 1px solid #2E2E2E
  padding: 24px 0

Feature Card:
  bg: transparent
  border: 1px solid #2E2E2E
  padding: 32px
  hover: border-color #B89A67
```

### Forms

```
Input:
  bg: transparent
  border: 1px solid #2E2E2E
  border-radius: 0
  padding: 14px 16px
  color: #EAE2D6
  placeholder: #555555
  focus: border-color #B89A67, outline: none
  font-size: 15px

Label:
  font-size: 11px
  letter-spacing: 0.12em
  text-transform: uppercase
  color: #9B9189
  margin-bottom: 8px

Error:
  color: #C0392B
  font-size: 12px
  margin-top: 4px
```

### Navigation

```
Height: 72px (desktop), 64px (mobile)
bg: rgba(11, 11, 11, 0.95)  backdrop-blur: 20px
border-bottom: 1px solid #1A1A1A (scrolled only)
Link style: 11px uppercase, tracking 0.15em, color #9B9189
Link hover: color #EAE2D6
Active link: color #B89A67
Logo: gold, centered (desktop), left (mobile)
Cart icon: shows count badge in gold
```

### Badges / Tags

```
Size indicator: 36px × 36px, border 1px solid #2E2E2E, font 12px
Selected size: border-color #B89A67, bg #1A1A1A, color #EAE2D6
Out of stock size: opacity 0.3, cursor not-allowed, line-through

Stock badge:
  In stock:    dot #27AE60
  Low stock:   dot #E67E22  + "Only X left"
  Out of stock: dot #555555
```

---

## 6. Animation Rules

All animations use Framer Motion. Keep them **surgical** — premium brands don't bounce.

### Entrance Animations

```javascript
fadeUp: {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
}

fadeIn: {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, ease: 'easeOut' }
}

staggerContainer: {
  animate: { transition: { staggerChildren: 0.08 } }
}

heroReveal: {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
}
```

### Page Transitions

```javascript
pageTransition: {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3, ease: 'easeInOut' }
}
```

### Hover / Interactive

```javascript
imageHover: {
  whileHover: { scale: 1.04, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
}

buttonTap: {
  whileTap: { scale: 0.97, transition: { duration: 0.1 } }
}

linkUnderline: CSS — width 0→100% on hover, 200ms ease
goldGlow: CSS — box-shadow 0 0 0 1px #B89A67 on focus/hover
```

### Rules

- Never use `spring` animations on page-level elements.
- No bouncing, no overshoot on product components.
- Scroll-triggered animations use `viewport: { once: true, amount: 0.2 }`.
- Stagger delay max: `0.08s` per child. Never more.
- Duration range: `0.2s` (micro) to `0.9s` (hero). Nothing longer.

---

## 7. Image Treatment

```
All product images:    aspect-ratio 4/5 portrait, object-fit cover, object-position top
Hero images:           aspect-ratio 16/9 or full-viewport, cinematic crop
Editorial images:      full-bleed, overlaid with dark gradient (bottom 40% to 0)
Background overlays:   bg-black/60 for text legibility over images
Lazy loading:          blur placeholder, fade-in on load
Image quality:         85 (Next.js quality prop)
Formats:               WebP with AVIF fallback
```

---

## 8. Shadows & Effects

```
Subtle elevation:   0 1px 3px rgba(0,0,0,0.4)
Card hover:         0 8px 32px rgba(0,0,0,0.6)
Modal overlay:      bg-black/80 backdrop-blur-sm
Gold glow:          0 0 20px rgba(184,154,103,0.2)
Text shadow (hero): 0 2px 40px rgba(0,0,0,0.8)
```

---

## 9. Dividers

```
Standard:       1px solid #1A1A1A
Accent:         1px solid #2E2E2E
Gold accent:    1px solid #B89A67 (used sparingly — section intros)
Spacing before/after divider: always minimum 40px
```

---

## 10. Z-Index Scale

```
z-0    Base content
z-10   Sticky product info
z-20   Floating labels, badges
z-30   Dropdown menus
z-40   Navigation bar
z-50   Drawers (cart)
z-60   Modals
z-70   Toasts / notifications
z-80   Full-screen overlays
```
