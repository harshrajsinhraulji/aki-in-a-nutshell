# Prioritized QA Checklist for Launch

## Critical Path (Must Pass)

- [ ] **Hero Intro & 3D Load**
  - Verify page load shows typing animation ("Hello. I'm Aki.").
  - Verify name reveal animation.
  - Verify 3D model (`aki_plush.glb`) loads and displays behind text.
  - **Fallback**: Verify on mobile throttling (Network tab -> Fast 3G) that fallback image displays if 3D takes > 3s or fails.
  - **Performance**: Check LCP is <= 2.5s on mobile emulation.

- [ ] **Private Room (/aki) & Uploads**
  - Verify navigating to `/aki` shows password gate.
  - Enter `akiupload` (or configured password). Verify unlock animation (door swing/plush bounce).
  - Upload an image + mood note.
  - Verify image appears in Vercel Blob dashboard.
  - Verify metadata appears in Firestore `akiUploads` collection.
  - Verify image appears in the private "Wall" grid.

- [ ] **Admin Authentication & Moderation**
  - Go to `/admin`. Login with Firebase Auth credentials.
  - Go to **Confessions** tab.
  - Verify "Pending" confessions are visible.
  - Click "Approve" on a pending confession.
  - Go to `/confessions` (public) and verify the approved confession appears.
  - Verify "Reject" removes it/updates status.

- [ ] **Audio Player Functionality**
  - Go to `/music`. Click play on a track.
  - Navigate to `/about` or `/stories`. Verify music **continues playing** without interruption (Context persistence).
  - Verify keyboard shortcuts:
    - `Space`: Play/Pause
    - `M`: Mute
    - `ArrowRight`: Skip 10s
  - Refresh page. Verify player remembers last track and position (localStorage).

- [ ] **File Pipeline (Vercel Blob)**
  - Go to `/admin`.
  - Upload a new MP3 song.
  - Upload a new Plushie cover image.
  - Verify valid Vercel Blob URLs are generated.
  - Verify Firestore documents (`songs`, `plushies`) contain the correct `coverUrl` / `fileUrl`.
