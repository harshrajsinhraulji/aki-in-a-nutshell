# Architecture & Technical Specification

> High-level architecture for Aki's World — free-tier infrastructure only.

---

## Infrastructure Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         VERCEL (Free Tier)                       │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                     Next.js Application                      ││
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐ ││
│  │  │  Pages   │  │   API    │  │  Static  │  │   Serverless │ ││
│  │  │ (SSR/SSG)│  │  Routes  │  │  Assets  │  │   Functions  │ ││
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────────┘ ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       SUPABASE (Free Tier)                       │
│  ┌──────────────────┐  ┌──────────────────┐  ┌─────────────────┐│
│  │    PostgreSQL    │  │     Storage      │  │  Auth (optional)││
│  │    Database      │  │  (Images/Audio)  │  │                 ││
│  │                  │  │                  │  │                 ││
│  │  - Plushies      │  │  - /plushies/    │  │  Simple password││
│  │  - Confessions   │  │  - /stories/     │  │  fallback works ││
│  │  - Stories       │  │  - /gallery/     │  │                 ││
│  │  - Songs         │  │  - /songs/       │  │                 ││
│  │  - SocialLinks   │  │  - /covers/      │  │                 ││
│  └──────────────────┘  └──────────────────┘  └─────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

| Layer | Technology | Justification |
|-------|------------|---------------|
| Frontend | Next.js 14+ (App Router) | SSR/SSG, API routes, optimized images |
| Styling | Tailwind CSS | Rapid development, design token integration |
| Database | Supabase PostgreSQL | Free 500MB, generous limits |
| Storage | Supabase Storage | Free 1GB, CDN delivery, no credit card |
| Hosting | Vercel (Hobby) | Free for personal projects, edge functions |
| Auth | Simple ENV password | No external dependencies |

### Free Tier Limits (Sufficient for Personal Site)

| Service | Free Tier |
|---------|-----------|
| Vercel | 100GB bandwidth/month, serverless functions |
| Supabase | 500MB DB, 1GB storage, 2GB bandwidth/month |

---

## Directory Structure (Conceptual)

```
/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                 # Homepage
│   │   ├── stories/
│   │   │   ├── page.tsx             # Stories listing
│   │   │   └── [slug]/page.tsx      # Story detail
│   │   ├── gallery/
│   │   │   └── page.tsx             # Photo gallery
│   │   ├── confessions/
│   │   │   └── page.tsx             # Public confessions
│   │   ├── plushies/
│   │   │   ├── page.tsx             # Plushie collection
│   │   │   └── [id]/page.tsx        # Plushie detail
│   │   └── songs/
│   │       └── page.tsx             # Playlist view
│   ├── admin/
│   │   ├── page.tsx                 # Dashboard
│   │   ├── confessions/page.tsx     # Moderation queue
│   │   ├── plushies/page.tsx        # Plushie CRUD
│   │   ├── stories/page.tsx         # Story management
│   │   └── songs/page.tsx           # Audio management
│   └── api/
│       ├── public/                  # Unauthenticated routes
│       └── admin/                   # Password-protected routes
├── components/
│   ├── ui/                          # Base components
│   ├── layout/                      # Nav, Footer, etc.
│   ├── features/                    # Feature-specific
│   └── admin/                       # Admin-only components
├── lib/
│   ├── supabase.ts                  # Client initialization
│   ├── auth.ts                      # Simple auth helpers
│   └── moderation.ts                # Keyword filtering
├── content/
│   └── seed/                        # Seed data JSON
└── public/
    ├── textures/                    # Grain overlay, etc.
    └── icons/                       # Static icons
```

---

## Data Models

### Plushie

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, auto | Unique identifier |
| name | VARCHAR(100) | NOT NULL | Plushie name |
| imageUrl | TEXT | NOT NULL | Primary image URL (storage) |
| description | TEXT | NULL | Acquisition story (markdown) |
| tags | TEXT[] | NULL | Array of tag strings |
| moodLog | JSONB | NULL | Array of { date, emoji, note } |
| dateAdded | TIMESTAMP | DEFAULT NOW() | When added |
| isPublic | BOOLEAN | DEFAULT TRUE | Visibility |
| order | INTEGER | DEFAULT 0 | Display order |
| createdAt | TIMESTAMP | DEFAULT NOW() | Created timestamp |
| updatedAt | TIMESTAMP | AUTO | Last modified |

### Confession

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, auto | Unique identifier |
| bodyText | VARCHAR(500) | NOT NULL | Confession content |
| imageUrl | TEXT | NULL | Optional attached image |
| isAnonymous | BOOLEAN | DEFAULT TRUE | Anonymous submission |
| status | ENUM | DEFAULT 'pending' | pending / approved / rejected |
| flagReason | VARCHAR(50) | NULL | profanity / self_harm / null |
| moderatorNote | TEXT | NULL | Admin notes |
| reactions | JSONB | DEFAULT {} | { lol: 0, same: 0, yikes: 0 } |
| reportsCount | INTEGER | DEFAULT 0 | Number of user reports |
| createdAt | TIMESTAMP | DEFAULT NOW() | Submitted at |
| reviewedAt | TIMESTAMP | NULL | When moderated |
| reviewedBy | VARCHAR(100) | NULL | Admin identifier |

