# Mockup Descriptions & Wireframe Specifications

> High-fidelity mockup descriptions for Desktop, Tablet, and Mobile breakpoints.

---

## Breakpoints

| Device | Width | Columns |
|--------|-------|---------|
| Mobile | 320–767px | 4 |
| Tablet | 768–1023px | 8 |
| Desktop | 1024px+ | 12 |

---

## Homepage Mockups

### Desktop (1440px)

**Hero Section:**
- Full-bleed background image/video (1440x800px min)
- Centered content with max-width 1200px
- Aki sticker badge: top-left of content, 80px, tilted 5°
- Headline: "Aki • 18 • Sri Lanka → England" — Sora 64px, Off-White
- Subline: italic Inter 20px, rgba(white, 0.8)
- CTA row: 4 buttons horizontally spaced, Primary Pink for first, ghost for rest
- Stats chips: horizontal pill row below CTAs
- Film grain overlay at 4% opacity
- Scroll indicator: animated chevron at bottom

**Plushie of the Week:**
- Asymmetric card, 60% width, positioned right of center
- Image: 400x300px, rounded-2xl
- Name + tagline + CTA link
- Subtle rotation (2°) and shadow

**Latest Stories Section:**
- Heading left-aligned
- 3-column grid of StoryCards
- Cards: image top (aspect 16:9), title, excerpt, tags, timestamp
- "View all" link aligned right

**Confessions Preview:**
- 2-column layout
- 4 confession cards, staggered heights
- Glassmorphism background panel

**Footer:**
- 3-column layout
- Brand + bio | Quick links | Socials
- Birthday badge: bottom center
- Dark background with subtle gradient

---

### Tablet (768px)

**Hero:**
- Reduced height (600px)
- Headline: 48px
- Stats chips: horizontal scroll if overflow
- CTAs: 2x2 grid

**Plushie of the Week:**
- Full width, centered

**Latest Stories:**
- 2-column grid
- Smaller card images

**Confessions:**
- Single column, 3 visible

**Footer:**
- 2-column: (Brand + Socials) | Links
- Birthday badge inline

---

### Mobile (375px)

**Hero:**
- Min-height 500px
- Headline: 36px, centered
- Subline: 16px
- CTAs: stacked vertically, full width
- Stats chips: horizontal scroll
- Parallax disabled

**Plushie of the Week:**
- Full width card
- Smaller image (full width, 200px height)

**Latest Stories:**
- Single column
- Cards: horizontal layout (image left, text right) or stacked

**Confessions:**
- Single column, 2 visible
- "See more" expander

**Footer:**
- Single column, stacked sections
- Larger touch targets for socials

---

## Stories Index Mockups

### Desktop

**Header:**
- Title + subtitle centered
- Filter pills horizontally scrollable

**Grid:**
- Masonry layout, 3 columns
- Cards with varying heights based on content
- Infinite scroll or "Load more" button

### Tablet
- 2 columns
- Smaller card images

### Mobile
- Single column
- Cards stacked vertically

---

## Story Detail Mockups

### Desktop

**Layout:** Two-region

**Left (65%):**
- Cover image (full width, 16:9)
- Title (H1, 48px)
- Meta row: tags, date, read time
- Body content (markdown rendered)
- Inline gallery (scrollable row)
- Instagram embed if applicable

**Right (35%):**
- Sticky sidebar
- Author card (Aki avatar + short bio)
- Share buttons (Copy link, X, etc.)
- Mood meter slider (emoji scale)
- Related stories (3 card stack)

### Mobile
- Single column
- Cover → Title → Meta → Body → Gallery → Mood → Related
- Share as floating button

---

## Gallery Mockups

### Desktop

**Header:**
- Title + subtitle
- Album filter tabs
- View toggle (Grid / Map) — optional

**Grid:**
- 4-column masonry
- Images with subtle hover overlay (expand icon)
- Click opens lightbox

**Lightbox:**
- Full overlay, dark background
- Large image centered
- Navigation arrows on sides
- Counter top-left
- Info panel bottom (caption, date)
- Close button top-right

### Mobile
- 2-column grid
- Lightbox: swipe navigation
- Larger close button

