# UX Copy & Microcopy Document

> All text content, labels, and messaging for Aki's World.

---

## Brand Voice Guidelines

**Tone:** Raw, candid, late-night, witty, intimate  
**Rules:**
- Short paragraphs, punchy delivery
- Forgivingly colloquial but never abusive
- First-person when Aki is speaking
- Slightly chaotic, authentically imperfect

---

## Global Elements

### Navigation
| Label | Notes |
|-------|-------|
| Home | — |
| Stories | — |
| Gallery | — |
| Confessions | — |
| Plushies | — |
| Songs | — |

### Footer Bio
```
Chaos coordinator. Plushie enthusiast. Insomniac.
Born Jan 9, 2008 ✨
```

### Social CTAs
- **Discord:** "Join Aki's late-night lounge →"
- **Instagram:** "Stalk me on Instagram"

---

## Homepage

### Hero
```
Badge: Aki
Headline: Aki • 18 • Sri Lanka → England
Subline: plushies, 03:14 confessions & travel scars — posted honestly
```

### Hero CTAs
| Button | Style |
|--------|-------|
| Latest Stories | Primary |
| Gallery | Secondary |
| Confessions | Secondary |
| Add Plushie | Ghost |

### Stats Chips
- `18` — Age
- `England 🇬🇧` — Location
- `Insomniac` — Badge

### Plushie of the Week Card
```
Title: Plushie of the Week
Name: {plushie.name}
CTA: Meet {plushie.name} →
```

### Sections

**Latest Stories**
```
Heading: Fresh from the chaos
Subheading: Travel tales, late nights, and questionable decisions
CTA: View all stories →
```

**Confessions Preview**
```
Heading: Whispered at 3am
Subheading: Anonymous thoughts from the void
CTA: Read more confessions →
```

---

## Stories

### Page Header
```
Title: Stories
Subtitle: Travel scars, midnight thoughts, and the occasional win
```

### Story Card
- **Time chip format:** "2 days ago" / "Jan 15, 2024"
- **Excerpt:** Max 150 characters with ellipsis

### Story Detail

**Share prompt:**
```
Found this relatable? Share it with someone who gets it.
```

**Related Stories**
```
Heading: More chaos where that came from
```

---

## Gallery

### Page Header
```
Title: Gallery
Subtitle: Proof I sometimes leave the house
```

### Album Labels
- By location: "Sri Lanka", "England", "Transit"
- By vibe: "Golden Hour", "Night Owl", "Cozy"

### Lightbox
- **Counter:** "3 of 24"
- **Close hint:** "Click outside or press ESC"

---

## Confessions

### Page Header
```
Title: Confessions
Subtitle: Anonymous whispers from 3am brains
```

### Submit Button
```
Primary: Confess something
Alt: Whisper to the void
```

### Modal

**Header:**
```
Spill it. Anonymously.
```

**Text Area Placeholder:**
```
What's sitting on your chest at 3am?
```

**Character Counter:**
```
{count}/500
```

**Hint Text:**
```
Max 500 characters — say it true, say it weird.
```

**Privacy Toggle:**
```
Label: Post anonymously
Hint: Your secret's safe
```

**Consent Checkbox:**
```
I understand this will be reviewed before posting and I accept the community guidelines.
```

**Upload Hint:**
```
Add an image? (optional, max 5MB)
```

**Submit Button:**
```
Whisper it to the void
```

### Success Message
```
Title: Sent to the void ✨
Body: Your confession is being reviewed. If approved, it'll appear in the feed.
CTA: Close / Submit another
```

### Reactions
| Emoji | Label | Alt text |
|-------|-------|----------|
| 😂 | lol | React with lol |
| 🤝 | same | React with same |
| 😬 | yikes | React with yikes |

### Report Modal
```
Title: Report this confession
Options:
- [ ] Inappropriate content
- [ ] Spam or advertising  
- [ ] Harmful or dangerous
CTA: Submit report
Cancel: Nevermind
```

### Report Confirmation
```
Thanks for looking out. We'll review this soon.
```

---

## Helpline Overlay (Self-Harm Detection)

**Header:**
```
💜 Hey, it sounds like you might be going through something tough.
```

**Body:**
```
If you're struggling, please reach out to someone who can help.
```

**UK Helplines:**
```
🇬🇧 United Kingdom

Samaritans
📞 116 123 (24/7, free)

CALM (Campaign Against Living Miserably)
📞 0800 58 58 58 (5pm–midnight)

Shout Crisis Text Line
📱 Text "SHOUT" to 85258
```

**Footer:**
```
Your confession has been saved and will be reviewed by Aki.
It won't be posted publicly without review.
```

**CTAs:**
| Button | Action |
|--------|--------|
| I understand | Dismiss overlay |
| Talk to someone now → | Links to Samaritans |

---

## Plushies

