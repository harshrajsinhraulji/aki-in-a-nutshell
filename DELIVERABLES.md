# Final Deliverables

## 1. Internal Code Generator Prompt

> **Copy-Paste Prompt:**
>
> You are an expert Web Architect and UI/UX Designer. Create a personal website for "Aki" (18, Sri Lankan/British) with a "late-night, cinematic, pink-forward" aesthetic. 
> 
> **Tech Stack:** Next.js 14 App Router, Tailwind CSS, Firebase (Auth, Firestore, Storage, Hosting), Three.js (Fiber/Drei), Framer Motion.
> **Design:** Primary Pink `#FF6CA4`, Dark `#121212`, Font: Sora/Inter. Rounded UI (2xl).
> 
> **Core Features to Build:**
> 1. **Hero Section:** Full-screen dark grainy background, 3D interactive plushie (GLTF) floating on right, large typography "Aki • 18 • Sri Lanka → England" on left. Scroll-triggered parallax.
> 2. **Stories:** Blog system with Markdown content, reading time, and cover images (Firestore: `stories`).
> 3. **Plushies:** Grid gallery of plush toys with detail modal/page and "mood log" timeline (Firestore: `plushies`).
> 4. **Confessions:** Anonymous submission form with checking (keywords). Public feed only shows approved items (Firestore: `confessions`).
> 5. **Music Player:** Persistent footer player using HTML Audio, playlist from Firestore `songs`.
> 6. **Admin Dashboard:** Authenticated route (`/admin`) to manage all content and moderate confessions.
> 
> **Implementation Steps:**
> - Initialize Next.js with Tailwind.
> - Configure `lib/firebase.ts` with client SDK.
> - Implement `Hero3D` component with `Canvas` and `useGLTF`.
> - Build `MusicPlayer` context and component.
> - Create Admin pages with `firebase/auth`.
> - Deploy Security Rules for Firestore/Storage.
> 
> **Deliver:** Full source code, `design-tokens.json`, `firestore.rules`, and `seed.json`.

---

## 2. File Structure

```text
/
├── .env.local                  # Environment variables
├── package.json                # Dependencies (Next.js, Firebase, Three, Framer)
├── next.config.mjs             # Config
├── tailwind.config.ts          # Design system config
├── app/
│   ├── layout.tsx              # Root layout + Providers (Theme, Auth, Audio)
│   ├── page.tsx                # Home (Hero + Feeds)
│   ├── stories/                # Stories routes
│   ├── plushies/               # Plushie routes
│   ├── confessions/            # Confessions routes
│   └── admin/                  # Admin protected routes
├── components/
│   ├── hero-3d.tsx             # Three.js Scene
│   ├── audio-player.tsx        # Persistent Player
│   ├── nav.tsx                 # Sticky Navigation
│   └── ui/                     # Shared UI (Cards, Buttons)
├── lib/
│   ├── firebase.ts             # Firebase Client Init
│   └── utils.ts                # Helpers
├── design/
│   ├── tokens.json             # Design Tokens
│   └── hero_desktop_mockup.png # UI Visual
├── deploy/
│   ├── README.md               # Deploy Instructions
│   ├── firestore.rules         # Security Rules
│   └── storage.rules           # Storage Rules
└── content/
    └── seed.json               # Initial Data
```

## 3. Launch QA Checklist

1. [ ] **Hero Performance:** Verify 3D Model (`aki_plush.glb`) loads under 2s on 4G; confirm fallback image shows if WebGL fails.
2. [ ] **Audio Persistence:** Navigate between "Stories" and "Home" while playing music; ensure audio does not cut out.
3. [ ] **Moderation Flow:** Submit a confession with "profanity" -> Verify it lands in Admin "Pending" tab, not Public feed.
4. [ ] **Mobile Layout:** Check `PlushieCard` grid responsiveness on 375px width (iPhone SE); ensure no horizontal scroll.
5. [ ] **Security:** Verify an unauthenticated user cannot write to `/stories` by attempting a console Console write test.
