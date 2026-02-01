"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const SPARKLE_COUNT = 15;

export function Decorations() {
    const [sparkles, setSparkles] = useState<{ id: number; left: number; top: number; delay: number; color: string }[]>([]);

    useEffect(() => {
        const newSparkles = Array.from({ length: SPARKLE_COUNT }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 5,
            color: Math.random() > 0.5 ? "text-aki-pink" : "text-aki-highlight",
        }));
        setSparkles(newSparkles);
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {sparkles.map((s) => (
                <motion.div
                    key={s.id}
                    className={cn("absolute", s.color)}
                    style={{
                        left: `${s.left}%`,
                        top: `${s.top}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 0.7, 0],
                        scale: [0, 1.2, 0],
                        y: -50
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: s.delay,
                        ease: "easeInOut"
                    }}
                >
                    ✨
                </motion.div>
            ))}
        </div>
    );
}
