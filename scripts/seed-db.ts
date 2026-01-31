import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import seedData from "../content/seed.json";
import fs from "fs";
import path from "path";
import * as dotenv from 'dotenv';

// Load env vars
dotenv.config({ path: '.env.local' });

async function seed() {
    console.log("🌱 Starting Seeding Process...");

    // 1. Initialize Admin SDK
    const serviceAccountPath = path.resolve(process.cwd(), "service-account.json");

    if (!fs.existsSync(serviceAccountPath)) {
        console.error("❌ 'service-account.json' not found!");
        console.error("👉 Please download it from Firebase Console > Project Settings > Service Accounts");
        console.error("   and save it to the project root.");
        process.exit(1);
    }

    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

    try {
        initializeApp({
            credential: cert(serviceAccount)
        });
        console.log("✅ Firebase Admin Initialized");
    } catch (e) {
        console.error("❌ Failed to initialize Firebase Admin:", e);
        process.exit(1);
    }

    const db = getFirestore();

    // 2. Seed Collections

    // Stories
    if (seedData.stories) {
        console.log(`\n📚 Seeding ${seedData.stories.length} Stories...`);
        for (const story of seedData.stories) {
            await db.collection("stories").doc(story.id).set({
                ...story,
                createdAt: new Date(), // Use server timestamp equivalent in real app, but Date ok for seed
                publishedAt: story.publishedAt || new Date().toISOString()
            });
            console.log(`   - Added: ${story.title}`);
        }
    }

    // Plushies
    if (seedData.plushies) {
        console.log(`\n🧸 Seeding ${seedData.plushies.length} Plushies...`);
        for (const plushie of seedData.plushies) {
            await db.collection("plushies").doc(plushie.id).set({
                ...plushie,
                createdAt: new Date()
            });
            console.log(`   - Added: ${plushie.name}`);
        }
    }

    // Confessions
    if (seedData.confessions) {
        console.log(`\n💌 Seeding ${seedData.confessions.length} Confessions...`);
        for (const confession of seedData.confessions) {
            await db.collection("confessions").doc(confession.id).set({
                ...confession,
                createdAt: new Date()
            });
            console.log(`   - Added confession: ${confession.id}`);
        }
    }

    // Create a default admin user record in Firestore (to map to Auth UID later if needed)
    // For now we just seeded content.

    console.log("\n✨ Seeding Complete! You can now start the app.");
    process.exit(0);
}

seed().catch(e => {
    console.error("Fatal Error Seeding:", e);
    process.exit(1);
});
