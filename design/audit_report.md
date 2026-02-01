# UI Audit Report: Aki's World (Current State)

**Date:** 2026-01-31
**Auditor:** Antigravity (UI/UX Architect)
**Status:** 🔴 CRITICAL - REDESIGN REQUIRED

The current UI is functional but generic. It fails to capture the "insomniac, plushie-obsessed, messy-cute" personality of Aki. It feels like a template, not a diary.

## Critical Issues List

1.  **Generic "Startup" Aesthetic**
    *   **Severity:** High
    *   **Issue:** The glassmorphism and gradients look like a generic SaaS or Web3 landing page, not a personal sanctuary.
    *   **Fix:** Pivot to "messy-cute" with softer, organic shapes, "sticker" placements, and specific "Pale Peach" (`#FFF2F7`) backgrounds instead of generic gradients.

2.  **Incorrect Border Radius**
    *   **Severity:** Medium
    *   **Issue:** Current components use mixed radii (8px/12px).
    *   **Fix:** Enforce a strict `1.25rem` (20px) radius globally to create a softer, "plushie-like" feel.

3.  **Typography Mismatch**
    *   **Severity:** Medium
    *   **Issue:** Headings lack character.
    *   **Fix:** Switch strict font stack to **Sora** (or Lexend) for headings to give a geometric, friendly vibe, and **Roboto Mono** for that "code aesthetic/diary timestamp" feel.

4.  **Color Palette Deviations**
    *   **Severity:** High
    *   **Issue:** The pinks are close but not exact.
    *   **Fix:** Hard-code the exact tokens: Primary Pink `#FF6CA4`, Bubblegum `#FFD6EC`, Pale Peach `#FFF2F7`. Eliminate undefined grays.

5.  **Motion is Linear/Boring**
    *   **Severity:** Medium
    *   **Issue:** Standard CSS transitions lack weight.
    *   **Fix:** Implement the specific custom bezier `cubic-bezier(.22,.9,.29,1)` for a "bouncy" but snappy feel that mimics physical objects.

6.  **Accessibility: Contrast Failures**
    *   **Severity:** High
    *   **Issue:** White text on light pink gradients often fails WCAG AA.
    *   **Fix:** Use `#121212` (Dark Neutral) for text on light backgrounds. Use `#FF6CA4` only for large text or robust buttons with dark text/white contrast checks.

7.  **Performance: Layout Shifts (CLS)**
    *   **Severity:** Medium
    *   **Issue:** Images and 3D elements load without reserved space, causing jank.
    *   **Fix:** Enforce strict aspect ratios and skeleton/blur-up states for all media.

8.  **Empty States are "Corporate"**
    *   **Severity:** Low (but High for Brand)
    *   **Issue:** "Check back soon" is boring.
    *   **Fix:** Inject personality. "Stories are brewing at 3am", "Plushies hide when you look".

9.  **Navigation is Floating/Disconnected**
    *   **Severity:** Medium
    *   **Issue:** The header feels like a separate layer rather than integrated.
    *   **Fix:** Implement the "sticky soft bubble" header concept to ground the navigation.

10. **Lack of "Owner" Presence**
    *   **Severity:** High
    *   **Issue:** The site feels static.
    *   **Fix:** The `/aki` room needs to feel like a dashboard, not just a page. Add the "password gate" animation.
