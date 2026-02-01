"use client";

import { KineticTextHero } from "@/components/KineticTextHero";
import { GlassCard } from "@/components/GlassCard";
import IntroSequence from "@/components/IntroSequence";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Music, BookOpen, Ghost, Sparkles } from "lucide-react";
import { Vinyl } from "@/components/Vinyl";
import { AudioVisualizer } from "@/components/AudioVisualizer";
import { HolographicFoil } from "@/components/HolographicFoil";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/lib/audio-context";

export default function Home() {
    const [introComplete, setIntroComplete] = useState(false);
    const { currentTrack, isPlaying } = useAudio();

    return (
        <main className="min-h-screen relative flex flex-col items-center p-4 md:p-8 selection:bg-aki-pink selection:text-white">

            {/* 1. Intro Sequence (Strict Unmount) */}
            <AnimatePresence mode="wait">
                {!introComplete && (
                    <motion.div
                        key="intro-overlay"
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="fixed inset-0 z-50 bg-background flex items-center justify-center"
                    >
                        <IntroSequence onComplete={() => setIntroComplete(true)} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 2. Main Content Portal (Only visible after intro) */}
            {introComplete && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                    className="relative z-10 w-full max-w-6xl mt-8 md:mt-12"
                >

                    {/* HERO: Kinetic Text (Massive Whitespace) */}
                    <div className="min-h-[50vh] flex items-center justify-center mb-12">
                        <KineticTextHero />
                    </div>

                    {/* GLASS GRID - Tighter "iOS" Spacing */}
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1,
                                    delayChildren: 0.2
                                }
                            }
                        }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[180px]"
                    >

                        {/* 1. Stories (Large, Vertical) */}
                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                            className="md:col-span-4 md:row-span-2"
                        >
                            <Link href="/stories">
                                <GlassCard className="h-full p-6 flex flex-col justify-between group transition-all duration-500 hover:shadow-2xl hover:shadow-aki-pink/20 hover:-translate-y-1">
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-aki-pink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative z-10">
                                        <div className="w-10 h-10 rounded-xl bg-white/60 dark:bg-white/10 flex items-center justify-center mb-4 text-aki-pink backdrop-blur-md shadow-sm border border-white/20">
                                            <BookOpen size={20} />
                                        </div>
                                        <h2 className="text-3xl font-heading font-bold text-foreground mb-2 transition-colors">Stories.</h2>
                                        <p className="text-sm text-muted-foreground font-light leading-relaxed group-hover:text-foreground/80 transition-colors">Fragments of a life lived online.</p>
                                    </div>
                                    <div className="relative z-10 flex justify-between items-center border-t border-border pt-4 mt-2 group-hover:border-aki-pink/30 transition-colors">
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground group-hover:text-aki-pink transition-colors">Read Now</span>
                                        <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-aki-pink transition-colors" />
                                    </div>
                                </GlassCard>
                            </Link>
                        </motion.div>

                        {/* 2. Mixtape (Wide) */}
                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                            className="md:col-span-8 md:row-span-1"
                        >
                            <Link href="/music">
                                <GlassCard layoutId="mixtape-card" className="h-full p-6 group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-aki-purple/20 hover:-translate-y-1">
                                    <div className="flex flex-nowrap items-center justify-between h-full w-full">
                                        <div className="relative z-10 flex flex-col justify-center h-full min-w-0 flex-1 mr-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                {isPlaying && <AudioVisualizer className="w-16 h-4 opacity-70" />}
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-aki-purple/80">
                                                    {isPlaying ? "Now Playing" : "Tap to Play"}
                                                </span>
                                            </div>
                                            <h2 className="text-2xl font-heading font-bold text-foreground truncate selection:bg-aki-purple selection:text-white">
                                                {currentTrack?.title || "Aki's Mixtape"}
                                            </h2>
                                            {currentTrack?.artist && (
                                                <p className="text-sm text-muted-foreground truncate">{currentTrack.artist}</p>
                                            )}
                                        </div>
                                        <div className="relative z-10 shrink-0 group-hover:scale-110 transition-transform duration-500">
                                            <Vinyl className="w-20 h-20" />
                                        </div>
                                    </div>
                                </GlassCard>
                            </Link>
                        </motion.div>

                        {/* 3. Confessions (Small) */}
                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                            className="md:col-span-4 md:row-span-1"
                        >
                            <Link href="/confessions">
                                <GlassCard className="h-full p-0 overflow-hidden flex flex-col justify-between group hover:bg-white/60 dark:hover:bg-white/5 transition-colors">
                                    <HolographicFoil className="h-full w-full p-5 flex flex-col justify-between border-0 bg-transparent">
                                        <div className="flex justify-between items-start relative z-10">
                                            <div className="p-2.5 bg-white/60 dark:bg-white/10 rounded-lg text-aki-purple shadow-sm border border-white/20"><Sparkles size={18} /></div>
                                            <span className="text-[10px] font-bold bg-aki-pink text-white px-1.5 py-0.5 rounded-md shadow-lg shadow-aki-pink/20">NEW</span>
                                        </div>
                                        <div className="relative z-10">
                                            <h3 className="text-lg font-bold text-foreground mb-1">Confess</h3>
                                            <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Anonymous whispers.</p>
                                        </div>
                                    </HolographicFoil>
                                </GlassCard>
                            </Link>
                        </motion.div>

                        {/* 4. Plushies (Small) */}
                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                            className="md:col-span-4 md:row-span-1"
                        >
                            <Link href="/plushies">
                                <GlassCard className="h-full p-5 flex flex-col justify-between group hover:bg-white/60 dark:hover:bg-white/5 transition-colors">
                                    <div className="flex justify-between items-start">
                                        <div className="p-2.5 bg-white/60 dark:bg-white/10 rounded-lg text-lime-500 shadow-sm border border-white/20"><Ghost size={18} /></div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-foreground mb-1">The Council</h3>
                                        <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Steal a plushie.</p>
                                    </div>
                                </GlassCard>
                            </Link>
                        </motion.div>

                    </motion.div>
                </motion.div>
            )}
        </main>
    );
}
