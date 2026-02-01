"use client";

import { motion } from "framer-motion";

export function TypingIndicator({ className }: { className?: string }) {
    return (
        <div className={`flex items-center gap-1 p-2 rounded-full bg-white/5 w-fit ${className}`}>
            {[0, 1, 2].map((dot) => (
                <motion.div
                    key={dot}
                    className="w-1.5 h-1.5 bg-aki-purple/50 rounded-full"
                    animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: dot * 0.2,
                        ease: "easeInOut"
                    }}
                />
            ))}
            <span className="ml-2 text-xs text-muted-foreground font-mono">Anonymous is typing...</span>
        </div>
    );
}
