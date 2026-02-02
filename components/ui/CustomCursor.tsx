"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

type CursorVariant = "default" | "link" | "button" | "text" | "media" | "hidden";

export function CustomCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const [variant, setVariant] = useState<CursorVariant>("default");
    const [isVisible, setIsVisible] = useState(false);
    const [label, setLabel] = useState<string | null>(null);

    // Smooth spring physics - different configs for different feels
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    // Cursor size based on variant
    const cursorSizes: Record<CursorVariant, number> = {
        default: 12,
        link: 48,
        button: 64,
        text: 4,
        media: 80,
        hidden: 0,
    };

    const handleMouseMove = useCallback((e: MouseEvent) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        if (!isVisible) setIsVisible(true);
    }, [cursorX, cursorY, isVisible]);

    const handleElementDetection = useCallback((e: MouseEvent) => {
        const target = e.target as HTMLElement;

        // Check for custom data attributes first
        const customVariant = target.closest('[data-cursor]')?.getAttribute('data-cursor') as CursorVariant;
        const customLabel = target.closest('[data-cursor-label]')?.getAttribute('data-cursor-label');

        if (customVariant) {
            setVariant(customVariant);
            setLabel(customLabel || null);
            return;
        }

        // Auto-detect element types
        const isLink = target.closest('a, [role="link"]');
        const isButton = target.closest('button, [role="button"], .btn');
        const isInput = target.closest('input, textarea, [contenteditable="true"]');
        const isMedia = target.closest('video, img, canvas, .media-element');
        const isInteractive = target.closest('[data-interactive]');

        if (isInput) {
            setVariant("text");
            setLabel(null);
        } else if (isButton || isInteractive) {
            setVariant("button");
            setLabel(null);
        } else if (isLink) {
            setVariant("link");
            setLabel(null);
        } else if (isMedia) {
            setVariant("media");
            setLabel("View");
        } else {
            setVariant("default");
            setLabel(null);
        }
    }, []);

    useEffect(() => {
        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousemove", handleElementDetection);
        window.addEventListener("mouseenter", handleMouseEnter);
        window.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousemove", handleElementDetection);
            window.removeEventListener("mouseenter", handleMouseEnter);
            window.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [handleMouseMove, handleElementDetection]);

    // Hide on mobile/touch devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

    const size = cursorSizes[variant];
    const isExpanded = variant !== "default" && variant !== "text";

    return (
        <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[10000] hidden md:flex items-center justify-center"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                width: size,
                height: size,
                marginLeft: -size / 2,
                marginTop: -size / 2,
            }}
            animate={{
                scale: isVisible ? 1 : 0,
                opacity: isVisible ? 1 : 0,
            }}
            transition={{ duration: 0.15 }}
        >
            {/* Main cursor orb */}
            <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                    scale: 1,
                    backgroundColor: isExpanded
                        ? "rgba(255, 108, 164, 0.15)"
                        : "rgba(255, 255, 255, 1)",
                    borderWidth: isExpanded ? 1 : 0,
                    borderColor: isExpanded ? "rgba(255, 108, 164, 0.5)" : "transparent",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                style={{
                    backdropFilter: isExpanded ? "blur(4px)" : "none",
                    mixBlendMode: isExpanded ? "normal" : "difference",
                }}
            />

            {/* Inner dot for default state */}
            <AnimatePresence>
                {variant === "default" && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute w-1.5 h-1.5 rounded-full bg-white"
                        style={{ mixBlendMode: "difference" }}
                    />
                )}
            </AnimatePresence>

            {/* Text indicator for text variant */}
            <AnimatePresence>
                {variant === "text" && (
                    <motion.div
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        exit={{ scaleY: 0 }}
                        className="w-0.5 h-5 bg-aki-pink rounded-full"
                    />
                )}
            </AnimatePresence>

            {/* Label for media/special states */}
            <AnimatePresence>
                {label && isExpanded && (
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="text-[10px] font-bold uppercase tracking-wider text-aki-pink"
                    >
                        {label}
                    </motion.span>
                )}
            </AnimatePresence>

            {/* Ripple effect on buttons */}
            {variant === "button" && (
                <motion.div
                    className="absolute inset-0 rounded-full border border-aki-pink/30"
                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                />
            )}
        </motion.div>
    );
}
