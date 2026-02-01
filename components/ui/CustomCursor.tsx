"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth spring physics for the "trailing" feel
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseenter", handleMouseEnter);
        window.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseenter", handleMouseEnter);
            window.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [cursorX, cursorY, isVisible]);

    // Hide on mobile/touch devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

    return (
        <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[10000] hidden md:block mix-blend-difference"
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
                opacity: isVisible ? 1 : 0
            }}
        >
            {/* The Orb */}
            <div className="relative flex h-8 w-8 items-center justify-center">
                <div className="absolute h-3 w-3 rounded-full bg-white shadow-[0_0_20px_2px_rgba(255,255,255,0.8)]" />
                <div className="absolute h-8 w-8 rounded-full border border-white/30 opacity-50 animate-ping" />
            </div>
        </motion.div>
    );
}
