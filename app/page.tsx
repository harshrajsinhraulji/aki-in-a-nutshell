"use client";

import { KineticTextHero } from "@/components/KineticTextHero";
import { GlassCard } from "@/components/GlassCard";
import IntroSequence from "@/components/IntroSequence";
import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Music, BookOpen, Ghost, Sparkles, Play, Pause, SkipForward, SkipBack, ChevronLeft, ChevronRight } from "lucide-react";
import { Vinyl } from "@/components/Vinyl";
import { AudioVisualizer } from "@/components/AudioVisualizer";
import { HolographicFoil } from "@/components/HolographicFoil";
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { useAudio } from "@/lib/audio-context";
import { Slider } from "@/components/ui/Slider";
import { cn } from "@/lib/utils";

// Helper to format s -> mm:ss
function formatTime(seconds: number) {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// Mobile card data for swipe carousel
const MOBILE_CARDS = [
    { href: "/stories", title: "Stories", subtitle: "Fragments of life", icon: BookOpen, color: "from-aki-pink to-rose-400" },
    { href: "/music", title: "Mixtape", subtitle: "Curated vibes", icon: Music, color: "from-purple-500 to-violet-400" },
    { href: "/confessions", title: "Confess", subtitle: "Anonymous whispers", icon: Sparkles, color: "from-orange-400 to-amber-400" },
    { href: "/plushies", title: "Plushies", subtitle: "The council", icon: Ghost, color: "from-lime-400 to-green-400" },
];

// Mobile swipe carousel component
function MobileCardCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);
    const x = useMotionValue(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const threshold = 50;
        if (info.offset.x > threshold && activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
        } else if (info.offset.x < -threshold && activeIndex < MOBILE_CARDS.length - 1) {
            setActiveIndex(activeIndex + 1);
        }
    };

    return (
        <div className="relative md:hidden">
            {/* Carousel */}
            <motion.div
                ref={containerRef}
                className="overflow-hidden"
            >
                <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
                    animate={{ x: -activeIndex * 100 + "%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="flex"
                    style={{ x }}
                >
                    {MOBILE_CARDS.map((card, index) => (
                        <motion.div
                            key={card.href}
                            className="w-full flex-shrink-0 px-4"
                            animate={{
                                scale: index === activeIndex ? 1 : 0.9,
                                opacity: index === activeIndex ? 1 : 0.5,
                            }}
                        >
                            <Link href={card.href}>
                                <div className={cn(
                                    "relative h-48 rounded-3xl p-6 flex flex-col justify-between",
                                    "bg-gradient-to-br", card.color,
                                    "shadow-xl shadow-black/20",
                                    "active:scale-95 transition-transform"
                                )}>
                                    <card.icon className="w-8 h-8 text-white/90" />
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">{card.title}</h3>
                                        <p className="text-sm text-white/70">{card.subtitle}</p>
                                    </div>
                                    <ArrowUpRight className="absolute top-6 right-6 w-5 h-5 text-white/50" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Pagination dots */}
            <div className="flex justify-center gap-2 mt-4">
                {MOBILE_CARDS.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={cn(
                            "w-2 h-2 rounded-full transition-all",
                            index === activeIndex
                                ? "bg-aki-pink w-6"
                                : "bg-muted-foreground/30"
                        )}
                    />
                ))}
            </div>

            {/* Swipe hint */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center text-xs text-muted-foreground/50 mt-3"
            >
                ← swipe to explore →
            </motion.p>
        </div>
    );
}

// Mobile music player (simplified)
function MobileMusicPlayer() {
    const { currentTrack, isPlaying, togglePlay, nextTrack, prevTrack } = useAudio();

    return (
        <div className="md:hidden fixed bottom-4 left-4 right-4 z-40">
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="bg-background/90 backdrop-blur-xl rounded-2xl p-4 shadow-2xl shadow-black/30 border border-white/10"
            >
                <div className="flex items-center gap-3">
                    {/* Mini vinyl */}
                    <motion.div
                        animate={{ rotate: isPlaying ? 360 : 0 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex-shrink-0 flex items-center justify-center"
                    >
                        <div className="w-4 h-4 rounded-full bg-aki-pink" />
                    </motion.div>

                    {/* Track info */}
                    <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{currentTrack?.title || "Aki's Mixtape"}</p>
                        <p className="text-xs text-muted-foreground truncate">{currentTrack?.artist || "Select a track"}</p>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-1">
                        <button onClick={prevTrack} className="p-2 text-muted-foreground">
                            <SkipBack size={18} />
                        </button>
                        <button
                            onClick={togglePlay}
                            className="w-10 h-10 rounded-full bg-aki-pink flex items-center justify-center text-white"
                        >
                            {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                        </button>
                        <button onClick={nextTrack} className="p-2 text-muted-foreground">
                            <SkipForward size={18} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function Home() {
    const [introComplete, setIntroComplete] = useState(false);
    const {
        currentTrack,
        isPlaying,
        togglePlay,
        nextTrack,
        prevTrack,
        duration,
        currentTime,
        seek
    } = useAudio();

    return (
        <main className="min-h-screen relative flex flex-col items-center p-4 md:p-8 selection:bg-aki-pink selection:text-white pb-24 md:pb-8">

            {/* 1. Intro Sequence */}
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

            {/* 2. Main Content */}
            {introComplete && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                    className="relative z-10 w-full max-w-6xl mt-8 md:mt-12"
                >

                    {/* HERO */}
                    <div className="min-h-[40vh] md:min-h-[50vh] flex items-center justify-center mb-8 md:mb-12">
                        <KineticTextHero />
                    </div>

                    {/* MOBILE: Swipe Carousel */}
                    <MobileCardCarousel />

                    {/* DESKTOP: Bento Grid */}
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                            }
                        }}
                        className="hidden md:grid grid-cols-12 gap-4 auto-rows-[180px]"
                    >

                        {/* 1. Stories (Large, Vertical) */}
                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                            className="col-span-4 row-span-2"
                        >
                            <Link href="/stories">
                                <GlassCard className="h-full p-6 flex flex-col justify-between group transition-all duration-500 hover:shadow-2xl hover:shadow-aki-pink/20 hover:-translate-y-1">
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-aki-pink/5 to-aki-pink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    <div className="relative z-10">
                                        <div className="w-10 h-10 rounded-xl bg-white/60 dark:bg-white/10 flex items-center justify-center mb-4 text-aki-pink backdrop-blur-md shadow-sm border border-white/20 group-hover:scale-110 transition-transform duration-500">
                                            <BookOpen size={20} />
                                        </div>
                                        <h2 className="text-3xl font-heading font-bold text-foreground mb-2 transition-colors">Stories.</h2>
                                        <p className="text-sm text-muted-foreground font-light leading-relaxed group-hover:text-foreground/80 transition-colors">Fragments of a life lived online.</p>
                                    </div>
                                    <div className="relative z-10 flex justify-between items-center border-t border-border pt-4 mt-2 group-hover:border-aki-pink/30 transition-colors">
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground group-hover:text-aki-pink transition-colors">Read Now</span>
                                        <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-aki-pink transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </div>
                                </GlassCard>
                            </Link>
                        </motion.div>

                        {/* 2. Mixtape (Wide) */}
                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                            className="col-span-8 row-span-1"
                        >
                            <GlassCard layoutId="mixtape-card" className="h-full relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-aki-purple/10 group">
                                <div className="flex flex-col h-full w-full relative z-20 p-5">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-2">
                                            {isPlaying && <AudioVisualizer className="w-12 h-3 opacity-70" />}
                                            <span className="text-[9px] font-bold uppercase tracking-widest text-aki-purple/80">
                                                {isPlaying ? "Now Playing" : "Paused"}
                                            </span>
                                        </div>
                                        <Link href="/music" className="text-[9px] font-medium text-muted-foreground hover:text-aki-purple transition-colors">
                                            PLAYLIST →
                                        </Link>
                                    </div>

                                    <div className="mb-3 pr-24">
                                        <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground truncate leading-tight">
                                            {currentTrack?.title || "Aki's Mixtape"}
                                        </h2>
                                        <p className="text-sm text-muted-foreground truncate font-light">
                                            {currentTrack?.artist || "Curated vibes"}
                                        </p>
                                    </div>

                                    <div className="mt-auto w-full max-w-[70%] space-y-2">
                                        {currentTrack && (
                                            <div className="flex items-center gap-2 w-full">
                                                <span className="text-[10px] font-mono text-muted-foreground w-6 text-right">
                                                    {formatTime(currentTime)}
                                                </span>
                                                <div className="flex-1 group/slider">
                                                    <Slider
                                                        value={currentTime}
                                                        max={duration || 100}
                                                        onChange={(e) => seek(Number(e.target.value))}
                                                        className="h-1 transition-all group-hover/slider:h-1.5"
                                                    />
                                                </div>
                                                <span className="text-[10px] font-mono text-muted-foreground w-6">
                                                    {formatTime(duration)}
                                                </span>
                                            </div>
                                        )}

                                        <div className="flex items-center gap-3">
                                            <button onClick={prevTrack} className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-foreground/70 hover:text-foreground">
                                                <SkipBack size={16} fill="currentColor" className="opacity-50" />
                                            </button>
                                            <button
                                                onClick={togglePlay}
                                                className="w-8 h-8 flex items-center justify-center rounded-full bg-foreground text-background shadow-md hover:scale-105 active:scale-95 transition-all"
                                            >
                                                {isPlaying ? (
                                                    <Pause size={14} fill="currentColor" />
                                                ) : (
                                                    <Play size={14} fill="currentColor" className="ml-0.5" />
                                                )}
                                            </button>
                                            <button onClick={nextTrack} className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-foreground/70 hover:text-foreground">
                                                <SkipForward size={16} fill="currentColor" className="opacity-50" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute -right-6 -bottom-6 md:-right-8 md:-bottom-8 z-10 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-12">
                                    <Vinyl className="w-32 h-32 md:w-40 md:h-40 shadow-2xl opacity-90" />
                                </div>
                            </GlassCard>
                        </motion.div>

                        {/* 3. Confessions */}
                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                            className="col-span-4 row-span-1"
                        >
                            <Link href="/confessions">
                                <GlassCard className="h-full p-0 overflow-hidden flex flex-col justify-between group hover:bg-white/60 dark:hover:bg-white/5 transition-colors">
                                    <HolographicFoil className="h-full w-full p-5 flex flex-col justify-between border-0 bg-transparent group/confess">
                                        <div className="flex justify-between items-start relative z-10">
                                            <div className="p-2.5 bg-white/60 dark:bg-white/10 rounded-lg text-aki-purple shadow-sm border border-white/20 group-hover/confess:rotate-12 transition-transform duration-300"><Sparkles size={18} /></div>
                                            <span className="text-[9px] font-bold bg-aki-pink text-white px-1.5 py-0.5 rounded-md shadow-lg shadow-aki-pink/30 animate-pulse">NEW</span>
                                        </div>
                                        <div className="relative z-10">
                                            <h3 className="text-lg font-bold text-foreground mb-1 group-hover/confess:text-aki-purple transition-colors">Confess</h3>
                                            <p className="text-xs text-muted-foreground group-hover/confess:text-foreground/80 transition-colors">Anonymous whispers.</p>
                                        </div>
                                    </HolographicFoil>
                                </GlassCard>
                            </Link>
                        </motion.div>

                        {/* 4. Plushies */}
                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                            className="col-span-4 row-span-1"
                        >
                            <Link href="/plushies">
                                <GlassCard className="h-full p-5 flex flex-col justify-between group hover:bg-white/60 dark:hover:bg-white/5 transition-colors">
                                    <div className="flex justify-between items-start">
                                        <div className="p-2.5 bg-white/60 dark:bg-white/10 rounded-lg text-lime-500 shadow-sm border border-white/20 group-hover:-translate-y-1 group-hover:rotate-12 transition-transform duration-300"><Ghost size={18} /></div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-lime-500 transition-colors">The Council</h3>
                                        <p className="text-xs text-muted-foreground group-hover:text-foreground/80 transition-colors">Steal a plushie.</p>
                                    </div>
                                </GlassCard>
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}

            {/* Mobile Music Player */}
            {introComplete && <MobileMusicPlayer />}
        </main>
    );
}
