# UI/UX Description - Artisan Woodworks

## Design Philosophy

### Core Principles

**"Luxury Through Simplicity"**

The Artisan Woodworks website embodies the principle that true luxury doesn't shout—it whispers. Every design decision should prioritize elegance, clarity, and the natural beauty of the craftsmanship being showcased.

#### Design Pillars
1. **Clean & Simple** - Generous whitespace, minimal clutter, clear hierarchy
2. **Warm & Natural** - Organic feel, wood tones, soft textures
3. **Professional & Elegant** - Sophisticated, trustworthy, refined
4. **Image-Driven** - Photography takes center stage, text supports
5. **Accessible & Intuitive** - Easy to navigate, clear purpose, welcoming

---

## Brand Identity

### Visual Theme
**Luxury & Elegant, Natural & Organic, Creative & Bold**

The website should feel like walking into a high-end furniture showroom—curated, spacious, with each piece given room to breathe. Think Scandinavian minimalism meets artisan craftsmanship.

### Emotional Experience
When visitors land on the site, they should immediately feel:
- **Warmth** - Inviting, not cold or sterile
- **Comfort** - Easy to navigate, no confusion
- **Inspiration** - Desire to own these pieces
- **Trust** - Professional, established, reliable
- **Appreciation** - Recognition of quality and craftsmanship

---

## Color Palette

### Primary Colors

#### Black
- **Hex:** `#000000`
- **Usage:** Headlines, body text, footer background, accent elements
- **Purpose:** Creates contrast, conveys sophistication and elegance

#### White / Off-White
- **Hex:** `#FFFFFF` (pure white), `#FAFAF9` (off-white/stone)
- **Usage:** Backgrounds, negative space, text on dark backgrounds
- **Purpose:** Creates breathing room, emphasizes content, clean look

#### Wood Yellow / Natural Brown
- **Primary Wood Tone:** `#D4A574` (light golden oak)
- **Secondary Wood Tone:** `#8B6F47` (medium walnut)
- **Tertiary Wood Tone:** `#6B5444` (dark brown)
- **Usage:** Accent colors, borders, hover states, CTAs
- **Purpose:** Connects to natural materials, adds warmth

### Secondary/Accent Colors

#### Neutral Grays
- **Light Gray:** `#F5F5F4` (backgrounds, subtle sections)
- **Medium Gray:** `#A8A29E` (borders, disabled states)
- **Dark Gray:** `#44403C` (secondary text)

#### Natural Accents (sparingly)
- **Cream:** `#F8F6F3` (soft backgrounds)
- **Taupe:** `#C9C5BA` (subtle borders, dividers)

### Colors to AVOID
- ❌ Bright colors (neon, saturated primaries)
- ❌ Pastel colors (pink, baby blue, mint green)
- ❌ Cool tones (blues, purples) unless very muted
- ❌ Harsh contrasts (except black/white)

### Color Application Guidelines

**Text:**
- Primary text: `#000000` (black) or `#1C1917` (near-black)
- Secondary text: `#57534E` (warm gray)
- Disabled text: `#A8A29E` (medium gray)
- Text on dark backgrounds: `#FFFFFF` or `#FAFAF9`

**Backgrounds:**
- Main background: `#FFFFFF` (white)
- Alternate sections: `#FAFAF9` or `#F5F5F4` (subtle variation)
- Header: Transparent → `#FFFFFF` on scroll
- Footer: `#1C1917` (near-black)

**Buttons & CTAs:**
- Primary button: `#D4A574` (wood yellow) with `#000000` text
- Primary button hover: `#8B6F47` (darker wood tone)
- Secondary button: `#000000` (black) with `#FFFFFF` text
- Secondary button hover: `#44403C` (dark gray)

**Borders & Dividers:**
- Subtle: `#E7E5E4` (very light gray)
- Medium: `#D6D3D1` (light gray)
- Accent: `#D4A574` (wood tone)

---

## Typography

### Font Families

#### Heading Font: Serif (Elegant)
**Recommended:** Playfair Display, Cormorant Garamond, or Crimson Pro
- **Usage:** Page titles, section headings, hero text
- **Weights:** 400 (Regular), 600 (SemiBold), 700 (Bold)
- **Purpose:** Conveys craftsmanship, elegance, traditional quality

#### Body Font: Sans-Serif (Clean)
**Recommended:** Inter, Outfit, or DM Sans
- **Usage:** Body text, navigation, buttons, captions
- **Weights:** 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold)
- **Purpose:** Modern, readable, professional

### Typography Scale

```css
/* Headings */
h1: 48-64px (3rem-4rem), Serif, Bold
h2: 36-48px (2.25rem-3rem), Serif, SemiBold
h3: 24-32px (1.5rem-2rem), Serif, Medium
h4: 20-24px (1.25rem-1.5rem), Sans-Serif, SemiBold

/* Body */
body: 16px (1rem), Sans-Serif, Regular
large: 18px (1.125rem), Sans-Serif, Regular
small: 14px (0.875rem), Sans-Serif, Regular
caption: 12px (0.75rem), Sans-Serif, Light

/* Buttons */
button-large: 18px (1.125rem), Sans-Serif, Medium
button-medium: 16px (1rem), Sans-Serif, Medium
button-small: 14px (0.875rem), Sans-Serif, Medium
```

