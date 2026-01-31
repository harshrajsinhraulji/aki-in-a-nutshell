"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroSequenceProps {
    onComplete: () => void;
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
    const [textStage, setTextStage] = useState(0);

    useEffect(() => {
        const timer1 = setTimeout(() => setTextStage(1), 1000); // Start
        const timer2 = setTimeout(() => setTextStage(2), 2500); // Name
        const timer3 = setTimeout(() => setTextStage(3), 4000); // Details
        const timer4 = setTimeout(() => onComplete(), 5500);    // Finish

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
        };
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-40 pointer-events-none flex flex-col items-center justify-center p-8 text-center">
            <AnimatePresence>
                {textStage >= 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="font-heading font-bold text-4xl md:text-6xl text-aki-dark py-2"
                    >
                        Hello.
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {textStage >= 2 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="font-heading font-bold text-4xl md:text-6xl text-aki-pink py-2"
                    >
                        I'm Aki.
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {textStage >= 3 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 font-mono text-sm md:text-base text-aki-muted bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/50"
                    >
                        18 • Sri Lanka → England • 🧸
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
