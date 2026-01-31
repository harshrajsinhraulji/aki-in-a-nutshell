# QA Checklist for Launch

> Pre-launch verification checklist for Aki's World.

---

## Critical Path Tests

These tests MUST pass before launch.

### 1. Audio Player — iOS Playback

**Test:** Verify audio playback works on iOS Safari.

**Steps:**
1. Open site on iOS device (iPhone/iPad Safari)
2. Navigate to Songs page or any page with audio player
3. Tap play button on any track
4. Verify: Audio starts playing after user gesture
5. Verify: Seek bar updates during playback
6. Verify: Play/pause toggle works correctly
7. Test: Lock screen controls (if applicable)

**Expected:** Audio plays after user tap. No autoplay (browser restriction).

**Pass/Fail:** [ ]

---

### 2. Plushie CRUD — Full Cycle

**Test:** Verify admin can add, edit, and view a plushie.

**Steps:**
1. Log in to admin dashboard with password
2. Navigate to Plushies section
3. Click "Add new plushie"
4. Upload an image (test with different sizes)
5. Fill in: name, description, tags, mood entry
6. Save the plushie
7. Verify: Plushie appears in admin list
8. Navigate to public plushies page
9. Verify: New plushie appears in public grid
10. Click plushie to view detail page
11. Verify: All data displays correctly
12. Return to admin, edit the plushie
13. Change name and add mood entry
14. Save and verify changes on public site

**Expected:** Full CRUD cycle works. Data persists.

**Pass/Fail:** [ ]

---

### 3. Confession Self-Harm Flow

**Test:** Verify helpline overlay appears and confession is held.

**Steps:**
1. Navigate to Confessions page (public, logged out)
2. Click "Confess something"
3. Enter test text containing a self-harm keyword (e.g., "Sometimes I feel like disappearing")
4. Submit the confession
5. Verify: Helpline overlay appears with UK numbers
6. Verify: Cannot dismiss without clicking "I understand"
7. Click "I understand"
8. Verify: Confirmation message shows (confession saved for review)
9. Log in to admin dashboard
10. Navigate to Confessions moderation queue
11. Verify: Test confession appears with "self_harm" flag
12. Verify: Status is "pending"
13. Test approve action
14. Verify: Confession appears in public feed

**Expected:** Flagged content shows helpline overlay, goes to pending, requires admin approval.

**Pass/Fail:** [ ]

---

### 4. Discord Link Verification

**Test:** Verify Discord link works correctly.

**Steps:**
1. Navigate to homepage
2. Find Discord link/CTA ("Join Aki's late-night lounge")
3. Click the link
4. Verify: Opens Discord invite page
5. Verify: Invite displays correct server (if configured)
6. Repeat from footer socials section
7. Verify: Same behavior

**Expected:** Discord links open correct invite/profile page.

**Pass/Fail:** [ ]

---

## Functional Tests

### 5. Theme Toggle

**Steps:**
1. Open site (should default to dark mode)
2. Click theme toggle (sun/moon icon)
3. Verify: Theme changes to light mode
4. Refresh page
5. Verify: Theme preference persists (light mode)
6. Toggle back to dark
7. Verify: Preference persists

**Pass/Fail:** [ ]

---

### 6. Story Page Navigation

**Steps:**
1. Navigate to Stories page
2. Click on a story card
3. Verify: Story detail page loads
4. Verify: All content renders (title, body, images)
5. Scroll to bottom
6. Verify: Related stories appear
7. Click a related story
8. Verify: Navigation works

**Pass/Fail:** [ ]

---

### 7. Gallery Lightbox

**Steps:**
1. Navigate to Gallery page
2. Click on an image
3. Verify: Lightbox opens
4. Test arrow key navigation
5. Test swipe navigation (mobile)
6. Press Escape
7. Verify: Lightbox closes
8. Click outside image
9. Verify: Lightbox closes

**Pass/Fail:** [ ]

---

### 8. Confession Reactions

**Steps:**
1. Navigate to Confessions page
2. Find an approved confession
3. Click "lol" reaction
4. Verify: Count increments
5. Refresh page
6. Verify: Reaction count persisted
7. Test "same" and "yikes" reactions

**Pass/Fail:** [ ]

---

### 9. Admin Authentication

**Steps:**
1. Navigate to /admin
2. Verify: Login form appears
3. Enter wrong password
4. Verify: Error message displayed
5. Enter correct password (from ENV)
6. Verify: Dashboard loads
7. Navigate away and back to /admin
8. Verify: Session persists (no re-login)
9. Wait 25 hours (or manually expire cookie)
10. Verify: Session expired, must re-login

**Pass/Fail:** [ ]

---

### 10. Image Upload

