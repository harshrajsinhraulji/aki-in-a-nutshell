"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import BlurImage from "@/components/ui/BlurImage";
import { Sparkles } from "lucide-react";

// Mock Data (Reused)
const PLUSHIES = [
    {
        id: 1,
        name: "Sir Fluffington",
        image: "https://images.unsplash.com/photo-1559479059-8503164a275e?w=800&q=80",
        type: "Bear", rarity: "Legendary"
    },
    {
        id: 2,
        name: "Mochi",
        image: "https://images.unsplash.com/photo-1572535787682-1279a1d48c8b?w=800&q=80",
        type: "Bunny", rarity: "Common"
    },
    {
        id: 3,
        name: "Dr. Octopus",
        image: "https://images.unsplash.com/photo-1570724036728-660c6f14066f?w=800&q=80",
        type: "Aquatic", rarity: "Rare"
    },
    {
        id: 4,
        name: "Cloudy",
        image: "https://images.unsplash.com/photo-1555541570-5b6510a76cf3?w=800&q=80",
        type: "Cloud", rarity: "Uncommon"
    },
];

export default function PlushiesPage() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="max-w-7xl mx-auto px-6 h-[80vh] flex flex-col justify-center">
            <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-stardust-50 mb-2">
                    Plushie <span className="text-neon-pink">Deck</span>
                </h1>
                <p className="text-stardust-400 font-mono text-sm uppercase tracking-widest">
                    Collection Status: <span className="text-neon-cyan">Obsessive</span>
                </p>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-12 snap-x snap-mandatory perspective-1000 items-center min-h-[500px]">
                {PLUSHIES.map((plushie, index) => (
                    <motion.div
                        key={plushie.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative flex-none w-[300px] h-[450px] snap-center"
                        style={{ perspective: 1000 }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <motion.div
                            className="w-full h-full rounded-3xl bg-midnight-800 border-2 border-white/5 overflow-hidden shadow-2xl relative"
                            whileHover={{ rotateY: 10, scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            {/* Image */}
                            <div className="absolute inset-0">
                                <BlurImage src={plushie.image} alt={plushie.name} fill className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-transparent to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <div className="flex justify-between items-end mb-2">
                                    <h3 className="font-heading font-bold text-2xl text-white">{plushie.name}</h3>
                                    <Sparkles className={cn("h-5 w-5",
                                        plushie.rarity === "Legendary" ? "text-yellow-400" : "text-stardust-600"
                                    )} />
                                </div>
                                <div className="flex gap-2">
                                    <span className="px-2 py-1 rounded bg-white/10 backdrop-blur-md text-xs font-mono text-stardust-300 border border-white/10 uppercase">{plushie.type}</span>
                                    <span className="px-2 py-1 rounded bg-white/10 backdrop-blur-md text-xs font-mono text-stardust-300 border border-white/10 uppercase">{plushie.rarity}</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
