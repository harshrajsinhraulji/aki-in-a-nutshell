"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/siteConfig";

export function IntroSequence({ onComplete }: { onComplete: () => void }) {
    const [text, setText] = useState("");
    const fullText = siteConfig.hero.title; // "Hello. I'm Aki."
    const [phase, setPhase] = useState<"typing" | "reveal" | "done">("typing");

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setText(fullText.slice(0, index + 1));
            index++;
            if (index === fullText.length) {
                clearInterval(interval);
                setTimeout(() => setPhase("reveal"), 500); // Wait a bit before name reveal
            }
        }, 100); // Typing speed

        return () => clearInterval(interval);
    }, [fullText]);

    useEffect(() => {
        if (phase === "reveal") {
            const timer = setTimeout(() => {
                setPhase("done");
                onComplete();
            }, 2500); // How long the reveal stays before allowing scroll/interaction fully
            return () => clearTimeout(timer);
        }
    }, [phase, onComplete]);

    if (phase === "done") {
        // We don't unmount it entirely, we just let it sit or fade out the background?
        // Actually, usually intro overlay fades away. 
        // But the requirement says "Name slide-up... 3D canvas fades/zooms in behind name".
        // So the text REMAINS as the Hero text.
        return (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <HeroContent isVisible={true} />
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark text-offwhite">
            <div className="text-center">
                {/* Typing Line */}
                <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 min-h-[4rem]">
                    {text}
                    <span className="animate-pulse">|</span>
                </h1>

                {/* Name Reveal Layer */}
                <AnimatePresence>
                    {phase === "reveal" && (
                        <HeroContent isVisible={false} /> // Initially hidden or animating in
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function HeroContent({ isVisible }: { isVisible: boolean }) {
    // This is the content that stays ("Aki • 18...")
    const { name, age, location } = siteConfig;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center gap-2"
        >
            <h2 className="text-xl md:text-2xl font-body text-pink-500 font-medium tracking-wide">
                {name} • {age} • {location}
            </h2>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-sm md:text-base text-neutral-400 mt-2 max-w-md text-center italic"
            >
                {siteConfig.hero.subline}
            </motion.p>
        </motion.div>
    );
}