---

## Confessions Page Mockups

### Desktop

**Header:**
- Title + subtitle
- "Confess something" button (Primary Pink, right-aligned)

**Feed:**
- Centered column (max 600px)
- Cards stacked vertically
- Each card: body text, optional image, timestamp, reactions, report

**Submit Modal:**
- Overlay, centered
- Form: textarea (large), image upload zone, toggles, submit button

### Mobile
- Feed full width
- Modal: bottom sheet style
- Large touch targets

---

## Plushies Page Mockups

### Desktop

**Header:**
- "The Plushie Squad" + subtitle
- "Add a plushie" button (admin only visible)

**Grid:**
- 4-column
- Square cards
- Image, name below, tagline
- Hover: slight tilt, shadow expansion

### Mobile
- 2-column grid
- Smaller cards

---

## Plushie Detail Mockups

### Desktop

**Layout:** Two-column

**Left (60%):**
- Large hero image
- Thumbnail carousel below (horizontal scroll)

**Right (40%):**
- Name (H1)
- Tags (pill badges)
- "Added on" date
- Description (full story, scrollable if long)
- Mood Timeline (vertical list)

### Mobile
- Stacked layout
- Image → Name → Tags → Story → Mood Timeline

---

## Songs Page & Audio Player Mockups

### Desktop

**Songs Page:**
- Title + subtitle
- Playlist: vertical list
- Each track: album art (48px), title, artist, duration
- Click to play, currently playing highlighted
- Drag handles for reorder (admin)

**Audio Player (Fixed Bar):**
- Height: 64px
- Left: album art (48px) + title + artist
- Center: controls (prev, play/pause, next) + seek bar + time
- Right: volume slider + mute + shuffle + repeat

### Mobile
- Player: bottom bar, compact
- Controls: play/pause prominent, swipe up for full player
- Full player: large album art, controls below

---

## Admin Dashboard Mockups

### Desktop

**Layout:** Sidebar + Main Content

**Sidebar (240px):**
- Logo
- Nav items with icons
- Active item: Primary Pink background
- Collapse button at bottom

**Main Content:**
- Top: Welcome message + date
- Stats cards row (4 cards)
- Main area: context-dependent (queue, grid, form)

### Mobile
- Sidebar becomes bottom nav (5 icons)
- Stats cards scroll horizontally
- Tables become card lists

---

## Color Treatment Examples

### Dark Mode (Default)
```
Background: #121212
Cards: rgba(255,255,255,0.04) with 1px border rgba(255,255,255,0.08)
Text Primary: #F7F7F8
Text Secondary: rgba(247,247,248,0.7)
Accent: #FF6CA4
```

### Light Mode
```
Background: #FFF2F7
Cards: #FFFFFF with shadow
Text Primary: #121212
Text Secondary: rgba(18,18,18,0.7)
Accent: #FF6CA4 (same)
```

---

## Interaction States

### Buttons

| State | Treatment |
|-------|-----------|
| Default | bg: Primary Pink, text: white |
| Hover | bg: darken 10%, scale 1.02 |
| Active | bg: darken 15%, scale 0.98 |
| Disabled | bg: gray, opacity 0.5 |
| Focus | 2px pink outline, 2px offset |

### Cards

| State | Treatment |
|-------|-----------|
| Default | resting shadow |
| Hover | lift (translateY -4px), enhanced shadow |
| Active | scale 0.98 |
| Focus | 2px pink outline |

### Links

| State | Treatment |
|-------|-----------|
| Default | Primary Pink, no underline |
| Hover | underline animation from left |
| Visited | slightly desaturated |
| Focus | 2px outline |

---

## Responsive Behavior Notes

1. **Navigation:** Collapses to hamburger at <768px
2. **Hero:** Parallax disabled on mobile, touch scrolling prioritized
3. **Grids:** Reduce columns at each breakpoint
4. **Typography:** Scale down 15-20% for mobile
5. **Touch targets:** Minimum 44x44px on mobile
6. **Modals:** Bottom sheet on mobile, centered on desktop
7. **Fixed elements:** Audio player always visible (shorter on mobile)