**Steps:**
1. Log in to admin
2. Navigate to add plushie
3. Test drag-and-drop image upload
4. Test click-to-browse upload
5. Upload oversized file (>10MB)
6. Verify: Error message shown
7. Upload valid image
8. Verify: Preview displays
9. Complete form and save
10. Verify: Image accessible on public site

**Pass/Fail:** [ ]

---

### 11. Audio Upload (Admin)

**Steps:**
1. Log in to admin
2. Navigate to Songs section
3. Click "Upload song"
4. Upload MP3 file
5. Fill metadata (title, artist)
6. Save
7. Navigate to public songs page
8. Verify: New song appears in playlist
9. Play the song
10. Verify: Audio plays correctly

**Pass/Fail:** [ ]

---

## Accessibility Tests

### 12. Keyboard Navigation

**Steps:**
1. Load homepage
2. Press Tab repeatedly
3. Verify: Focus moves through interactive elements
4. Verify: Focus indicator visible (pink outline)
5. Navigate to nav menu
6. Verify: Can activate links with Enter
7. Open a modal
8. Verify: Focus trapped in modal
9. Press Escape
10. Verify: Modal closes, focus returns

**Pass/Fail:** [ ]

---

### 13. Screen Reader (Basic)

**Steps:**
1. Enable screen reader (VoiceOver/NVDA)
2. Navigate to homepage
3. Verify: Heading structure announced correctly
4. Navigate to audio player
5. Verify: Control buttons have labels
6. Verify: Current track announced
7. Navigate to confessions
8. Verify: Cards readable

**Pass/Fail:** [ ]

---

### 14. Reduced Motion

**Steps:**
1. Enable "Reduce motion" in system settings
2. Load site
3. Verify: No parallax effect on hero
4. Verify: No staggered reveal animations
5. Verify: Basic transitions still work (instant)

**Pass/Fail:** [ ]

---

## Performance Tests

### 15. Image Loading

**Steps:**
1. Open Network tab in DevTools
2. Load Gallery page
3. Verify: Images lazy load (below-fold images load on scroll)
4. Verify: WebP format served (check response headers)
5. Check First Contentful Paint < 2s

**Pass/Fail:** [ ]

---

### 16. Lighthouse Score

**Steps:**
1. Run Lighthouse audit on homepage
2. Check Performance score > 80
3. Check Accessibility score > 90
4. Check Best Practices score > 80
5. Check SEO score > 90

**Pass/Fail:** [ ]

---

## Mobile Tests

### 17. Mobile Navigation

**Steps:**
1. Open site on mobile (or emulate 375px width)
2. Verify: Hamburger menu appears
3. Tap hamburger
4. Verify: Menu slides in from right
5. Tap a link
6. Verify: Navigation works, menu closes
7. Tap outside menu
8. Verify: Menu closes

**Pass/Fail:** [ ]

---

### 18. Touch Interactions

**Steps:**
1. Open on mobile device
2. Test swiping gallery images
3. Test scrolling confession feed
4. Test play/pause on audio player
5. Verify: All touch targets are at least 44px

**Pass/Fail:** [ ]

---

## SEO & Meta Tests

### 19. Meta Tags

**Steps:**
1. View page source on homepage
2. Verify: Title tag present and correct
3. Verify: Meta description present
4. Verify: OG tags present (og:title, og:description, og:image)
5. Check story page for article-specific meta

**Pass/Fail:** [ ]

---

### 20. Sitemap & Robots

**Steps:**
1. Navigate to /sitemap.xml
2. Verify: XML sitemap exists and is valid
3. Verify: All public pages listed
4. Navigate to /robots.txt
5. Verify: Allows search engines
6. Verify: Blocks /admin if desired

**Pass/Fail:** [ ]

---

## Security Tests

### 21. Admin Route Protection

**Steps:**
1. Log out of admin
2. Try to navigate directly to /api/admin/plushies (POST)
3. Verify: 401 Unauthorized returned
4. Try to access /admin/confessions directly
5. Verify: Redirected to login

**Pass/Fail:** [ ]

---

### 22. Cookie Settings

**Steps:**
1. Log in to admin
2. Open DevTools > Application > Cookies
3. Find admin session cookie
4. Verify: HttpOnly flag set
5. Verify: Secure flag set (production)
6. Verify: SameSite=Strict

**Pass/Fail:** [ ]

---

## Pre-Launch Final Checks

| Check | Status |
|-------|--------|
| All seed data removed/replaced with real content | [ ] |
| Admin password is strong and secure | [ ] |
| Environment variables configured in Vercel | [ ] |
| Supabase storage buckets publicly accessible (read) | [ ] |
| Custom domain configured (if applicable) | [ ] |
| SSL certificate active | [ ] |
| Real social links configured | [ ] |
| Placeholder images replaced | [ ] |
| Test confessions deleted | [ ] |
| Analytics consent works (if enabled) | [ ] |

---

## Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Developer | | | |
| Owner (Aki) | | | |
