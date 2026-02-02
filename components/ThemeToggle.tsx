"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [wipeOrigin, setWipeOrigin] = useState({ x: 0, y: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => setMounted(true), []);

    const handleToggle = useCallback(() => {
        if (!buttonRef.current || isTransitioning) return;

        // Get button position for wipe origin
        const rect = buttonRef.current.getBoundingClientRect();
        setWipeOrigin({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
        });

        setIsTransitioning(true);

        // Delay theme change to sync with animation
        setTimeout(() => {
            setTheme(theme === "dark" ? "light" : "dark");
        }, 300);

        // End transition after animation
        setTimeout(() => {
            setIsTransitioning(false);
        }, 800);
    }, [theme, setTheme, isTransitioning]);

    if (!mounted) return null;

    const isDark = theme === "dark";

    return (
        <>
            <button
                ref={buttonRef}
                onClick={handleToggle}
                disabled={isTransitioning}
                className="relative p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/20 group disabled:opacity-50"
                aria-label="Toggle Theme"
            >
                <motion.div
                    initial={false}
                    animate={{
                        rotate: isDark ? 180 : 0,
                        scale: isTransitioning ? 1.2 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                    {isDark ? (
                        <Moon className="w-5 h-5 text-aki-pink" />
                    ) : (
                        <Sun className="w-5 h-5 text-amber-400" />
                    )}
                </motion.div>

                {/* Ripple effect on click */}
                <AnimatePresence>
                    {isTransitioning && (
                        <motion.div
                            className="absolute inset-0 rounded-full bg-aki-pink/30"
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 2, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        />
                    )}
                </AnimatePresence>
            </button>

            {/* Full-screen wipe transition */}
            <AnimatePresence>
                {isTransitioning && (
                    <motion.div
                        className="fixed inset-0 z-[10000] pointer-events-none"
                        initial={{
                            clipPath: `circle(0% at ${wipeOrigin.x}px ${wipeOrigin.y}px)`
                        }}
                        animate={{
                            clipPath: `circle(150% at ${wipeOrigin.x}px ${wipeOrigin.y}px)`
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                        style={{
                            backgroundColor: isDark
                                ? "hsl(330 100% 96%)"  // Light mode background
                                : "hsl(265 95% 4%)",   // Dark mode background
                        }}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
