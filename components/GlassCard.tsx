"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import Tilt from "react-parallax-tilt";
import { useAudio } from "@/lib/audio-context";
import { useState, useCallback } from "react";

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    hoverEffect?: boolean;
    layoutId?: string;
    hapticIntensity?: "light" | "medium" | "strong";
}

export function GlassCard({
    children,
    className,
    onClick,
    hoverEffect = true,
    layoutId,
    hapticIntensity = "medium"
}: GlassCardProps) {
    const { playSfx } = useAudio();
    const [isPressed, setIsPressed] = useState(false);

    // Haptic spring configs based on intensity
    const hapticConfigs = {
        light: { mass: 0.2, stiffness: 400, damping: 20 },
        medium: { mass: 0.4, stiffness: 500, damping: 15 },
        strong: { mass: 0.6, stiffness: 600, damping: 12 },
    };

    const scale = useSpring(1, hapticConfigs[hapticIntensity]);
    const blur = useSpring(0, { stiffness: 300, damping: 30 });

    const handleTapStart = useCallback(() => {
        setIsPressed(true);
        scale.set(0.97);
        blur.set(2);
    }, [scale, blur]);

    const handleTapEnd = useCallback(() => {
        setIsPressed(false);
        scale.set(1.02); // Overshoot for "bounce" effect
        blur.set(0);

        // Return to normal after bounce
        setTimeout(() => scale.set(1), 100);
    }, [scale, blur]);

    const handleClick = useCallback(() => {
        playSfx('/sfx/click_glass.mp3');
        onClick?.();
    }, [playSfx, onClick]);

    // Transform blur value to filter string
    const blurFilter = useTransform(blur, (v) => `blur(${v}px)`);

    return (
        <Tilt
            tiltMaxAngleX={hoverEffect ? 5 : 0}
            tiltMaxAngleY={hoverEffect ? 5 : 0}
            perspective={1000}
            scale={hoverEffect ? 1.02 : 1}
            transitionSpeed={1500}
            className={cn(
                "relative overflow-hidden rounded-[2.5rem]",
                // Enhanced glassmorphism with saturation
                "bg-white/40 dark:bg-black/30",
                "backdrop-blur-xl backdrop-saturate-150",
                "border border-white/60 dark:border-white/10",
                "shadow-xl shadow-purple-500/5 dark:shadow-black/20",
                "group cursor-pointer transform-gpu preserve-3d",
                className
            )}
            style={{ transformStyle: 'preserve-3d' }}
        >
            <motion.div
                layoutId={layoutId}
                onMouseEnter={() => {
                    if (hoverEffect) playSfx('/sfx/hover_glass.mp3');
                }}
                onTapStart={handleTapStart}
                onTap={handleClick}
                onTapCancel={handleTapEnd}
                onMouseUp={handleTapEnd}
                onMouseLeave={handleTapEnd}
                style={{
                    scale,
                    filter: blurFilter,
                }}
                className="h-full w-full"
            >
                {/* Refraction distortion layer */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{
                        scale: isPressed ? 0.995 : 1.005,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                />

                {/* Glare Effect - Enhanced */}
                {hoverEffect && (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        initial={{ x: "-100%", y: "-100%" }}
                        whileHover={{ x: "100%", y: "100%" }}
                        transition={{ duration: 0.8 }}
                    />
                )}

                {/* Specular Highlight - Animated */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    animate={{
                        opacity: isPressed ? 0.3 : [0.5, 0.7, 0.5],
                    }}
                    transition={{
                        opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                />

                {/* Press ripple effect */}
                {isPressed && (
                    <motion.div
                        className="absolute inset-0 bg-aki-pink/10 pointer-events-none"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                    />
                )}

                {/* Inner Content with 3D depth */}
                <div
                    className="relative z-10 h-full w-full"
                    style={{ transform: "translateZ(20px)" }}
                >
                    {children}
                </div>
            </motion.div>
        </Tilt>
    );
}
