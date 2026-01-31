"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import IntroSequence from "@/components/IntroSequence";
import Hero3D from "@/components/Hero3D";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function Home() {
    const [introComplete, setIntroComplete] = useState(false);

    return (
        <div className="min-h-screen flex flex-col items-center">

            {/* Intro Sequence (Overlay) */}
            {!introComplete && (
                <IntroSequence onComplete={() => setIntroComplete(true)} />
            )}

            {/* Main Content - Fades in after intro */}
            <motion.div
                className="w-full flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: introComplete ? 1 : 0 }}
                transition={{ duration: 1 }}
            >
                <Hero3D />

                <div className="max-w-2xl px-6 py-12 text-center space-y-8 z-10">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h1 className="font-heading font-bold text-4xl md:text-6xl text-aki-dark mb-4">
                            Messy <span className="text-aki-pink">Cute</span>.
                        </h1>
                        <p className="text-lg text-aki-dark/70 font-body max-w-md mx-auto leading-relaxed">
                            plushies, 03:14 confessions & travel scars — posted honestly from my bedroom floor.
                        </p>
                    </motion.div>

                    <motion.div
                        className="flex flex-wrap justify-center gap-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <Link href="/stories">
                            <Button size="lg" className="rounded-full">
                                Read My Diary
                            </Button>
                        </Link>
                        <Link href="/plushies">
                            <Button variant="secondary" size="lg" className="rounded-full">
                                Meet the Plushies
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
