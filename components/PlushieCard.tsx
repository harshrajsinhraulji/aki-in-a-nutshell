"use client";

import Tilt from "react-parallax-tilt";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Sparkles, Star, Grab } from "lucide-react";
import { useBasket } from "@/components/BasketProvider";
import { motion } from "framer-motion";

interface PlushieProps {
    id: string;
    name: string;
    type: string;
    rarity: string;
}

export function PlushieCard({ id, name, type, rarity }: PlushieProps) {
    const isLegendary = rarity === "Legendary";
    const { addToBasket } = useBasket();

    const handleSteal = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation
        e.stopPropagation();
        addToBasket({ id, name });
    };

    return (
        <Tilt
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            perspective={1000}
            scale={1.01}
            className="h-full relative group"
        >
            <Link href={`/plushies/${id}`} className="block h-full">
                {/* Minimalist Card: Softer border, darker background */}
                <div className={cn(
                    "relative h-96 w-full rounded-[2rem] border overflow-hidden transition-all duration-500",
                    isLegendary
                        ? "bg-dream-900/60 border-aki-pink/20 hover:border-aki-pink/50"
                        : "bg-dream-900/40 border-white/5 hover:border-white/10"
                )}>

                    {/* Placeholder Image Overlay */}
                    <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center opacity-20 group-hover:opacity-10 transition-opacity">
                        <span className="text-9xl font-heading font-black text-black">?</span>
                    </div>

                    {/* Minimal Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dream-950 via-transparent to-transparent opacity-90" />

                    {/* Steal Button (Visible on Hover) */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleSteal}
                        className="absolute top-4 right-4 z-20 bg-white/10 hover:bg-aki-pink hover:text-dream-950 text-white p-3 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                        title="Steal this Plushie"
                    >
                        <Grab size={18} />
                    </motion.button>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                        <div className="flex justify-between items-end mb-3">
                            <h3 className="text-2xl font-heading font-bold text-white tracking-tight">{name}</h3>
                            {isLegendary && <Star size={18} fill="currentColor" className="text-aki-pink animate-pulse" />}
                        </div>

                        <div className="flex gap-2">
                            <span className="px-3 py-1 rounded-xl bg-white/5 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-luminous-400">
                                {type}
                            </span>
                            <span className={cn(
                                "px-3 py-1 rounded-xl backdrop-blur-md text-xs font-bold uppercase tracking-wider",
                                isLegendary ? "bg-aki-pink/10 text-aki-pink" : "bg-white/5 text-luminous-500"
                            )}>
                                {rarity}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </Tilt>
    );
}
