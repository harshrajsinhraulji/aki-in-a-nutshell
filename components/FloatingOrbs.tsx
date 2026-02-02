"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

type SectionType = "home" | "stories" | "music" | "plushies" | "confessions" | "default";

// Color palettes for each section
const sectionColors: Record<SectionType, { primary: string; secondary: string; accent: string }> = {
    home: {
        primary: "rgba(255, 108, 164, 0.25)",      // Pink
        secondary: "rgba(192, 132, 252, 0.20)",    // Purple
        accent: "rgba(249, 168, 212, 0.15)",       // Light pink
    },
    stories: {
        primary: "rgba(255, 108, 164, 0.30)",      // Stronger pink
        secondary: "rgba(139, 92, 246, 0.25)",     // Violet
        accent: "rgba(236, 72, 153, 0.20)",        // Rose
    },
    music: {
        primary: "rgba(168, 85, 247, 0.30)",       // Purple
        secondary: "rgba(139, 92, 246, 0.25)",     // Violet
        accent: "rgba(192, 132, 252, 0.20)",       // Light purple
    },
    plushies: {
        primary: "rgba(163, 230, 53, 0.25)",       // Lime
        secondary: "rgba(132, 204, 22, 0.20)",     // Green
        accent: "rgba(190, 242, 100, 0.15)",       // Light lime
    },
    confessions: {
        primary: "rgba(244, 114, 182, 0.30)",      // Magenta/Pink
        secondary: "rgba(251, 146, 60, 0.20)",     // Orange
        accent: "rgba(255, 108, 164, 0.25)",       // Pink
    },
    default: {
        primary: "rgba(255, 108, 164, 0.25)",
        secondary: "rgba(192, 132, 252, 0.20)",
        accent: "rgba(249, 168, 212, 0.15)",
    },
};

interface FloatingOrbsProps {
    activeSection?: SectionType;
}

export function FloatingOrbs({ activeSection = "default" }: FloatingOrbsProps) {
    const [colors, setColors] = useState(sectionColors.default);
    const { scrollYProgress } = useScroll();

    // Smooth parallax for orbs
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

    const y1Spring = useSpring(y1, { stiffness: 100, damping: 30 });
    const y2Spring = useSpring(y2, { stiffness: 100, damping: 30 });
    const y3Spring = useSpring(y3, { stiffness: 100, damping: 30 });

    // Update colors when section changes
    useEffect(() => {
        setColors(sectionColors[activeSection] || sectionColors.default);
    }, [activeSection]);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
            {/* Large Primary Orb - Top Right */}
            <motion.div
                style={{ y: y1Spring }}
                animate={{
                    x: [0, 30, -20, 0],
                    scale: [1, 1.1, 0.95, 1],
                    backgroundColor: colors.primary,
                }}
                transition={{
                    x: { duration: 20, repeat: Infinity, ease: "easeInOut" },
                    scale: { duration: 20, repeat: Infinity, ease: "easeInOut" },
                    backgroundColor: { duration: 1.5, ease: "easeInOut" },
                }}
                className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-3xl"
            />

            {/* Medium Secondary Orb - Bottom Left */}
            <motion.div
                style={{ y: y2Spring }}
                animate={{
                    x: [0, -20, 30, 0],
                    scale: [1, 0.9, 1.1, 1],
                    backgroundColor: colors.secondary,
                }}
                transition={{
                    x: { duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 },
                    scale: { duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 },
                    backgroundColor: { duration: 1.5, ease: "easeInOut" },
                }}
                className="absolute -bottom-48 -left-48 w-[600px] h-[600px] rounded-full blur-3xl"
            />

            {/* Small Accent Orb - Center */}
            <motion.div
                style={{ y: y3Spring }}
                animate={{
                    x: [0, 50, -30, 0],
                    opacity: [0.3, 0.5, 0.3],
                    backgroundColor: colors.accent,
                }}
                transition={{
                    x: { duration: 15, repeat: Infinity, ease: "easeInOut", delay: 5 },
                    opacity: { duration: 15, repeat: Infinity, ease: "easeInOut", delay: 5 },
                    backgroundColor: { duration: 1.5, ease: "easeInOut" },
                }}
                className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full blur-2xl"
            />

            {/* Tiny Pulse Orb - Top Left */}
            <motion.div
                animate={{
                    y: [0, 20, -10, 0],
                    opacity: [0.4, 0.6, 0.4],
                    backgroundColor: colors.primary,
                }}
                transition={{
                    y: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                    backgroundColor: { duration: 1.5, ease: "easeInOut" },
                }}
                className="absolute top-20 left-20 w-[150px] h-[150px] rounded-full blur-2xl"
            />

            {/* Extra floating dots for depth - Mobile hidden */}
            <motion.div
                animate={{
                    y: [0, -30, 10, 0],
                    x: [0, 20, -10, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="hidden md:block absolute top-[60%] right-[30%] w-4 h-4 rounded-full bg-aki-pink/30 blur-sm"
            />
            <motion.div
                animate={{
                    y: [0, 20, -15, 0],
                    x: [0, -15, 20, 0],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                className="hidden md:block absolute top-[30%] left-[25%] w-3 h-3 rounded-full bg-aki-purple/30 blur-sm"
            />
        </div>
    );
}
