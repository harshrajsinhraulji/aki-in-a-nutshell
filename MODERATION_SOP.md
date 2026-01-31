# Moderation SOP: Confessions

## Overview
All anonymous confessions submitted via `/confessions` are initially marked as **Pending** (unless auto-flagged as Rejected by harsh keywords). Admin must review them before they appear publicly.

## Procedure

1.  **Review Pending Queue**
    *   Log in to `/admin`.
    *   Navigate to **Confessions > Pending**.
    *   You will see a list of new submissions with text, timestamp, and any auto-flags.

2.  **Decision Criteria**
    *   **APPROVE** (`isPublic: true`, `status: 'approved'`) if:
        *   It is funny, cute, relatable, slightly "messy", or harmless venting.
        *   Profanity is allowed (Aki's brand is "candid/late-night").
    *   **REJECT** (`status: 'rejected'`) if:
        *   It contains hate speech, specific targeted bullying, or doxxing.
        *   It satisfies the "Safety" criteria below.

3.  **Safety & Self-Harm**
    *   **IMMEDIATE ACTION**: If a confession mentions self-harm, suicide, or severe distress:
        *   **REJECT** immediately.
        *   Note: The user should have seen a helpline overlay upon submission if the system detected it.
        *   Do *not* publish.

4.  **Publishing**
    *   Click **Approve**.
    *   The verified item will instantly appear on the public `/confessions` feed.

## Shortcuts
*   Use the **Flag** button to mark items that need a second opinion (doesn't publish).
*   Bulk actions are available for selecting multiple spam entries.
