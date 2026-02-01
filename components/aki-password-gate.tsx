"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/siteConfig";
import { Lock, Unlock } from "lucide-react";
import { motion } from "framer-motion";

export function AkiPasswordGate({ onUnlock }: { onUnlock: () => void }) {
    const [input, setInput] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.toLowerCase() === siteConfig.akiPassword) {
            onUnlock();
        } else {
            setError(true);
            setTimeout(() => setError(false), 500);
        }
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-neutral-900 border border-neutral-800 p-8 rounded-3xl max-w-sm w-full text-center"
            >
                <div className="mb-6 flex justify-center">
                    <div className="bg-pink-500/10 p-4 rounded-full text-pink-500">
                        <Lock size={32} />
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-2 text-offwhite">Aki&apos;s Room</h2>
                <p className="text-neutral-500 mb-6 text-sm">Protected space for memories.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="password"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Password..."
                        className={`w-full bg-black/50 border rounded-xl p-3 text-center text-offwhite focus:outline-none transition-colors ${error ? "border-red-500 animate-shake" : "border-neutral-700 focus:border-pink-500"
                            }`}
                    />
                    <button
                        type="submit"
                        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl transition-transform active:scale-95"
                    >
                        Unlock
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
