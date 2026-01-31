"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AkiLockScreen() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [error, setError] = useState(false);

    const handleUnlock = () => {
        // Mock password - "dream"
        if (password.toLowerCase() === "dream") {
            setIsUnlocked(true);
            setTimeout(() => {
                router.push("/aki/dashboard");
            }, 1500);
        } else {
            setError(true);
            setPassword("");
            setTimeout(() => setError(false), 500);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background Pulse */}
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-neon-purple/5 blur-3xl z-0"
            />

            <div className="z-10 w-full max-w-sm p-8 bg-midnight-900/50 backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl">
                <div className="flex justify-center mb-8">
                    <motion.div
                        animate={isUnlocked ? { scale: 1.2, rotate: 360 } : {}}
                        transition={{ duration: 0.5 }}
                        className={`p-4 rounded-full ${isUnlocked ? "bg-neon-cyan/20 text-neon-cyan" : "bg-white/5 text-stardust-400"}`}
                    >
                        {isUnlocked ? <Unlock size={32} /> : <Lock size={32} />}
                    </motion.div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-center font-heading font-bold text-xl text-stardust-50">
                        {isUnlocked ? "Access Granted" : "Restricted Area"}
                    </h2>

                    <div className="relative">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                            placeholder="Enter Access Code"
                            className={`w-full bg-midnight-950 border ${error ? "border-red-500 animate-shake" : "border-white/10"} rounded-xl px-4 py-3 text-center text-stardust-50 tracking-widest focus:outline-none focus:border-neon-purple transition-colors`}
                            disabled={isUnlocked}
                        />
                    </div>

                    <Button
                        onClick={handleUnlock}
                        className="w-full bg-white/10 hover:bg-white/20 text-stardust-50"
                        disabled={isUnlocked}
                    >
                        Authenticate
                    </Button>

                    <p className="text-center text-xs text-stardust-600 font-mono">
                        ID: AKI-001 // SYSTEM: NOCTURNAL
                    </p>
                </div>
            </div>
        </div>
    );
}