### Story

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, auto | Unique identifier |
| title | VARCHAR(200) | NOT NULL | Story title |
| slug | VARCHAR(200) | UNIQUE, NOT NULL | URL slug |
| excerpt | VARCHAR(300) | NULL | Short preview text |
| bodyMarkdown | TEXT | NOT NULL | Full content in markdown |
| coverImageUrl | TEXT | NULL | Hero image URL |
| galleryUrls | TEXT[] | NULL | Additional images |
| tags | TEXT[] | NULL | Topic tags |
| publishedAt | TIMESTAMP | NULL | Publish date (null = draft) |
| isDraft | BOOLEAN | DEFAULT TRUE | Draft status |
| createdAt | TIMESTAMP | DEFAULT NOW() | Created timestamp |
| updatedAt | TIMESTAMP | AUTO | Last modified |

### Song

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, auto | Unique identifier |
| title | VARCHAR(200) | NOT NULL | Track title |
| artist | VARCHAR(200) | NULL | Artist name (optional) |
| fileUrl | TEXT | NOT NULL | Audio file URL (storage) |
| coverImageUrl | TEXT | NULL | Album art URL |
| durationSeconds | INTEGER | NULL | Track length |
| isPublic | BOOLEAN | DEFAULT TRUE | Visibility |
| order | INTEGER | DEFAULT 0 | Playlist order |
| createdAt | TIMESTAMP | DEFAULT NOW() | Uploaded at |

### SocialLink

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, auto | Unique identifier |
| platformName | VARCHAR(50) | NOT NULL | instagram / discord / x / spotify |
| handle | VARCHAR(100) | NOT NULL | Username or handle |
| url | TEXT | NOT NULL | Full profile URL |
| displayOrder | INTEGER | DEFAULT 0 | Sort order |

### AdminSession

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, auto | Session ID |
| token | VARCHAR(64) | UNIQUE | Session token |
| createdAt | TIMESTAMP | DEFAULT NOW() | Login time |
| expiresAt | TIMESTAMP | NOT NULL | Expiry (24h default) |
| ipAddress | VARCHAR(45) | NULL | Login IP (optional logging) |

---

## Authentication Strategy

### Simple Password Authentication

**Flow:**
1. Admin visits `/admin`
2. If no valid session cookie, show login form
3. User enters password
4. Server compares against `ADMIN_PASSWORD` env variable
5. On match: create session token, set httpOnly cookie (24h)
6. All `/api/admin/*` routes check for valid session

**Environment Variable:**
```
ADMIN_PASSWORD=<strong-random-password>
```

**Session Cookie:**
```
Name: aki-admin-session
HttpOnly: true
Secure: true (production)
SameSite: Strict
MaxAge: 86400 (24 hours)
```

---

## File Upload Strategy

### Image Uploads
1. Client requests signed upload URL from `/api/admin/upload`
2. Server generates signed URL for Supabase Storage
3. Client uploads directly to storage
4. Client sends resulting URL to API for metadata save

### Audio Uploads
- Same flow as images
- Accepted types: `audio/mpeg`, `audio/ogg`, `audio/aac`, `audio/mp4`
- Max size: 50MB per file (Supabase free tier allows this)

### Storage Buckets (Supabase)
```
/plushies     - Plushie images
/stories      - Story cover images and gallery
/gallery      - General photo gallery
/songs        - Audio files
/covers       - Album artwork
/confessions  - User-uploaded confession images
```

---

## Moderation System

### Keyword Lists

**Profanity List:** (configurable)
- Standard profanity terms
- Slurs and hate speech
- Spammy patterns

**Self-Harm Keywords:** (trigger helpline overlay)
- Explicit self-harm terms
- Suicidal ideation phrases
- Crisis language patterns

### Moderation Flow

```
User submits confession
        │
        ▼
  ┌─────────────┐
  │ Text Filter │
  └──────┬──────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
 Clean    Flagged
    │         │
    ▼         ▼
Pending   Self-harm?
Queue        │
         ┌───┴───┐
         │       │
         ▼       ▼
       Yes      No
         │       │
         ▼       ▼
    Helpline   Pending
    Overlay    Queue
         │       │
         ▼       ▼
    Pending    Admin
    (locked)   Review
```

---

## SEO & Performance

### Meta Tags Pattern

**Homepage:**
```html
<title>Aki — plushies, travel & midnight confessions</title>
<meta name="description" content="Aki (born Jan 9, 2008) — a Sri Lankan in England. Plushies, travel stories, late-night thoughts and a tiny chaotic life.">
<meta property="og:title" content="Aki — plushies, travel & midnight confessions">
<meta property="og:description" content="...">
<meta property="og:image" content="/og/home.jpg">
<meta property="og:type" content="website">
```

**Story Page:**
```html
<title>{Story Title} — Aki's World</title>
<meta name="description" content="{excerpt}">
<meta property="og:type" content="article">
<meta property="article:published_time" content="...">
```

### Structured Data

**Person Schema (Homepage):**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Aki",
  "birthDate": "2008-01-09",
  "nationality": "Sri Lankan",
  "url": "https://akis.world",
  "sameAs": [
    "https://instagram.com/...",
    "https://discord.gg/..."
  ]
}
```

**Article Schema (Stories):**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "datePublished": "...",
  "author": { "@type": "Person", "name": "Aki" },
  "image": "..."
}
```

### Image Optimization
- Use Next.js Image component
- Generate srcset: 480w, 768w, 1024w, 1440w
- Prefer WebP, fallback JPEG
- LQIP: 20px base64 blur placeholder
- Lazy load below-fold images

---

## Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side operations | Yes |
| `ADMIN_PASSWORD` | Admin login password | Yes |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL | Yes |

---

## Caching Strategy

| Resource | Strategy |
|----------|----------|
| Static pages | ISR with 1 hour revalidation |
| Story pages | ISR with 10 minute revalidation |
| API responses | Cache-Control headers (public data) |
| Images | CDN cached via Supabase Storage |
| Audio | Streamed from storage CDN |
