"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function GrainOverlay() {
    const [timeOfDay, setTimeOfDay] = useState<"day" | "evening" | "night">("day");

    useEffect(() => {
        const updateTimeOfDay = () => {
            const hour = new Date().getHours();
            if (hour >= 6 && hour < 17) {
                setTimeOfDay("day");
            } else if (hour >= 17 && hour < 20) {
                setTimeOfDay("evening");
            } else {
                setTimeOfDay("night");
            }
        };

        updateTimeOfDay();
        const interval = setInterval(updateTimeOfDay, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    // Time-based tinting
    const tintColors = {
        day: "rgba(255, 200, 150, 0.02)",      // Warm
        evening: "rgba(255, 150, 100, 0.03)",   // Orange-ish
        night: "rgba(100, 150, 255, 0.02)",     // Cool blue
    };

    return (
        <>
            {/* Animated grain layer */}
            <motion.div
                animate={{
                    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.03] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: "200px 200px",
                }}
            />

            {/* Time-based color tint overlay */}
            <motion.div
                animate={{ backgroundColor: tintColors[timeOfDay] }}
                transition={{ duration: 60, ease: "linear" }}
                className="pointer-events-none fixed inset-0 z-[9998] mix-blend-overlay"
            />

            {/* Subtle vignette for premium feel */}
            <div
                className="pointer-events-none fixed inset-0 z-[9997]"
                style={{
                    background: "radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(0,0,0,0.15) 100%)",
                }}
            />
        </>
    );
}
