"use client";

import { motion } from "framer-motion";
import { useAudio } from "@/lib/audio-context";
import { Disc } from "lucide-react";

export function Vinyl({ className }: { className?: string }) {
    const { isPlaying, togglePlay } = useAudio();

    return (
        <motion.div
            className={`relative cursor-pointer group ${className}`}
            onClick={togglePlay}
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{
                repeat: isPlaying ? Infinity : 0,
                duration: 3,
                ease: "linear"
            }}
        >
            <div className="relative z-10 w-full h-full rounded-full bg-black/90 flex items-center justify-center border-4 border-black/40 shadow-xl">
                {/* Grooves */}
                <div className="absolute inset-2 rounded-full border border-white/5 opacity-50" />
                <div className="absolute inset-4 rounded-full border border-white/5 opacity-50" />
                <div className="absolute inset-6 rounded-full border border-white/5 opacity-50" />

                {/* Label */}
                <div className="w-1/3 h-1/3 rounded-full bg-aki-pink/80 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-black" />
                </div>
            </div>

            {/* Tone Arm (Stylized representation or just play icon overlay on hover) */}
            {!isPlaying && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/20 rounded-full backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity">
                    <Disc className="text-white w-8 h-8" />
                </div>
            )}
        </motion.div>
    );
}
