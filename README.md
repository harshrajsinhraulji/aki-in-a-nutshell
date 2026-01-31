# Aki's World 🌍

> "Plushies, 03:14 confessions & travel scars — posted honestly."

A cinematic, personal website for Aki, built with Next.js 14, Tailwind CSS, Vercel Blob, and Firebase Firestore.

## 🚀 Quick Start

1.  **Clone & Install**
    ```bash
    npm install
    ```

2.  **Environment Setup**
    Create `.env.local` based on `MANUAL_SETUP.md`. You need:
    *   Firebase Project (Auth + Firestore).
    *   Vercel Project (Blob Storage).

3.  **Seed Data**
    Run the seed script to populate initial stories, plushies, and songs.
    ```bash
    npx tsx scripts/seed-db.ts
    ```
    *(Requires `service-account.json` in project root)*

4.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000).

## 🛠️ Deployment (Vercel)

1.  Push to GitHub.
2.  Import project in Vercel.
3.  **Add Environment Variables** in Vercel Settings (See `MANUAL_SETUP.md`).
4.  Deploy!

## 🔐 Content Management

*   **Admin Dashboard**: `/admin` (Login with Firebase Auth).
*   **Aki Room**: `/aki` (Password: `akiupload` - configure in `lib/siteConfig.ts`).
*   **Moderation**: Approve confessions at `/admin` (Confessions Tab).

## 📁 Architecture

*   **/app**: Next.js App Router.
*   **/components**: Reusable UI (Hero3D, Navbar, AudioPlayer).
*   **/lib**: Helpers for Firebase (`db`, `auth`), Vercel Blob, and Site Config.
*   **/content**: Seed data.

## 🧰 Tech Stack

*   **Next.js 14** (App Router)
*   **Tailwind CSS** (Custom Design Tokens)
*   **Firebase** (Auth, Firestore)
*   **Vercel Blob** (File Storage)
*   **Three.js / React Three Fiber** (3D Hero)
*   **Framer Motion** (Animations)
