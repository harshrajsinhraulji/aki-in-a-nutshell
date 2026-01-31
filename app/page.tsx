"use client";

import { useState } from "react";
import { Hero3D } from "@/components/hero-3d";
import { IntroSequence } from "@/components/intro-sequence";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
    const [introDone, setIntroDone] = useState(false);

    // This would come from siteConfig or dynamic fetching in a real app
    // For now we assume a standard path or the user replaces it after upload
    const glbUrl = "/assets/aki_plush.glb";

    return (
        <main className="min-h-screen relative overflow-hidden">
            {/* Intro Overlay handles the typing + blocking interaction until ready */}
            <div className={`transition-opacity duration-1000 ${introDone ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <IntroSequence onComplete={() => setIntroDone(true)} />
            </div>

            {/* 3D Scene Background - Fades in when intro is "done" (or specifically the reveal phase ends) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: introDone ? 1 : 0, scale: introDone ? 1 : 0.9 }}
                transition={{ duration: 1.5 }}
                className="fixed inset-0 z-0"
            >
                <Hero3D modelUrl={glbUrl} />
            </motion.div>

            {/* Hero Text Overlay (The persistent part after intro) */}
            {introDone && (
                <div className="relative z-10 w-full h-screen flex flex-col items-center justify-center pointer-events-none">
                    <div className="mt-[20vh] text-center">
                        {/* We duplicate the styling from IntroSequence's final state to ensure seamless matching 
                        In a perfect world, IntroSequence transforms into this. 
                        For now, we just fade in the permanent version. */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center gap-4"
                        >
                            <h1 className="text-6xl md:text-8xl font-heading font-bold text-offwhite drop-shadow-lg">
                                Aki
                            </h1>
                            <p className="text-xl md:text-2xl text-pink-500 font-medium">
                                18 • Sri Lanka → England
                            </p>
                            <p className="text-neutral-400 italic max-w-sm text-center">
                                plushies, 03:14 confessions & travel scars — posted honestly
                            </p>
                        </motion.div>
                    </div>

                    {/* Scroll Cue */}
                    <motion.div
                        className="absolute bottom-10"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <ArrowDown className="text-pink-500 w-8 h-8" />
                    </motion.div>
                </div>
            )}

            {/* Content Sections Placeholder */}
            {introDone && (
                <div className="relative z-10 bg-dark/80 backdrop-blur-sm min-h-screen mt-[100vh]">
                    <div className="max-w-4xl mx-auto p-8 text-center py-24">
                        <h2 className="text-3xl font-heading text-pink-500 mb-8">Latest Stories</h2>
                        <p className="text-neutral-400">Loading stories...</p>
                    </div>
                </div>
            )}
        </main>
    );
}
