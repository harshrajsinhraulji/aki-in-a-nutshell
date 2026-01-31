# 🔥 Firebase Setup Guide (Step-by-Step)

Follow these exact steps to set up the backend for Aki's World.

## Phase 1: Create Project

1. Go to [console.firebase.google.com](https://console.firebase.google.com).
2. Click **"Create a project"**.
3. Name it **`aki-in-a-nutshell`** (or whatever you like).
4. Disable "Google Analytics" (not needed for this).
5. Click **"Create Project"** and wait.

## Phase 2: Enable Services

### 1. Authentication
1. Click **Build** > **Authentication** in the left sidebar.
2. Click **"Get Started"**.
3. Select **"Email/Password"** from the providers list.
4. Toggle **Enable** (leave "Email link" off).
5. Click **Save**.
6. **Important:** Click the "Users" tab and "Add User".
    - Email: `aki@example.com` (or your real email)
    - Password: `password123` (CHANGE THIS later!)
    - *This will be your Admin login.*

### 2. Firestore Database
1. Click **Build** > **Firestore Database**.
2. Click **"Create Database"**.
3. Choose a location close to you (e.g., `eur3` for UK/Europe or `us-central1`).
4. Select **"Start in production mode"**.
5. Click **Create**.
6. (We will deploy security rules later, so Production mode is safe).

### 3. Storage
1. Click **Build** > **Storage**.
2. Click **"Get Started"**.
3. Start in **"production mode"**.
4. Click **Done**.

## Phase 3: Connect to Code

### 1. Get Web Config
1. Click the **Gear Icon ⚙️** (Project Settings) at the top left.
2. Scroll down to "Your apps".
3. Click the **Web icon (`</>`)**.
4. Nickname: `aki-web`.
5. Uncheck "Firebase Hosting" (we'll do that via CLI later).
6. Click **Register app**.
7. You will see a `const firebaseConfig = { ... }` block. **Keep this tab open.**

### 2. Update Environment Variables
1. Go to your code editor.
2. Rename `.env.example` to `.env.local` (or create it).
3. Paste the values from the Firebase console into the file matching these names:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

## Phase 4: Admin Access for Seeding (Optional but Recommended)

To run the automated data seeder script, you need a Service Account.

1. In Firebase Console > **Project Settings** > **Service accounts** tab.
2. Click **"Generate new private key"**.
3. Save the file as **`service-account.json`** in the root of this project folder.
    - *⚠️ NOTE: Do NOT commit this file to GitHub. It is already in .gitignore.*

## Phase 5: Seed Data & Deploy Rules

1. Open your terminal in VS Code.
2. Run the seed script:
   ```bash
   npx tsx scripts/seed-db.ts
   ```
   *(This uploads sample stories, plushies, and confessions).*

3. Deploy Security Rules:
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init firestore
   # Select "Use existing file" -> deploy/firestore.rules
   firebase init storage
   # Select "Use existing file" -> deploy/storage.rules
   firebase deploy --only firestore:rules,storage
   ```

## You are done! 🚀
Run `npm run dev` and go to `http://localhost:3000`.
