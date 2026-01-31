# Deployment Guide for Aki's World

## 1. Firebase Setup

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com).
2. Enable **Authentication** (Email/Password).
3. Enable **Firestore Database** (Start in production mode).
4. Enable **Storage**.
5. Copy your web app configuration keys.

## 2. Environment Variables

Create `.env.local` with your keys:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

## 3. Seed Data

1. Use the Admin Panel (locally at `/admin` layout provided) or Firebase Console to import `content/seed.json`.
2. Upload the 3D model `aki_plush.glb` to a folder named `3d` in Storage.

## 4. Security Rules

Copy the contents of `deploy/firestore.rules` and `deploy/storage.rules` to the Firebase Console Rules tabs respectively.

## 5. Deploy to Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Select existing project
# Public directory: out (if static export) or leave default if using web framework detection
firebase deploy
```
