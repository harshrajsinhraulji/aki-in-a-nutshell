# Aki's World — Design System

> A bold, cinematic, pink-forward design language for a raw, intimate personal brand.

---

## Brand Voice

**Tone:** Raw, candid, late-night, witty, intimate  
**Style:** Short paragraphs, punchy microcopy, forgivingly colloquial but never abusive  
**Personality:** Authentic, chaotic-cozy, nostalgic yet forward-looking

---

## Color Palette

| Token Name | Hex | Usage |
|------------|-----|-------|
| `--color-primary-pink` | `#FF6CA4` | Primary actions, CTAs, active states, brand signature |
| `--color-bubblegum` | `#FFD6EC` | Secondary backgrounds, hover states, card accents |
| `--color-pale-peach` | `#FFF2F7` | Light mode backgrounds, subtle fills |
| `--color-mint-accent` | `#00E6A8` | Success states, positive reactions, fresh highlights |
| `--color-lemon-accent` | `#FFE27A` | Warnings, featured badges, playful highlights |
| `--color-dark-neutral` | `#121212` | Dark mode background, text on light |
| `--color-off-white` | `#F7F7F8` | Light mode text, cards on dark |

### Color Usage Rules
- **Primary Pink** dominates CTAs, navigation highlights, and brand elements
- **Bubblegum** for softer container backgrounds and hover transitions
- **Mint & Lemon** used sparingly for reactions and status badges
- Dark mode: `#121212` background with `#F7F7F8` text
- Light mode: `#FFF2F7` background with `#121212` text

---

## Typography

### Font Stack

| Role | Primary | Fallback | Weight Range |
|------|---------|----------|--------------|
| **Headings** | Sora | Lexend, system-ui | 600–800 |
| **Body** | Inter | DM Sans, system-ui | 400–500 |
| **Mono/Timestamps** | Roboto Mono | monospace | 400 |

### Type Scale

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `--text-hero` | 4rem / 64px | 1.1 | Hero headlines |
| `--text-h1` | 2.5rem / 40px | 1.2 | Page titles |
| `--text-h2` | 1.75rem / 28px | 1.3 | Section headers |
| `--text-h3` | 1.25rem / 20px | 1.4 | Card titles |
| `--text-body` | 1rem / 16px | 1.6 | Body copy |
| `--text-small` | 0.875rem / 14px | 1.5 | Captions, timestamps |
| `--text-micro` | 0.75rem / 12px | 1.4 | Badges, labels |

### Font Loading
```
Google Fonts: Sora:wght@600;700;800 | Inter:wght@400;500 | Roboto+Mono:wght@400
```
Use `font-display: swap` for performance.

---

## Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Micro gaps |
| `--space-2` | 8px | Tight spacing |
| `--space-3` | 12px | Default gaps |
| `--space-4` | 16px | Base padding (p-4) |
| `--space-6` | 24px | Section spacing |
| `--space-8` | 32px | Large sections |
| `--space-12` | 48px | Hero spacing |
| `--space-16` | 64px | Page sections |

---

## Layout Tokens

| Token | Value |
|-------|-------|
| `--max-width` | 1200px |
| `--border-radius-sm` | 8px |
| `--border-radius-md` | 12px |
| `--border-radius-lg` | 16px |
| `--border-radius-2xl` | 24px |
| `--border-radius-full` | 9999px |

---

## Effects & Treatments

### Glassmorphism Panels
```css
background: rgba(255, 255, 255, 0.08);
backdrop-filter: blur(16px);
border: 1px solid rgba(255, 255, 255, 0.12);
border-radius: var(--border-radius-2xl);
```

### Soft Shadows
```css
/* Card shadow */
box-shadow: 0 4px 24px rgba(255, 108, 164, 0.12);

/* Elevated shadow */
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.16);

/* Hover lift */
box-shadow: 0 12px 40px rgba(255, 108, 164, 0.2);
```

### Film Grain Overlay (Hero Images)
Apply via CSS pseudo-element or SVG filter for nostalgic texture:
```css
.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('/textures/grain.svg');
  opacity: 0.04;
  pointer-events: none;
}
```

### Sticker-Like Badges
```css
background: var(--color-lemon-accent);
color: var(--color-dark-neutral);
padding: var(--space-1) var(--space-3);
border-radius: var(--border-radius-full);
font-size: var(--text-micro);
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.05em;
box-shadow: 2px 2px 0 var(--color-dark-neutral);
```

---

## Motion & Animation

### Core Principles
1. Subtle, intentional, never distracting
2. Honor `prefers-reduced-motion` media query
3. Use spring-based easing for organic feel

### Timing Tokens

| Token | Duration | Easing | Usage |
|-------|----------|--------|-------|
| `--duration-fast` | 150ms | ease-out | Micro-interactions |
| `--duration-normal` | 250ms | ease-in-out | State changes |
| `--duration-slow` | 400ms | cubic-bezier(0.4, 0, 0.2, 1) | Page transitions |
| `--duration-reveal` | 600ms | cubic-bezier(0.22, 1, 0.36, 1) | Scroll reveals |

### Animations

**Hero Parallax**
- Background moves at 0.3x scroll speed
- Foreground text at 1.0x (normal)
- Depth layers for floating elements

**Staggered Reveal on Scroll**
- Cards animate in with 50ms delay between items
- Initial state: `opacity: 0; transform: translateY(20px)`
- Final state: `opacity: 1; transform: translateY(0)`
- Use Intersection Observer for performance

**Hover Micro-interactions**
- Cards: slight lift (translateY: -4px) + shadow expansion
- Buttons: scale(1.02) + background color shift
- Links: underline animation from left to right

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Iconography

- **Style:** Outlined, 2px stroke, rounded caps
- **Size tokens:** 16px (inline), 20px (UI), 24px (nav), 32px (feature)
- **Source:** Lucide Icons or Phosphor Icons (both free)

---

## Imagery Guidelines

### Photo Style
- High-contrast night portraits
- Travel vistas with moody lighting
- Plush close-ups with soft focus backgrounds
- Authentic, not overly filtered

### Technical Requirements
- **Formats:** WebP primary, AVIF where supported, JPEG fallback
- **LQIP:** 20px wide base64 blur placeholder
- **Responsive srcset:** 480w, 768w, 1024w, 1440w
- **Aspect ratios:** Hero 16:9, Cards 4:3, Gallery 1:1 or 3:4

---

## Accessibility Tokens

| Check | Requirement |
|-------|-------------|
| Color contrast | WCAG AA minimum (4.5:1 for text) |
| Focus indicators | 2px solid `--color-primary-pink` with 2px offset |
| Touch targets | Minimum 44x44px |
| Font scaling | Support up to 200% without breaking layout |

---

## Dark / Light Mode

**Dark Mode (Default)**
- Background: `#121212`
- Surface: `rgba(255, 255, 255, 0.04)`
- Text primary: `#F7F7F8`
- Text secondary: `rgba(247, 247, 248, 0.7)`

**Light Mode**
- Background: `#FFF2F7`
- Surface: `#FFFFFF`
- Text primary: `#121212`
- Text secondary: `rgba(18, 18, 18, 0.7)`

Theme preference stored in `localStorage` key: `aki-theme`
