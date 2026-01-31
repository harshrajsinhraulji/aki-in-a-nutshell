# Component Inventory & Specifications

> Detailed specs for all UI components in Aki's World.

---

## Global Components

### 1. Navigation (StickyNav)

**Behavior:**
- Fixed to top on scroll after 100px
- Glassmorphism background on scroll
- Collapses to hamburger on mobile (<768px)

**Elements:**
| Element | Spec |
|---------|------|
| Logo | "aki." in Sora 700, Primary Pink |
| Nav Links | Home, Stories, Gallery, Confessions, Plushies, Songs |
| Theme Toggle | Sun/Moon icon, 24px, animated rotation |
| CTA Button | "Message Aki" linking to Discord |

**States:**
- Default: transparent background
- Scrolled: glass panel with blur
- Mobile: slide-in drawer from right

---

### 2. Footer

**Layout:** Three columns on desktop, stacked on mobile

| Column | Content |
|--------|---------|
| Brand | Logo + short bio: "Chaos coordinator. Plushie enthusiast. Insomniac." |
| Quick Links | Stories, Gallery, Confessions, Admin |
| Socials | Instagram, Discord icons + handles |

**Birthday Badge:**
```
Born Jan 9, 2008 ✨
```
Styled as sticker badge (Lemon Accent background)

---

### 3. Floating Action Button (FAB)

**Position:** Bottom-right, 24px from edges  
**Size:** 56px diameter  
**Style:** Primary Pink, rounded full, shadow elevated

**Behavior:**
- Expands on click to reveal action menu
- Actions: Add Story, Add Confession, Add Plushie, Add Song
- Shows relevant action based on current page
- Hides when user is scrolling down, appears when scrolling up

---

## Page-Specific Components

### 4. Hero Section

**Layout:** Full-bleed, min-height 80vh

**Variants:**
| Variant | Background |
|---------|------------|
| Video | Muted autoplay WebM/MP4, 30s max |
| Carousel | 3 images, auto-advance every 5s |

**Content Overlay:**
```
Badge: "Aki" (sticker style)
Headline: "Aki • 18 • Sri Lanka → England"
Subline: "plushies, 03:14 confessions & travel scars — posted honestly"
CTA Row: [Latest Stories] [Gallery] [Confessions] [Add Plushie]
```

**Stats Chips (horizontal scroll on mobile):**
- Age: 18
- Location: England 🇬🇧
- Height: (optional)
- Badge: "Insomniac"

**Effects:**
- Parallax on background (0.3x speed)
- Film grain overlay
- Staggered text reveal on load

---

### 5. StoryCard

**Size:** Min 280px width, aspect ratio 4:3 cover image

**Elements:**
| Part | Spec |
|------|------|
| Image | Cover with LQIP blur load |
| Tags | Pill badges, max 3 visible |
| Title | H3, Sora 600, 2 lines max with ellipsis |
| Excerpt | Body text, 3 lines max |
| Time Chip | "2 days ago" in Roboto Mono |

**Hover:**
- Image scales 1.03
- Shadow expands
- CTA underline animates in

---

### 6. MasonryGallery

**Layout:** CSS Grid with masonry effect (grid-template-rows: masonry when supported)

**Fallback:** Column-based layout with JS positioning

**Column Counts:**
- Mobile: 2 columns
- Tablet: 3 columns  
- Desktop: 4 columns

**Image Behavior:**
- Click opens Lightbox
- Lazy load below fold
- LQIP blur placeholder

---

### 7. Lightbox

**Features:**
- Swipe navigation (touch)
- Keyboard: Arrow keys, Escape to close
- Counter: "3 of 24"
- Info panel: caption, date, location
- Share button
- Close button top-right

**Animations:**
- Fade in with scale from 0.9
- Image crossfade on navigation

---

### 8. ConfessionModal

**Trigger:** "Confess" button or FAB action

**Form Fields:**
| Field | Spec |
|-------|------|
| Text | Textarea, max 500 chars, char counter shows `${count}/500` |
| Image | Optional upload, drag & drop zone, 5MB max |
| Privacy | Toggle: "Post anonymously" (default on) |
| Consent | Checkbox: "I agree to community guidelines" |

**Submit Button:** "Whisper it to the void"

**Hint Text:** "Max 500 characters — say it true, say it weird."

**Validation:**
- Required: text (min 10 chars), consent checkbox
- Client-side profanity filter warning (soft)
- Server validates before submission

---

### 9. ConfessionCard

**Layout:** Card with optional image

**Elements:**
| Part | Spec |
|------|------|
| Avatar | Anonymous icon or user indicator |
| Body | Text content, max 500 chars |
| Image | Optional, 16:9 aspect if present |
| Timestamp | "3 hours ago" |
| Reactions | Emoji chips: 😂 lol, 🤝 same, 😬 yikes |
| Report | Flag icon, opens confirmation modal |

