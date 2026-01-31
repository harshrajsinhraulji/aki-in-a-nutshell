"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/lib/siteConfig";
import { Lock, Unlock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AkiPasswordGate({ onUnlock }: { onUnlock: () => void }) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [isUnlocked, setIsUnlocked] = useState(false);

    useEffect(() => {
        // Check if already unlocked in this session
        const stored = sessionStorage.getItem("aki-unlocked");
        if (stored === "true") {
            setIsUnlocked(true);
            onUnlock();
        }
    }, [onUnlock]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Default is 'akiupload' if not changed in config
        if (password === siteConfig.akiPasswordDefault) {
            setIsUnlocked(true);
            sessionStorage.setItem("aki-unlocked", "true");
            setTimeout(onUnlock, 1000); // Wait for animation
        } else {
            setError(true);
            setTimeout(() => setError(false), 500);
        }
    };

    if (isUnlocked) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh]">
                <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Unlock className="w-16 h-16 text-mint-500" />
                </motion.div>
                <p className="text-mint-500 mt-4">Welcome back, Aki.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
            <div className="bg-dark/50 p-8 rounded-3xl border border-pink-500/30 backdrop-blur-md max-w-sm w-full shadow-2xl">
                <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-pink-500/10 flex items-center justify-center">
                        <Lock className="w-8 h-8 text-pink-500" />
                    </div>
                </div>
                <h2 className="text-2xl font-heading mb-2 text-offwhite">Aki's Room</h2>
                <p className="text-neutral-400 mb-6 text-sm">Private upload space. Keep out.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full bg-dark/80 border ${error ? 'border-red-500' : 'border-neutral-700'} rounded-xl px-4 py-3 text-offwhite focus:outline-none focus:border-pink-500 transition-colors`}
                        placeholder="Password..."
                        autoFocus
                    />
                    <button
                        type="submit"
                        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl transition-transform active:scale-95"
                    >
                        Enter
                    </button>
                </form>
            </div>
        </div>
    );
}