### Page Header
```
Title: The Plushie Squad
Subtitle: My emotional support crew, ranked by cuddle quality
```

### Add Plushie CTA
```
Add a plushie — tell its trauma
```

### Card Tagline Format
One-line description, e.g., "Found at a midnight market"

### Detail Page

**Acquisition Story Header:**
```
The Story
```

**Mood Timeline Header:**
```
Mood Log — {plushie.name}'s journey
```

**Add Mood Entry (Admin):**
```
How's {name} doing today?
Placeholder: Add a quick update...
Emoji picker label: Pick a mood
```

---

## Songs / Audio Player

### Page Header
```
Title: Aki's Playlist
Subtitle: The soundtrack to late-night overthinking
```

### Now Playing
```
Now Playing: {title}
{artist}
```

### Empty State
```
No songs yet — Aki's still uploading their chaotic playlist.
```

### Player Controls (ARIA Labels)
| Control | Label |
|---------|-------|
| Play | Play |
| Pause | Pause |
| Previous | Previous track |
| Next | Next track |
| Mute | Mute audio |
| Unmute | Unmute audio |
| Shuffle | Toggle shuffle |
| Repeat | Toggle repeat |
| Seek | Audio progress |

### Keyboard Shortcuts Hint
```
⌨️ Space: play/pause • ←/→: seek 10s • M: mute • S: shuffle • R: repeat
```

---

## Admin

### Login Page
```
Title: Owner Access
Subtitle: Ask Aki for the secret password.
Input placeholder: Enter password
Submit: Enter
Error: Wrong password. Try again?
```

### Dashboard Welcome
```
Hey Aki 👋
Here's what's waiting for you.
```

### Stats Cards
- Pending Confessions: `{count} waiting`
- Total Plushies: `{count} friends`
- Published Stories: `{count} tales`
- Playlist Tracks: `{count} songs`

### Confession Queue

**Status badges:**
| Status | Badge |
|--------|-------|
| pending | Pending |
| approved | Approved |
| rejected | Rejected |
| flagged | ⚠️ Flagged |

**Actions:**
| Action | Label |
|--------|-------|
| Approve | Approve ✓ |
| Reject | Reject ✗ |
| Add Note | Add note |

**Empty State:**
```
All caught up! No confessions waiting.
```

### Plushie Manager

**Add button:** "Add new plushie"

**Form labels:**
| Field | Label |
|-------|-------|
| Name | Plushie name |
| Image | Upload image |
| Description | Their story |
| Tags | Tags (comma separated) |
| Mood | Initial mood entry |

### Song Manager

**Add button:** "Upload song"

**Form labels:**
| Field | Label |
|-------|-------|
| Title | Track title |
| Artist | Artist (optional) |
| Audio | Upload audio file |
| Cover | Album art (optional) |

---

## Upload Components

### TOS Checkbox
```
I confirm I own the rights to this audio/image or have explicit permission.
```

### Drag & Drop Zone
```
Drop files here or click to browse
Hint: {accepted formats}, max {size}MB
```

### Upload Progress
```
Uploading... {percent}%
```

### Upload Error
```
Upload failed. Please try again.
```

---

## Error States

### 404 Page
```
Title: Lost in the void
Body: This page doesn't exist — or maybe it ran away.
CTA: Take me home →
```

### 500 Error
```
Title: Something broke
Body: It's not you, it's definitely me. Try refreshing?
CTA: Refresh page
```

### Empty States

**No Stories:**
```
No stories yet. The adventure continues...
```

**No Confessions:**
```
The void is empty. Be the first to whisper.
```

**No Plushies:**
```
The squad is empty. Add your first plushie friend!
```

---

## Cookie Notice

### Banner
```
🍪 We use minimal cookies to remember your preferences.
[Accept] [Customize]
```

### Customize Modal
```
Title: Cookie Preferences

Necessary Cookies (always on)
These help the site function properly.

Analytics (optional)
Help us understand how the site is used.
[ ] Enable analytics

[Save preferences]
```

---

## SEO Meta Templates

### Homepage
```
Title: Aki — plushies, travel & midnight confessions
Description: Aki (born Jan 9, 2008) — a Sri Lankan in England. Plushies, travel stories, late-night thoughts and a tiny chaotic life.
```

### Stories Index
```
Title: Stories — Aki's World
Description: Travel tales, midnight thoughts, and the occasional win from Aki's chaotic life.
```

### Story Detail
```
Title: {Story Title} — Aki's World
Description: {story.excerpt}
```

### Confessions
```
Title: Confessions — Aki's World
Description: Anonymous whispers from 3am brains. Read and react to the chaos.
```

### Plushies
```
Title: The Plushie Squad — Aki's World
Description: Meet Aki's emotional support crew, ranked by cuddle quality.
```

### Gallery
```
Title: Gallery — Aki's World
Description: Proof Aki sometimes leaves the house. Travel photos and vibes.
```
