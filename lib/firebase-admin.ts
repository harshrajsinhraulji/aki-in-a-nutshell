import { initializeApp, getApps, getApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Note: For pure Free Tier without secret management (like Google Secret Manager),
// we rely on environment variables. 
// Hosting functions or APIs might use the default service account if deployed on Firebase Hosting,
// but for local dev or Vercel, we need credentials.
// However, the user request specifies NO server-side password storage and implies usage of Client SDK.
// We will provide this admin helper for API routes if absolutely necessary (e.g. moderation).

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string)
    : undefined;

if (!getApps().length) {
    if (serviceAccount) {
        initializeApp({
            credential: cert(serviceAccount)
        });
    } else {
        // Fallback for when running in an environment where default creds work (like Cloud Functions)
        // or simply skip if not configured (will error on usage)
        try {
            initializeApp();
        } catch (e) {
            console.warn("Firebase Admin failed to initialize", e);
        }
    }
}

const adminDb = getFirestore();

export { adminDb };
