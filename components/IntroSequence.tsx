"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroSequenceProps {
    onComplete: () => void;
    reducedMotion?: boolean;
}

export default function IntroSequence({ onComplete, reducedMotion = false }: IntroSequenceProps) {
    const [phase, setPhase] = useState<"hello" | "name" | "complete">("hello");
    const [displayText, setDisplayText] = useState("");
    const [showCursor, setShowCursor] = useState(true);

    const helloText = "Hello.";
    const nameText = "I'm Aki.";

    // Skip animation if reduced motion preferred
    useEffect(() => {
        if (reducedMotion) {
            setPhase("complete");
            onComplete();
        }
    }, [reducedMotion, onComplete]);

    // Typing effect
    const typeText = useCallback((text: string, callback: () => void) => {
        let index = 0;
        const interval = setInterval(() => {
            setDisplayText(text.slice(0, index + 1));
            index++;
            if (index >= text.length) {
                clearInterval(interval);
                callback();
            }
        }, 100);
        return () => clearInterval(interval);
    }, []);

    // Cursor blink
    useEffect(() => {
        const interval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 530);
        return () => clearInterval(interval);
    }, []);

    // Phase management
    useEffect(() => {
        if (reducedMotion) return;

        if (phase === "hello") {
            const cleanup = typeText(helloText, () => {
                setTimeout(() => {
                    setDisplayText("");
                    setPhase("name");
                }, 800);
            });
            return cleanup;
        }

        if (phase === "name") {
            const cleanup = typeText(nameText, () => {
                setTimeout(() => {
                    setPhase("complete");
                    onComplete();
                }, 600);
            });
            return cleanup;
        }
    }, [phase, typeText, onComplete, reducedMotion]);

    if (reducedMotion || phase === "complete") {
        return null;
    }

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #FFF2F7 0%, #FFD6EC 50%, #F7F7F8 100%)" }}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-center">
                    <h1 className="text-5xl md:text-7xl font-heading font-bold">
                        {phase === "hello" && (
                            <span className="text-aki-dark">
                                {displayText}
                                <span
                                    className={`inline-block w-1 h-12 md:h-16 bg-aki-pink ml-1 align-middle transition-opacity ${showCursor ? "opacity-100" : "opacity-0"
                                        }`}
                                    aria-hidden="true"
                                />
                            </span>
                        )}
                        {phase === "name" && (
                            <>
                                <span className="text-aki-dark">I&apos;m </span>
                                <span className="text-aki-pink">
                                    {displayText.replace("I'm ", "")}
                                </span>
                                <span
                                    className={`inline-block w-1 h-12 md:h-16 bg-aki-pink ml-1 align-middle transition-opacity ${showCursor ? "opacity-100" : "opacity-0"
                                        }`}
                                    aria-hidden="true"
                                />
                            </>
                        )}
                    </h1>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
