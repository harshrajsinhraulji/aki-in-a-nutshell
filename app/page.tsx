"use client";

import { BentoGrid, BentoGridItem } from "@/components/BentoGrid";
import Hero3D from "@/components/Hero3D";
import { motion } from "framer-motion";
import { Ghost, Heart, MessageCircle, Music, Star, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="min-h-screen pt-12 pb-24">
            {/* Intro Overlay Text - Fades out or stays as header? Let's make it a header for the grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto px-6 mb-12 text-center md:text-left"
            >
                <h1 className="text-5xl md:text-7xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-stardust-50 via-stardust-200 to-stardust-500 pb-2">
                    Nocturnal <span className="text-neon-purple italic">Dreamscape</span>
                </h1>
                <p className="text-stardust-400 mt-4 text-lg max-w-lg">
                    Welcome to my digital bedroom. Please take your shoes off.
                    <span className="inline-block animate-pulse ml-2 text-neon-cyan">Currently 3:00 AM here.</span>
                </p>
            </motion.div>

            <BentoGrid className="max-w-7xl mx-auto">
                {/* Main Hero Tile - Spans 2 cols */}
                <BentoGridItem
                    className="md:col-span-2 md:row-span-2 min-h-[400px]"
                    title={<span className="text-2xl">The Plushie Keeper</span>}
                    description="Drag to rotate. He doesn't bite, usually."
                    header={<Hero3D />} // Reusing existing 3D component
                    icon={<Ghost className="h-6 w-6 text-neon-pink" />}
                />

                {/* Quick Link: Stories */}
                <Link href="/stories" className="contents">
                    <BentoGridItem
                        title="Late Night Thoughts"
                        description="Confessions written by light of the monitor."
                        header={<div className="flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-violet-900/50 to-fuchsia-900/50 animate-pulse-slow" />}
                        icon={<MessageCircle className="h-6 w-6 text-neon-cyan" />}
                        className="cursor-pointer border-neon-cyan/20 hover:border-neon-cyan/50"
                    />
                </Link>

                {/* Quick Link: Plushies */}
                <Link href="/plushies" className="contents">
                    <BentoGridItem
                        title="Plushie Gallery"
                        description="Reviewing my collection (142 and counting)."
                        header={<div className="flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-pink-900/50 to-rose-900/50" />}
                        icon={<Heart className="h-6 w-6 text-neon-pink" />}
                        className="cursor-pointer border-neon-pink/20 hover:border-neon-pink/50"
                    />
                </Link>

                {/* Music Status */}
                <BentoGridItem
                    className="md:col-span-1"
                    title="Now Playing"
                    description="Lo-Fi Beats to Code/Cry To"
                    header={
                        <div className="flex items-center justify-center flex-1 w-full h-full rounded-xl bg-midnight-800/50">
                            <div className="flex gap-1 items-end h-8">
                                <motion.div animate={{ height: [10, 32, 10] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 bg-neon-purple rounded-full" />
                                <motion.div animate={{ height: [16, 8, 24] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-1 bg-neon-pink rounded-full" />
                                <motion.div animate={{ height: [8, 20, 12] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-neon-cyan rounded-full" />
                            </div>
                        </div>
                    }
                    icon={<Music className="h-6 w-6 text-stardust-50" />}
                />

                {/* Stat / Filler */}
                <BentoGridItem
                    title="System Status"
                    description="All systems nominal. Caffeine levels: 12%."
                    header={<div className="flex-1 w-full h-full rounded-xl border border-dashed border-white/10" />}
                    icon={<Zap className="h-6 w-6 text-yellow-400" />}
                />
            </BentoGrid>
        </div>
    );
}
