# 🛠️ Manual Setup Guide

Since you are using **Vercel** + **Firebase**, there are a few one-time setup steps you need to do manually to connect everything.

## 1. Firebase Admin Setup (For Database & Auth)
We need a "Service Account" to allow your site to manage users and seed data.

1.  Go to [Firebase Console](https://console.firebase.google.com/).
2.  Open your project **`aki-in-a-nutshell`**.
3.  Click the ⚙️ **Gear Icon** > **Project settings**.
4.  Go to the **Service accounts** tab.
5.  Click **Generate new private key**.
6.  A `.json` file will download. Open it.
7.  **Do NOT** save this file in your code! You will copy specific values from it into your environment variables (see Section 3).

## 2. Vercel Blob Setup (For Files)
We use Vercel Blob to store images/audio/3D models.

1.  Go to [Vercel Dashboard](https://vercel.com/dashboard).
2.  Create a new project and import this repository (if you haven't yet).
3.  Once the project is created, click on the **Storage** tab in the Vercel Project dashboard.
4.  Click **Connect Database** (or "Create") -> Select **Blob**.
5.  Give it a name (e.g., `aki-blob`).
6.  Once created, click **"Settings"** or scroll to **"Environment Variables"**.
7.  Copy the `BLOB_READ_WRITE_TOKEN`.

## 3. Environment Variables (.env.local)
Create a file named `.env.local` in the root of your project `d:\GitHub\aki-in-a-nutshell`.
Copy the content below and replace the `...` with your actual values.

```env
# --- FIREBASE CLIENT (From Firebase Console > Project Settings > General > Your Apps) ---
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# --- FIREBASE ADMIN (From the Service Account JSON you downloaded) ---
# NOTE: For "private_key", you must include the "-----BEGIN PRIVATE KEY-----..." part.
# If copying into Vercel dashboard later, handle newlines carefully.
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY=...

# --- VERCEL BLOB (From Vercel Storage Tab) ---
BLOB_READ_WRITE_TOKEN=...

# --- SITE CONFIG ---
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 4. Install Dependencies
I will run this for you, but just in case:
```bash
npm install firebase firebase-admin @vercel/blob framer-motion three @react-three/fiber @react-three/drei
```

## 5. Deployment
When you deploy to Vercel:
1.  Push your code to GitHub.
2.  Go to Vercel > Project > Settings > **Environment Variables**.
3.  Add all the variables from your `.env.local` there.
    *   *Tip for `FIREBASE_PRIVATE_KEY` on Vercel*: Copy the entire string including `\n` or line breaks. Vercel handles it.
