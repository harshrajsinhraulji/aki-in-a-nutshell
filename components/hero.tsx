"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { Hero3D } from "./hero-3d";

export function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <section ref={ref} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background Layer */}
            <div className="absolute inset-0 bg-dark z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-dark via-[#1A0B14] to-dark opacity-90" />
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                />

                {/* 3D Scene Layer */}
                {isMounted && (
                    <div className="absolute inset-0 z-0 pointer-events-auto">
                        <Hero3D />
                    </div>
                )}
            </div>

            {/* Content Layer */}
            <motion.div
                style={{ y: yText, opacity }}
                className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center pointer-events-none"
            >
                {/* Badge */}
                <motion.div
                    initial={{ rotate: -10, scale: 0 }}
                    animate={{ rotate: -5, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="pointer-events-auto mb-8 bg-lemon text-dark font-heading font-bold px-4 py-1 rounded-full shadow-[4px_4px_0_#121212] border-2 border-dark text-lg"
                >
                    Aki
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="font-heading font-extrabold text-4xl md:text-7xl lg:text-8xl tracking-tighter text-offwhite mb-6"
                >
                    Aki • 18 • Sri Lanka → England
                </motion.h1>

                {/* Subline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="font-sans text-xl md:text-2xl text-bubblegum/80 italic max-w-2xl mb-12"
                >
                    plushies, 03:14 confessions & travel scars — posted honestly
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="pointer-events-auto flex flex-col sm:flex-row gap-4 mb-16"
                >
                    <Link href="/stories" className="btn-primary text-lg px-8 py-4 rounded-full shadow-hover bg-primary text-white font-bold hover:scale-105 transition-transform">
                        Latest Stories
                    </Link>
                    <Link href="/gallery" className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/5 transition-colors text-offwhite font-medium">
                        Gallery
                    </Link>
                    <Link href="/confessions" className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/5 transition-colors text-offwhite font-medium">
                        Confessions
                    </Link>
                </motion.div>

                {/* Stats Chips */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="flex flex-wrap justify-center gap-4 pointer-events-auto"
                >
                    <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-mono text-muted-foreground">
                        18 years old
                    </span>
                    <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-mono text-muted-foreground">
                        📍 England 🇬🇧
                    </span>
                    <span className="px-4 py-2 rounded-full bg-lemon/10 border border-lemon/20 text-sm font-mono text-lemon">
                        🌙 Insomniac
                    </span>
                </motion.div>
            </motion.div>
        </section>
    );
}
