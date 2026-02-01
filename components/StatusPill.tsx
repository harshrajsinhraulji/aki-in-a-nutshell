"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function StatusPill() {
    const [status, setStatus] = useState({ text: "Existing", color: "bg-green-400" });

    useEffect(() => {
        // Simple time-based status simulation
        const hour = new Date().getHours();
        if (hour >= 23 || hour < 6) setStatus({ text: "Dreaming 😴", color: "bg-aki-purple" });
        else if (hour >= 6 && hour < 9) setStatus({ text: "Brewing Coffee ☕", color: "bg-yellow-400" });
        else if (hour >= 9 && hour < 18) setStatus({ text: "Coding 💻", color: "bg-green-400" });
        else setStatus({ text: "Reading 📖", color: "bg-blue-400" });
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="fixed bottom-6 left-6 z-50 pointer-events-none"
        >
            <div className="bg-white/80 dark:bg-black/40 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-full px-4 py-2 flex items-center gap-2 shadow-xl shadow-aki-pink/5 dark:shadow-black/20 transition-all duration-300 hover:scale-105">
                <span className={`w-2 h-2 rounded-full ${status.color} animate-pulse shadow-[0_0_10px_currentColor]`} />
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Aki is: <span className="text-foreground dark:text-white transition-colors">{status.text}</span>
                </span>
            </div>
        </motion.div>
    );
}