**States:**
- Default, hovered (slight lift)
- Flagged (admin sees red border)

---

### 10. PlushieCard

**Size:** Square or 3:4 aspect ratio

**Elements:**
| Part | Spec |
|------|------|
| Image | Primary photo of plushie |
| Name | H3, centered below |
| Tagline | One-line description |
| Tags | Max 2 visible |

**Hover:**
- Slight rotation (1-2deg)
- Shadow expands
- Name underline appears

---

### 11. PlushieDetail

**Layout:** Two columns on desktop

**Left Column (60%):**
- Large hero image
- Image carousel thumbnails below

**Right Column (40%):**
- Name (H1)
- Acquisition story (body text, supports markdown)
- Tags
- Date added
- Mood Timeline

**Mood Timeline:**
- Vertical timeline of dated entries
- Each entry: date, emoji, short note
- Owner can add new entries from admin

---

### 12. AudioPlayer

**Position:** Fixed bottom bar, full width  
**Height:** 64px collapsed, 120px expanded on mobile

**Controls:**
| Control | Icon | Keyboard |
|---------|------|----------|
| Play/Pause | ▶️ / ⏸️ | Space |
| Previous | ⏮️ | - |
| Next | ⏭️ | - |
| Seek Bar | Slider | ←/→ (10s) |
| Current Time | 0:00 / 3:45 | - |
| Volume | 🔊 slider | - |
| Mute | 🔇 | M |
| Shuffle | 🔀 | S |
| Repeat | 🔁 | R |

**Visual:**
- Now playing: track title + artist
- Album art thumbnail (48px square)
- Progress bar with pink fill
- Glassmorphism background

**Persistence:**
- Current track, position, volume saved to `localStorage`
- Resume on page return

**Mobile:**
- Gesture to start playback (browser requirement)
- Large touch targets (56px minimum)

**Accessibility:**
- ARIA labels for all controls
- Focus visible states
- Screen reader announces track changes

---

### 13. PlaylistPanel

**Layout:** Slide-up panel or sidebar

**Features:**
- Track list with drag-to-reorder (admin only)
- Currently playing highlighted
- Track: cover thumb, title, artist, duration
- Search/filter (optional future feature)

---

### 14. SocialsBar

**Variants:**
1. **Header:** Icon-only, horizontal
2. **Footer:** Icon + handle, horizontal
3. **Profile:** Vertical list with descriptions

**Platforms:**
| Platform | Icon | Display |
|----------|------|---------|
| Instagram | 📷 | @handle |
| Discord | 💬 | aki.in.a.nutshell |
| X/Twitter | 🐦 | @handle (optional) |
| Spotify | 🎵 | (optional) |

**Discord CTA:** "Join Aki's late-night lounge →"

---

### 15. AdminDashboard

**Layout:** Sidebar + main content area

**Sidebar Sections:**
- Overview
- Confessions (with pending count badge)
- Plushies
- Stories
- Songs
- Social Links
- Settings

**Confessions Queue:**
| Column | Data |
|--------|------|
| Preview | First 100 chars |
| Status | Pending / Approved / Rejected |
| Flags | Auto-flag reason |
| Actions | Approve, Reject, Add Note |

**Plushie Manager:**
- Grid of plushie cards
- Add/Edit modal with image upload
- Drag to reorder

**Song Manager:**
- List with drag reorder
- Upload new: file picker, metadata form
- Delete with confirmation

---

## Modal Components

### 16. HelplineOverlay

**Trigger:** Self-harm keywords detected in confession

**Content:**
```
💜 Hey, it sounds like you might be going through something tough.

If you're struggling, please reach out to someone who can help:

🇬🇧 UK
- Samaritans: 116 123 (24/7, free)
- CALM: 0800 58 58 58 (5pm–midnight)
- Shout: Text "SHOUT" to 85258

Your confession has been saved and will be reviewed by Aki.
It won't be posted publicly without review.

[I understand] [Talk to someone now →]
```

**Behavior:**
- Cannot be dismissed without acknowledgment
- Confession saved to pending queue
- Not published automatically

---

### 17. Upload Modal

**Consent Checkbox:**
"I confirm I own the rights to this audio/image or have explicit permission."

**Drag & Drop Zone:**
- Dashed border
- Icon + "Drop files here or click to browse"
- File type hints based on context

---

### 18. Cookie Notice

**Position:** Bottom bar, fixed

**Content:**
```
🍪 We use minimal cookies to remember your preferences.
[Accept] [Customize]
```

**Customize Options:**
- Necessary (always on)
- Analytics (opt-in, off by default)

---

## State Management

### Theme State
```
Key: aki-theme
Values: 'dark' | 'light' | 'system'
Default: 'dark'
```

### Audio State
```
Key: aki-audio-state
Values: { trackId, position, volume, isMuted, shuffle, repeat }
```

### Cookie Consent
```
Key: aki-cookies
Values: { necessary: true, analytics: boolean }
```
