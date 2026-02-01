"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Tilt from "react-parallax-tilt";
import { useAudio } from "@/lib/audio-context";

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    hoverEffect?: boolean;
    layoutId?: string;
}

export function GlassCard({ children, className, onClick, hoverEffect = true, layoutId }: GlassCardProps) {
    const { playSfx } = useAudio();

    return (
        <Tilt
            tiltMaxAngleX={hoverEffect ? 5 : 0}
            tiltMaxAngleY={hoverEffect ? 5 : 0}
            perspective={1000}
            scale={hoverEffect ? 1.02 : 1}
            transitionSpeed={1500}
            className={cn(
                "relative overflow-hidden rounded-[2.5rem]",
                "bg-white/40 dark:bg-black/30 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-xl shadow-purple-500/5 dark:shadow-black/20", // Adaptive Glass
                "group cursor-pointer transform-gpu preserve-3d", // Performance optimizations
                className
            )}
            style={{ transformStyle: 'preserve-3d' }}
        >
            <motion.div
                layoutId={layoutId}
                onMouseEnter={() => {
                    if (hoverEffect) playSfx('/sfx/hover_glass.mp3');
                }}
                onClick={() => {
                    playSfx('/sfx/click_glass.mp3');
                    onClick?.();
                }}
                whileTap={hoverEffect ? { scale: 0.9, skewX: 5 } : {}} // Squishy jelly click
                className="h-full w-full"
            >
                {/* Glare Effect */}
                {hoverEffect && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                )}

                {/* Specular Highlight */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Inner Content */}
                <div className="relative z-10 h-full w-full" style={{ transform: "translateZ(20px)" }}>
                    {children}
                </div>
            </motion.div>
        </Tilt>
    );
}
