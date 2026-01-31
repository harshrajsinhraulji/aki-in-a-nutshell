"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import IntroSequence from "@/components/IntroSequence";
import LoadingSpinner from "@/components/LoadingSpinner";

// Dynamic import for Hero3D to avoid SSR issues with Three.js
const Hero3D = dynamic(() => import("@/components/Hero3D"), {
    ssr: false,
    loading: () => <LoadingSpinner />,
});

export default function HeroSection() {
    const searchParams = useSearchParams();
    const [introComplete, setIntroComplete] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);
    const lowPower = searchParams.get("lowpower") === "1";

    // Check for reduced motion preference
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReducedMotion(mediaQuery.matches);

        const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    // Skip intro if reduced motion or returning visitor
    useEffect(() => {
        if (reducedMotion) {
            setIntroComplete(true);
        }
        // Check session storage for returning visitors
        const hasSeenIntro = sessionStorage.getItem("aki-intro-seen");
        if (hasSeenIntro) {
            setIntroComplete(true);
        }
    }, [reducedMotion]);

    const handleIntroComplete = () => {
        setIntroComplete(true);
        sessionStorage.setItem("aki-intro-seen", "true");
    };

    return (
        <>
            {/* Intro Sequence Overlay */}
            {!introComplete && (
                <IntroSequence
                    onComplete={handleIntroComplete}
                    reducedMotion={reducedMotion}
                />
            )}

            {/* Main Hero Content */}
            <section
                className="relative min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-4 py-8"
                aria-label="Hero section"
            >
                {/* Background decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                    <motion.div
                        className="absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl"
                        style={{ backgroundColor: "rgba(255, 108, 164, 0.2)" }}
                        animate={reducedMotion ? {} : {
                            y: [0, -20, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute bottom-20 right-10 w-40 h-40 rounded-full blur-3xl"
                        style={{ backgroundColor: "rgba(0, 230, 168, 0.2)" }}
                        animate={reducedMotion ? {} : {
                            y: [0, 20, 0],
                            scale: [1, 1.15, 1],
                        }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    />
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl"
                        style={{ backgroundColor: "rgba(255, 226, 122, 0.15)" }}
                    />
                </div>

                {/* 3D Plushie */}
                <div className="relative z-10 w-full max-w-lg mx-auto">
                    <Hero3D isVisible={introComplete} lowPower={lowPower} />
                </div>

                {/* Hero Text Content */}
                <motion.div
                    className="relative z-10 text-center max-w-3xl mx-auto mt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                        opacity: introComplete ? 1 : 0,
                        y: introComplete ? 0 : 20
                    }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    {/* Main heading */}
                    <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">
                        <span className="text-gradient">Hello.</span>
                        <br />
                        <span style={{ color: "#121212" }}>I&apos;m </span>
                        <span style={{ color: "#FF6CA4" }}>Aki</span>
                        <motion.span
                            className="inline-block"
                            animate={reducedMotion ? {} : {
                                y: [0, -8, 0],
                                rotate: [0, 10, -10, 0],
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            ✨
                        </motion.span>
                    </h1>

                    {/* Subline */}
                    <p className="text-lg md:text-xl mb-8 font-body" style={{ color: "rgba(18, 18, 18, 0.7)" }}>
                        welcome to my cozy corner of the internet —
                        <br className="hidden sm:block" />
                        plushies, late-night thoughts, and messy-cute vibes only
                    </p>

                    {/* CTA buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.a
                            href="/stories"
                            className="btn-primary inline-flex items-center justify-center gap-2"
                            aria-label="Read Aki's stories"
                            whileHover={reducedMotion ? {} : { scale: 1.05 }}
                            whileTap={reducedMotion ? {} : { scale: 0.95 }}
                        >
                            📖 read my stories
                        </motion.a>
                        <motion.a
                            href="/plushies"
                            className="glass px-6 py-3 rounded-full font-medium transition-all inline-flex items-center justify-center gap-2"
                            style={{ color: "#121212" }}
                            aria-label="Meet Aki's plushie family"
                            whileHover={reducedMotion ? {} : { scale: 1.05 }}
                            whileTap={reducedMotion ? {} : { scale: 0.95 }}
                        >
                            🧸 meet the plushie fam
                        </motion.a>
                    </div>

                    {/* Late-night vibe indicator */}
                    <p className="mt-12 text-sm font-mono" style={{ color: "rgba(18, 18, 18, 0.5)" }}>
                        ✦ best viewed at 2am with snacks ✦
                    </p>
                </motion.div>
            </section>
        </>
    );
}
