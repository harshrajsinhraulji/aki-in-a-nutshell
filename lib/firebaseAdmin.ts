import { initializeApp, getApps, cert, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // Handle newlines in private key
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

function getAdminApp() {
    if (getApps().length === 0) {
        return initializeApp({
            credential: cert(serviceAccount),
        });
    }
    return getApp();
}

const adminApp = getAdminApp();
const adminDb = getFirestore(adminApp);
const adminAuth = getAuth(adminApp);

export { adminDb, adminAuth };
