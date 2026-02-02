"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroSequenceProps {
    onComplete: () => void;
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
    const [textStage, setTextStage] = useState(0);
    const [currentBgImage, setCurrentBgImage] = useState(0);

    // Aki's images
    const INTRO_IMAGES = [
        "/images/aki/img1.png",
        "/images/aki/img2.jpg",
        "/images/aki/img3.jpg",
        "/images/aki/img4.png",
        "/images/aki/img5.jpg",
        "/images/aki/img6.png",
        "/images/aki/img7.png",
        "/images/aki/img8.png",
        "/images/aki/img9.png"
    ];

    useEffect(() => {
        // Force intro replay for new version
        if (typeof window !== 'undefined') {
            // DEBUG: Changed key to force replay and added logs
            const hasSeen = localStorage.getItem("intro_seen_debug_1");
            console.log("[IntroDebug] Checking seen status:", hasSeen);

            if (hasSeen) {
                console.log("[IntroDebug] Intro already seen, skipping.");
                onComplete();
                return;
            }

            console.log("[IntroDebug] Starting preload of", INTRO_IMAGES.length, "images");
            // Preload images for smooth playback
            INTRO_IMAGES.forEach((src) => {
                const img = new Image();
                img.src = src;
                img.onload = () => console.log("[IntroDebug] Loaded:", src);
                img.onerror = (e) => console.error("[IntroDebug] Failed to load:", src, e);
            });
        }

        // Image cycling
        const imageInterval = setInterval(() => {
            setCurrentBgImage(prev => (prev + 1) % INTRO_IMAGES.length);
        }, 120);

        const timer1 = setTimeout(() => setTextStage(1), 500); // Hello
        const timer2 = setTimeout(() => setTextStage(2), 2000); // I'm Aki (Images appear)
        const timer3 = setTimeout(() => setTextStage(3), 4000); // Details
        const timer4 = setTimeout(() => {
            if (typeof window !== 'undefined') localStorage.setItem("intro_seen_debug_1", "true");
            onComplete();
        }, 6000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
            clearInterval(imageInterval);
        };
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-8 text-center bg-background overflow-hidden">

            {/* Background Image Cycling (Only during Stage 2) */}
            <AnimatePresence>
                {textStage === 2 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-0 pointer-events-none"
                    >
                        <div
                            className="w-full h-full bg-cover bg-center transition-all duration-100 ease-linear"
                            style={{ backgroundImage: `url("${INTRO_IMAGES[currentBgImage]}")` }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {textStage === 1 && (
                    <motion.div
                        key="hello"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="font-heading font-bold text-4xl md:text-6xl text-foreground relative z-10"
                    >
                        Hello.
                    </motion.div>
                )}

                {textStage === 2 && (
                    <motion.div
                        key="name"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="font-heading font-black text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-aki-pink to-aki-purple relative z-10"
                    >
                        I&rsquo;m Aki.
                    </motion.div>
                )}

                {textStage === 3 && (
                    <motion.div
                        key="details"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative z-10"
                    >
                        <div className="font-mono text-sm md:text-base text-muted-foreground bg-white/50 dark:bg-black/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-lg">
                            18 • Sri Lanka → England • 🧸
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