### Line Height
- Headings: `1.2` (tight, elegant)
- Body text: `1.6` (comfortable reading)
- Captions: `1.4`

### Letter Spacing
- Headings: `-0.02em` (slightly tighter)
- Body: `0` (default)
- Buttons/Navigation: `0.02em` (slightly wider for readability)
- All-caps text: `0.1em` (much wider for legibility)

### Text Alignment
- Headings: Center or Left (never right)
- Body text: Left-aligned (never justify)
- Hero text: Center
- Captions: Left or center based on context

---

## Layout & Spacing

### Container & Grid

#### Max-Width Container
- **Desktop:** `1280px` (Tailwind's `max-w-7xl`)
- **Padding:** `24px` (mobile), `32px` (tablet), `48px` (desktop)
- **Centered:** Always centered with `mx-auto`

#### Grid System
```css
/* Catalogue Grid */
Mobile: 1 column
Tablet: 2 columns (gap: 24px)
Desktop: 3 columns (gap: 32px)

/* Content Sections */
Mobile: 1 column
Desktop: 2 columns (60/40 or 50/50 split)
```

### Spacing Scale
Use Tailwind's spacing scale, favoring generous spacing:

```
xs: 8px  (0.5rem) - tight elements
sm: 16px (1rem)   - related content
md: 24px (1.5rem) - section padding (mobile)
lg: 32px (2rem)   - section padding (tablet)
xl: 48px (3rem)   - section padding (desktop)
2xl: 64px (4rem)  - major section breaks
3xl: 96px (6rem)  - hero sections
```

**Golden Rule:** When in doubt, add more whitespace. Luxury brands never feel cramped.

### Vertical Rhythm
- Section spacing: `64px` (mobile), `96px` (desktop)
- Component spacing: `32px` (mobile), `48px` (desktop)
- Element spacing: `16px` (mobile), `24px` (desktop)

---

## Components

### Buttons

#### Primary Button
```css
Background: #D4A574 (wood yellow)
Text: #000000 (black)
Padding: 16px 32px (medium), 20px 40px (large)
Border-radius: 4px (slightly rounded, not pill)
Font: Sans-serif, Medium weight, 16px
Hover: Background darkens to #8B6F47
Transition: 200ms ease
```

#### Secondary Button
```css
Background: Transparent
Border: 2px solid #000000
Text: #000000
Padding: 14px 30px (account for border)
Border-radius: 4px
Hover: Background #000000, Text #FFFFFF
Transition: 200ms ease
```

#### Text Link Button
```css
Text: #8B6F47 (wood tone)
Underline: On hover
Font: Sans-serif, Medium
Transition: 150ms ease
```

### Cards (Product Cards)

```css
Structure:
- Image (4:3 ratio, fills container)
- Content padding: 20px
- Title: 20px, Serif, SemiBold
- Category badge: 12px, Sans-serif, uppercase, letter-spacing
- Description: 16px, Sans-serif, Regular, 2-line clamp
- Wood type: Small badge or text

Background: #FFFFFF
Border: 1px solid #E7E5E4 (subtle)
Border-radius: 8px
Hover: 
  - Box-shadow: 0 8px 24px rgba(0,0,0,0.08)
  - Image: scale(1.05) with overflow hidden
Transition: 300ms ease
```

### Forms (Future - Email Input)

```css
Input Field:
- Background: #FFFFFF
- Border: 1px solid #D6D3D1
- Border-radius: 4px
- Padding: 12px 16px
- Font: 16px, Sans-serif
- Focus: Border #D4A574, outline none, box-shadow

Label:
- Font: 14px, Sans-serif, Medium
- Color: #44403C
- Margin-bottom: 8px
```

### Navigation

#### Desktop Navigation
```css
Header:
- Height: 80px
- Background: Transparent (on hero) or #FFFFFF
- Border-bottom: 1px solid #E7E5E4 (when solid)
- Sticky on scroll with smooth transition

Logo/Name:
- Font: 24px, Serif, Bold
- Color: #000000

Nav Links:
- Font: 16px, Sans-serif, Medium
- Color: #44403C
- Hover: #000000
- Active: #000000 with underline (2px, #D4A574)
- Spacing: 32px between items
```

#### Mobile Navigation
```css
Hamburger:
- Icon: 3 bars, #000000
- Size: 24x24px
- Position: Top right

Mobile Menu:
- Slide in from right
- Full height
- Background: #FFFFFF
- Links: 20px, centered, 48px tall (easy touch)
- Close icon: X, top right
```

### Footer

```css
Background: #1C1917 (near-black)
Text: #FAFAF9 (off-white)
Padding: 64px 24px 32px

Sections:
- Logo/Name: 24px, Serif
- Quick links: 14px, Sans-serif
- Social icons: 24x24px, #FAFAF9
- Copyright: 12px, #A8A29E

Layout:
- Mobile: Stacked sections
- Desktop: 3-column grid
```

---

## Imagery Guidelines

### Photography Style

**Must Have:**
- **High Quality:** Sharp, well-lit, professional
- **Natural Lighting:** Soft, warm light (golden hour aesthetic)
- **Context Shots:** Furniture in real spaces, not white backgrounds
- **Close-ups:** Detail shots showing wood grain, joinery, craftsmanship
- **Lifestyle:** People interacting with furniture (aspirational but authentic)
- **Consistent Style:** Cohesive color grading and mood

**Avoid:**
- Harsh shadows or overly bright highlights
- Cold, blue-tinted lighting
- Cluttered backgrounds
- Low-resolution or pixelated images
- Stock photos that look generic
- Overly staged or artificial setups

### Image Ratios

**Hero Images:** 
- Ratio: 16:9 (widescreen)
- Min resolution: 1920x1080px
- Usage: Homepage hero, page headers

**Product Images:**
- Ratio: 4:3 (traditional)
- Min resolution: 1200x900px
- Usage: Catalogue grid, featured products

**Process Images:**
- Ratio: 4:3 or 3:2
- Min resolution: 800x600px
- Usage: About page, process showcase

**Square Images:**
- Ratio: 1:1
- Min resolution: 800x800px
- Usage: Instagram-style grids, icons

### Image Treatment

**Overlay for Text Readability:**
```css
background: linear-gradient(
  to bottom,
  rgba(0,0,0,0.3) 0%,
  rgba(0,0,0,0.1) 100%
)
```

**Hover Effects:**
```css
transform: scale(1.05);
transition: 300ms ease;
overflow: hidden; /* on parent */
```

**Loading State:**
- Blur placeholder (blur-up technique)
- Skeleton loader in brand colors
- Fade in when loaded

---

## User Interface Patterns

### Homepage Layout

```
┌─────────────────────────────────────┐
│         HEADER (sticky)             │
│  Logo   Home  Catalogue  About  [EN]│
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│                                     │
│        HERO IMAGE (full-width)      │
│      "Artisan Woodworks"            │
│      "Handcrafted Furniture"        │
│         [View Catalogue]            │
│                                     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│    BRAND STORY (centered, brief)    │
│  2-3 sentences about craftsmanship  │
│        [Learn More →]               │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│      FEATURED PRODUCTS              │
│  ┌─────┐  ┌─────┐  ┌─────┐         │
│  │ Img │  │ Img │  │ Img │         │
│  │Name │  │Name │  │Name │         │
│  └─────┘  └─────┘  └─────┘         │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│    PROCESS TEASER (image row)       │
│  "Our Craftsmanship Process"        │
│   [img] [img] [img]                 │
│        [Learn More →]               │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│      CONTACT CTA                    │
│   "Ready for Custom Furniture?"     │
│      [Contact Us via Email]         │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│           FOOTER                    │
│  Links  |  Social  |  Legal         │
└─────────────────────────────────────┘
```

### Catalogue Page Layout

```
┌─────────────────────────────────────┐
│         HEADER (sticky)             │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│      PAGE TITLE                     │
│   "Our Furniture Collection"        │
│   Brief subtitle (1 line)           │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│         FILTERS (sticky)            │
│  [All] [Tables] [Chairs] [Cabinets] │
│  [Oak] [Walnut] [Pine] [Mixed]      │
│  "Showing 8 of 12 products"         │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│      PRODUCT GRID                   │
│  ┌─────┐  ┌─────┐  ┌─────┐         │
│  │ Img │  │ Img │  │ Img │         │
│  │Name │  │Name │  │Name │         │
│  │Type │  │Type │  │Type │         │
│  └─────┘  └─────┘  └─────┘         │
│  ┌─────┐  ┌─────┐  ┌─────┐         │
│  │ Img │  │ Img │  │ Img │         │
│  └─────┘  └─────┘  └─────┘         │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│           FOOTER                    │
└─────────────────────────────────────┘
```

### About & Contact Page Layout

```
┌─────────────────────────────────────┐
│         HEADER (sticky)             │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│   COMPANY INTRO (centered)          │
│   "About Artisan Woodworks"         │
│   2-3 paragraphs                    │
│   Founded 2025 | Sofia, Bulgaria    │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│    PROCESS SECTION                  │
│   "Our Craftsmanship Process"       │
│                                     │
│   1. Design & Consultation          │
│      [icon/image] + description     │
│   2. Material Selection             │
│      [icon/image] + description     │
│   3. Handcrafting                   │
│      [icon/image] + description     │
│   4. Finishing & Quality            │
│      [icon/image] + description     │
│   5. Delivery                       │
│      [icon/image] + description     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│    WHY CHOOSE US                    │
│  [icon] Quality  [icon] Custom      │
│  [icon] Materials [icon] Local      │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│      CONTACT SECTION                │
│   "Get in Touch"                    │
│   [Email: info@artisan...]          │
│   "Follow Us"                       │
│   [Instagram] [Facebook]            │
│   Sofia, Bulgaria                   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│           FOOTER                    │
└─────────────────────────────────────┘
```

---

## Interaction Design

### Hover States

**Links:**
- Underline appears (150ms ease)
- Color shift to darker shade

**Buttons:**
- Background color darkens
- Slight lift (transform: translateY(-2px))
- Shadow increases
- Transition: 200ms ease

**Product Cards:**
- Image zooms (scale: 1.05)
- Card lifts with shadow
- Transition: 300ms ease

**Navigation:**
- Link darkens
- Underline appears beneath
- Active state: underline persists

### Click/Tap States

**Buttons:**
- Press down slightly (transform: scale(0.98))
- Background darkens further
- Duration: 100ms

**Cards:**
- Scale down slightly (0.98)
- Shadow reduces momentarily

### Loading States

**Page Load:**
- Content fades in (opacity 0 → 1, 400ms)
- Stagger animation for cards (50ms delay each)

**Images:**
- Blur placeholder → sharp image fade
- Skeleton loader (subtle pulse animation)

**Filtering:**
- Smooth fade out → position change → fade in
- Duration: 300ms total

### Transitions

**Page Navigation:**
- Fade transition between pages (200ms)
- Scroll position resets to top

**Language Switch:**
- Content fades out → new language fades in
- Duration: 300ms

**Filter Application:**
- Grid items fade/scale slightly
- Reorder with position transition
- Smooth, not jarring

---

## Animations

### Scroll Animations (Subtle)

**Fade In On Scroll:**
```css
opacity: 0 → 1
transform: translateY(20px) → translateY(0)
duration: 600ms
easing: ease-out
trigger: When element 20% visible
```

**Usage:** Section headings, product cards, process steps

**Avoid:** Excessive motion, parallax effects (can feel dated), horizontal scrolling

### Micro-animations

**Button Click:**
- Scale pulse: 1 → 0.95 → 1.02 → 1
- Duration: 300ms

**Filter Selection:**
- Background color transition
- Border appears
- Checkmark or indicator fades in

**Email Copy:**
- Brief success message fade in/out
- Checkmark icon animation

---

## Responsive Behavior

### Breakpoints

```css
mobile: 320px - 767px
tablet: 768px - 1023px
desktop: 1024px - 1279px
large: 1280px+
```

### Layout Transformations

**Navigation:**
- Desktop: Horizontal menu
- Mobile: Hamburger → Side drawer

**Grid:**
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column

**Typography:**
- Desktop: Full size
- Tablet: 90% of desktop
- Mobile: 85% of desktop (but maintain readability)

**Spacing:**
- Desktop: Full spacing scale
- Tablet: 75% of desktop
- Mobile: 50-65% of desktop

**Images:**
- Desktop: Full resolution
- Mobile: Optimized smaller versions (next/image handles this)

### Touch Targets (Mobile)

**Minimum Size:** 44x44px (Apple HIG standard)

**Apply to:**
- All buttons
- Navigation links
- Filter buttons
- Social media icons
- Language switcher
- Clickable cards

**Implementation:**
```css
padding: 12px 16px; /* ensures adequate size */
min-height: 44px;
min-width: 44px;
```

---

## Accessibility (A11y)

### Color Contrast

**Must Meet WCAG AA:**
- Normal text (< 18px): Contrast ratio ≥ 4.5:1
- Large text (≥ 18px): Contrast ratio ≥ 3:1
- UI components: Contrast ratio ≥ 3:1

**Testing:**
- Black (#000000) on White (#FFFFFF): 21:1 ✓
- Dark gray (#44403C) on White: 10.4:1 ✓
- Wood yellow (#D4A574) on Black: 5.2:1 ✓

### Focus Indicators

**Visible Focus:**
```css
outline: 2px solid #D4A574;
outline-offset: 2px;
```

**Never:**
- Remove outlines without replacement
- Use only color to indicate focus

### Semantic HTML

**Use Proper Elements:**
- `<nav>` for navigation
- `<main>` for main content
- `<header>` and `<footer>`
- `<article>` for product cards
- `<h1>` through `<h6>` in proper order
- `<button>` for interactive elements, not `<div>`

### Alt Text

**Product Images:**
```html
alt="Handcrafted oak dining table with natural finish"
```

**Decorative Images:**
```html
alt="" or aria-hidden="true"
```

**Icons with Meaning:**
```html

```

### Screen Reader Support

- Proper heading hierarchy (no skipped levels)
- ARIA labels for icon buttons
- `aria-current="page"` for active nav item
- Skip to main content link
- Language attribute on `<html>` tag

---

## Design System Summary

### Quick Reference

**Colors:**
- Primary: `#000000` (Black), `#FFFFFF` (White)
- Accent: `#D4A574` (Wood Yellow), `#8B6F47` (Wood Brown)
- Grays: `#F5F5F4`, `#A8A29E`, `#44403C`

**Fonts:**
- Headings: Playfair Display (Serif)
- Body: Inter (Sans-serif)

**Spacing:**
- Mobile: 16-24px between elements
- Desktop: 24-48px between elements
- Sections: 64-96px spacing

**Buttons:**
- Primary: Wood yellow background, black text
- Secondary: Transparent with black border

**Grid:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

**Shadows:**
- Subtle: `0 2px 8px rgba(0,0,0,0.04)`
- Hover: `0 8px 24px rgba(0,0,0,0.08)`
- Strong: `0 12px 32px rgba(0,0,0,0.12)`

**Borders:**
- Subtle: `1px solid #E7E5E4`
- Medium: `1px solid #D6D3D1`
- Accent: `2px solid #D4A574`

**Border Radius:**
- Buttons: `4px`
- Cards: `8px`
- Images: `4px` or `8px`

**Transitions:**
- Fast: `150ms ease`
- Standard: `200ms ease`
- Slow: `300ms ease`
- Smooth scroll: `600ms ease-out`

---

## Design Don'ts

### What to Avoid

❌ **Cluttered layouts** - Less is more; embrace whitespace  
❌ **Too many fonts** - Stick to 2 font families maximum  
❌ **Bright, saturated colors** - Keep it natural and muted  
❌ **Complex animations** - Subtle and purposeful only  
❌ **Generic stock photos** - Use authentic, high-quality imagery  
❌ **Small touch targets** - Minimum 44x44px for mobile  
❌ **Busy backgrounds** - Keep backgrounds simple and clean  
❌ **Excessive text** - Be concise; let images tell the story  
❌ **Auto-playing videos** - No auto-play media (annoying)  
❌ **Pop-ups** - No email capture pop-ups (ruins experience)  
❌ **Carousels** - Avoid auto-rotating carousels (accessibility issues)  
❌ **Parallax overload** - Keep scrolling natural and predictable  

---

## Design Inspiration Keywords

When looking for visual reference or placeholder images, use these keywords:

- "Scandinavian furniture showroom"
- "Artisan woodworking portfolio"
- "Luxury furniture minimal website"
- "Natural wood interior design"
- "Handcrafted furniture photography"
- "Elegant carpentry showcase"
- "Warm minimalist furniture"
- "Boutique furniture store"

**Example Sites for Inspiration:**
- High-end furniture brands with clean designs
- Artisan craft portfolios
- Architecture firm websites (clean, image-focused)
- Interior design studios (emphasis on photography)

---

## Summary

The Artisan Woodworks website design is rooted in simplicity, elegance, and the celebration of natural craftsmanship. Every element—from the warm wood-tone color palette to the generous whitespace and high-quality photography—works together to create a luxurious yet approachable experience. The design never competes with the furniture; instead, it provides a refined stage for the craftsmanship to shine. Users should feel welcomed, inspired, and confident in the quality they're seeing, ultimately leading them to reach out via email to begin their custom furniture journey.

---

## Admin Panel Design Guidelines

### Design Philosophy for Admin Panel

**"Function Over Form"**

The admin panel serves a completely different purpose than the public site. While the public site is about inspiration and luxury, the admin panel is about **efficiency and ease of use**.

#### Admin Panel Principles
1. **Functional** - Every element serves a clear purpose
2. **Simple** - No unnecessary decoration or complexity
3. **Intuitive** - Client should understand without training
4. **Efficient** - Common tasks should be fast
5. **Clear** - Obvious what everything does
6. **Forgiving** - Easy to undo mistakes

**Target User:** Non-technical business owner (the client) who needs to manage products independently.

---

## Admin Panel Visual Design

### Color Palette (Admin)

**Base Colors:**
- Background: `#F9FAFB` (light gray, easy on eyes)
- Cards/Panels: `#FFFFFF` (white)
- Text Primary: `#111827` (near-black)
- Text Secondary: `#6B7280` (medium gray)
- Borders: `#E5E7EB` (light gray)

**Action Colors:**
- Primary Action: `#D4A574` (wood yellow - connects to brand)
- Primary Hover: `#8B6F47` (wood brown)
- Secondary Action: `#000000` (black)
- Secondary Hover: `#1F2937` (dark gray)

**Status Colors:**
```css
Published: 
  - Background: #ECFDF5 (light green)
  - Text: #065F46 (dark green)
  - Border: #10B981 (green)

Hidden:
  - Background: #FEF3C7 (light yellow)
  - Text: #92400E (dark orange)
  - Border: #F59E0B (orange)

Sold:
  - Background: #FEE2E2 (light red)
  - Text: #991B1B (dark red)
  - Border: #EF4444 (red)
```

**Feedback Colors:**
- Success: `#10B981` (green)
- Error: `#EF4444` (red)
- Warning: `#F59E0B` (orange)
- Info: `#3B82F6` (blue)

**No need to match public site luxury aesthetic.** Admin panel should be clean, functional, and easy to read.

---

### Typography (Admin)

**Font Family:**
- Use single sans-serif throughout: Inter or system fonts
- No serif fonts in admin panel
- Prioritize readability over aesthetics

**Type Scale:**
```css
Page Title (h1): 32px (2rem), Bold
Section Title (h2): 24px (1.5rem), SemiBold
Card Title (h3): 20px (1.25rem), SemiBold
Body Large: 16px (1rem), Regular
Body: 14px (0.875rem), Regular
Body Small: 12px (0.75rem), Regular
Button Text: 14px (0.875rem), Medium
```

**Line Heights:**
- Headings: 1.25
- Body: 1.5
- Buttons: 1 (single line)

---

### Layout & Spacing (Admin)

**Container:**
- Max width: 1280px (same as public site)
- Padding: 16px (mobile), 24px (tablet), 32px (desktop)
- Centered with `mx-auto`

**Spacing Scale (Tighter than public site):**
```css
xs: 4px   - Between related items
sm: 8px   - Form field spacing
md: 16px  - Component spacing
lg: 24px  - Section spacing
xl: 32px  - Page section breaks
```

**Grid Layouts:**
- Stats cards: 4 columns (desktop), 2 columns (tablet), 1 column (mobile)
- Product list: Full width table
- Form fields: 1 or 2 column layout

---

## Admin Panel Components

### Navigation (Admin)

**Layout Options:**
1. **Top Bar** (Recommended - simpler)
   - Logo/Site name on left
   - Navigation links in center
   - User email + logout on right
   - Sticky at top
   - Height: 64px

2. **Sidebar** (Alternative)
   - Fixed left sidebar
   - 240px wide
   - Collapsible on mobile
   - Navigation items vertical

**Top Bar Implementation:**
```tsx

  
    
      
        Artisan Woodworks Admin
      
      
      
        Dashboard
        Products
        Add Product
      
      
      
        {user.email}
        Logout
      
    
  

```

**Active Page Indicator:**
- Bold text
- Underline (2px, wood-yellow color)
- Or background highlight

---

### Buttons (Admin)

**Primary Button:**
```css
Background: #D4A574 (wood yellow)
Text: #000000 (black)
Padding: 10px 20px (medium), 12px 24px (large)
Border-radius: 6px
Font: 14px, Medium weight
Hover: Background #8B6F47
Transition: 150ms ease
```

**Secondary Button:**
```css
Background: #FFFFFF (white)
Border: 1px solid #D1D5DB (gray)
Text: #374151 (dark gray)
Padding: 10px 20px
Border-radius: 6px
Hover: Background #F9FAFB
```

**Danger Button (Delete):**
```css
Background: #EF4444 (red)
Text: #FFFFFF (white)
Padding: 10px 20px
Border-radius: 6px
Hover: Background #DC2626 (darker red)
```

**Button States:**
- Default: Normal appearance
- Hover: Slightly darker background
- Active: Slightly pressed appearance
- Disabled: Opacity 50%, cursor not-allowed
- Loading: Spinner icon, text "Loading..." or "Saving..."

**Icon Buttons:**
```css
Size: 36x36px (touch-friendly)
Icon: 20x20px
Border-radius: 6px
Background: Transparent
Hover: Background #F3F4F6
```

---

### Forms (Admin)

**Form Layout:**
- Single column on mobile
- 2 columns on desktop for related fields
- Full width for text areas
- Clear visual hierarchy

**Input Fields:**
```css
Height: 40px (comfortable)
Padding: 10px 12px
Border: 1px solid #D1D5DB
Border-radius: 6px
Font: 14px
Background: #FFFFFF

Focus:
  Border: 2px solid #D4A574 (wood yellow)
  Outline: none
  Box-shadow: 0 0 0 3px rgba(212, 165, 116, 0.1)

Error:
  Border: 1px solid #EF4444 (red)

Disabled:
  Background: #F9FAFB
  Cursor: not-allowed
```

**Labels:**
```css
Font: 14px, Medium weight
Color: #374151 (dark gray)
Margin-bottom: 6px
Required indicator: Red asterisk *
```

**Helper Text:**
```css
Font: 12px, Regular
Color: #6B7280 (medium gray)
Margin-top: 4px
```

**Error Messages:**
```css
Font: 12px, Medium
Color: #EF4444 (red)
Margin-top: 4px
Icon: Alert circle (red)
```

**Dropdowns/Selects:**
- Same styling as input fields
- Chevron down icon on right
- Dropdown menu with white background
- Hover state on options

**Checkboxes:**
```css
Size: 20x20px
Border: 1px solid #D1D5DB
Border-radius: 4px
Checked: Background #D4A574, white checkmark
```

**Radio Buttons:**
```css
Size: 20x20px (outer circle)
Inner dot: 10x10px
Border: 1px solid #D1D5DB
Selected: Border #D4A574, inner dot #D4A574
```

---

### Rich Text Editor (Tiptap)

**Toolbar:**
```css
Background: #F9FAFB
Border: 1px solid #E5E7EB
Border-bottom: none
Padding: 8px
Border-radius: 6px 6px 0 0
```

**Toolbar Buttons:**
```css
Size: 32x32px
Icon: 18x18px
Border-radius: 4px
Background: Transparent
Hover: Background #E5E7EB
Active: Background #D1D5DB (when formatting applied)
```

**Editor Area:**
```css
Min-height: 200px
Padding: 12px
Border: 1px solid #E5E7EB
Border-radius: 0 0 6px 6px
Background: #FFFFFF
Font: 14px
Line-height: 1.6
```

**Keep it minimal:** Only essential formatting buttons. No excessive features that confuse users.

---

### Tables (Admin)

**Product List Table:**
```css
Width: 100%
Background: #FFFFFF
Border: 1px solid #E5E7EB
Border-radius: 8px
```

**Table Header:**
```css
Background: #F9FAFB
Border-bottom: 1px solid #E5E7EB
Padding: 12px 16px
Font: 12px, SemiBold, Uppercase
Color: #6B7280
Letter-spacing: 0.05em
```

**Table Rows:**
```css
Border-bottom: 1px solid #F3F4F6
Padding: 12px 16px
Font: 14px
Hover: Background #F9FAFB
```

**Table Cells:**
- Image: 60x45px thumbnail
- Text: Truncate with ellipsis if too long
- Status: Badge component
- Actions: Icon buttons (Edit, Delete)

**Responsive:**
- Desktop: Full table
- Tablet: Horizontal scroll
- Mobile: Card layout (not table)

---

### Cards (Admin)

**Stat Card (Dashboard):**
```css
Background: #FFFFFF
Border: 1px solid #E5E7EB
Border-radius: 8px
Padding: 24px
Box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1)

Hover:
  Box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
  Transition: 150ms ease
```

**Stat Card Content:**
```tsx

  Total Products
  24
  +3 this week

```

**Product Card (Grid View, if used):**
- Image at top (16:9 or 4:3 ratio)
- Title below
- Metadata (category, wood type)
- Status badge
- Action buttons at bottom

---

### Badges (Status Indicators)

**Badge Structure:**
```css
Padding: 4px 12px
Border-radius: 12px (pill shape)
Font: 12px, Medium
Display: inline-flex
Align-items: center
Gap: 4px (for icon + text)
```

**Status Badges (as defined earlier):**
- Published: Green
- Hidden: Orange/Yellow
- Sold: Red

**Example:**
```tsx

  
  Published

```

---

### Modals/Dialogs (Admin)

**Confirmation Dialog:**
```css
Overlay: rgba(0, 0, 0, 0.5)
Modal: 
  Background: #FFFFFF
  Max-width: 400px
  Border-radius: 8px
  Padding: 24px
  Box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1)
```

**Modal Structure:**
```tsx

  Delete Product?
  
    Are you sure you want to delete this product? This action cannot be undone.
  
  
    Cancel
    Delete
  

```

**Use for:**
- Delete confirmations
- Status change confirmations (sold)
- Image preview (optional)
- Unsaved changes warning (optional)

---

### File Upload Components

**Image Upload Zone:**
```css
Border: 2px dashed #D1D5DB
Border-radius: 8px
Padding: 32px
Text-align: center
Background: #F9FAFB
Min-height: 200px

Drag-over:
  Border-color: #D4A574
  Background: #FEF5E7

Error:
  Border-color: #EF4444
  Background: #FEE2E2
```

**Upload Zone Content:**
```tsx

  
  
    Drop images here or click to browse
  
  
    PNG, JPG, or WebP • Max 5MB • Up to 10 images
  

```

**Image Preview Grid:**
```css
Grid: 3 columns (desktop), 2 columns (tablet), 1 column (mobile)
Gap: 16px
```

**Image Preview Item:**
```css
Position: relative
Border-radius: 8px
Overflow: hidden
Aspect-ratio: 4/3

Image:
  Width: 100%
  Height: 100%
  Object-fit: cover

Remove button:
  Position: absolute
  Top: 8px
  Right: 8px
  Background: rgba(0, 0, 0, 0.7)
  Color: #FFFFFF
  Padding: 6px
  Border-radius: 4px
  Hover: Background rgba(0, 0, 0, 0.9)
```

**Progress Bar (During Upload):**
```css
Height: 4px
Background: #E5E7EB
Border-radius: 2px

Progress:
  Background: #D4A574
  Transition: width 150ms ease
```

**Drag Handle (for reordering):**
```css
Icon: Six dots (grip)
Size: 20x20px
Color: #9CA3AF
Cursor: grab (when draggable)
Active: cursor: grabbing
```

---

### Loading States (Admin)

**Spinner:**
```css
Size: 20x20px (inline), 40x40px (page)
Border: 2px solid #E5E7EB
Border-top-color: #D4A574
Border-radius: 50%
Animation: spin 600ms linear infinite
```

**Skeleton Loaders:**
- Use for table rows loading
- Gray boxes with shimmer animation
- Match dimensions of actual content

**Button Loading:**
```tsx

  {loading ? (
    <>
      
      Saving...
    </>
  ) : (
    'Save Product'
  )}

```

---

### Toast Notifications (Admin)

**Toast Container:**
```css
Position: fixed
Top: 24px
Right: 24px
Z-index: 9999
```

**Toast:**
```css
Background: #FFFFFF
Border-radius: 8px
Padding: 16px
Box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
Min-width: 300px
Max-width: 400px
```

**Toast Types:**
- Success: Green left border (4px), green icon
- Error: Red left border, red icon
- Warning: Orange left border, orange icon
- Info: Blue left border, blue icon

**Auto-dismiss:**
- Success: 5 seconds
- Error: Keep until dismissed (X button)
- Warning: 7 seconds
- Info: 5 seconds

---

## Admin Panel Page Layouts

### Login Page Layout

**Centered card design:**
```tsx

  
    Admin Login
    
      {/* Email and password fields */}
      Login
    
  

```

**No header/footer** - Just the login form centered on page.

---

### Dashboard Layout

**Top navigation + content grid:**
```tsx

  
  
    Welcome, {user.email}
    
    {/* 4-column stats grid */}
    
      
      
      
      
    
    
    {/* Quick actions */}
    
      Add New Product
      View All Products
    
  

```

---

### Product List Layout

**Table with filters above:**
```tsx

  
  
    
      Products
      Add New Product
    
    
    {/* Filters */}
    
      
        {/* Status filter */}
        {/* Category filter */}
        
      
    
    
    {/* Product table */}
    
      {/* Product rows */}
    
  

```

---

### Product Form Layout (Add/Edit)

**Single column form with sections:**
```tsx

  
  
    
      {isEdit ? 'Edit Product' : 'Add New Product'}
    
    
    
      {/* Basic Info Section */}
      
        Basic Information
        
          
          
          
          
        
      
      
      {/* Descriptions Section */}
      
        Descriptions
        
        
      
      
      {/* Images Section */}
      
        Images (Max 10)
        
      
      
      {/* Video Section */}
      
        Video (Optional)
        
      
      
      {/* Settings Section */}
      
        Settings
        
        
      
      
      {/* Actions */}
      
        Save Product
        Cancel
        {isEdit && (
          Delete
        )}
      
    
  

```

---

## Admin Panel Responsive Behavior

### Breakpoints (Admin)
```css
Mobile: < 768px
Tablet: 768px - 1023px
Desktop: 1024px+
```

### Mobile Adaptations

**Navigation:**
- Top bar collapses to hamburger menu
- Full-screen overlay menu
- Large touch targets (48x48px minimum)

**Dashboard Stats:**
- 1 column (stacked)
- Full width cards

**Product List:**
- Switch from table to card layout
- Each product in its own card
- Stack information vertically

**Forms:**
- All fields full width
- Single column only
- Larger touch targets for inputs
- Sticky save button at bottom

**Image Upload:**
- Single column grid for previews
- Larger drop zone

---

## Admin Panel Accessibility

**Ensure admin panel is accessible:**
- All form fields have labels
- All buttons have descriptive text or aria-label
- Focus states clearly visible
- Keyboard navigation works
- Error messages associated with fields
- Color is not the only indicator (use icons too)
- Adequate color contrast everywhere

**Test with:**
- Keyboard only (tab through all elements)
- Screen reader (basic testing)
- WAVE accessibility tool

---

## Admin Panel Icons

**Use lucide-react icons consistently:**
- Plus: Add/Create
- Pencil: Edit
- Trash: Delete
- Eye: View/Preview
- EyeOff: Hidden status
- Check: Success/Published
- X: Close/Cancel/Error
- Upload: File upload
- GripVertical: Drag handle
- Search: Search
- Filter: Filters
- LogOut: Logout
- Home: Dashboard
- Package: Products
- Image: Images
- Video: Video

**Icon sizes:**
- Small: 16x16px
- Medium: 20x20px
- Large: 24x24px

---

## Admin Panel vs Public Site Comparison

| Aspect | Public Site | Admin Panel |
|--------|-------------|-------------|
| **Purpose** | Inspire and convert | Manage content efficiently |
| **Aesthetic** | Luxury, elegant, spacious | Clean, functional, efficient |
| **Colors** | Black, white, wood tones only | Utilitarian (green, red, orange ok) |
| **Typography** | Serif headings, sans body | Sans-serif throughout |
| **Spacing** | Generous, luxurious | Tighter, efficient |
| **Images** | Large, prominent, hero shots | Small thumbnails, practical |
| **Animations** | Smooth, elegant | Minimal, functional |
| **Language** | Bilingual (EN/BG) required | English only ok |
| **Complexity** | Simple, minimal features | More features, more options |
| **Target User** | Potential customers | Business owner (client) |
| **Priority** | Emotional impact | Task completion |

---

## Summary

The Artisan Woodworks website has **two distinct design systems:**

**Public Site:** Luxury, elegant, minimal, spacious, emotionally engaging
**Admin Panel:** Functional, clear, efficient, easy to use, task-focused

Both should be **high quality**, but optimized for their different purposes. The public site sells through beauty and inspiration. The admin panel serves through clarity and efficiency.

**Build the admin panel with the client in mind** - a non-technical business owner who needs to add products without frustration. Every interaction should be obvious, every action should have feedback, every error should be clear and helpful.