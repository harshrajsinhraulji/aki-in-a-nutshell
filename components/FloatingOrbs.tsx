"use client";

import { motion } from "framer-motion";

export function FloatingOrbs() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
            {/* Large Pink Orb - Top Right */}
            <motion.div
                animate={{
                    x: [0, 30, -20, 0],
                    y: [0, -40, 20, 0],
                    scale: [1, 1.1, 0.95, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-aki-pink/30 to-aki-highlight/20 blur-3xl"
            />

            {/* Medium Purple Orb - Bottom Left */}
            <motion.div
                animate={{
                    x: [0, -20, 30, 0],
                    y: [0, 30, -20, 0],
                    scale: [1, 0.9, 1.1, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
                className="absolute -bottom-48 -left-48 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-aki-purple/25 to-aki-pink/15 blur-3xl"
            />

            {/* Small Highlight Orb - Center */}
            <motion.div
                animate={{
                    x: [0, 50, -30, 0],
                    y: [0, -30, 50, 0],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5,
                }}
                className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-aki-highlight/20 to-transparent blur-2xl"
            />

            {/* Tiny Accent Orb - Top Left */}
            <motion.div
                animate={{
                    y: [0, 20, -10, 0],
                    opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-20 left-20 w-[150px] h-[150px] rounded-full bg-aki-pink/20 blur-2xl"
            />
        </div>
    );
}
