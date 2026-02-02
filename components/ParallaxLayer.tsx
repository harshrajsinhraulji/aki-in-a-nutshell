"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ParallaxLayerProps {
    children: ReactNode;
    speed?: number; // 0 = static, 0.5 = half speed, 1 = full scroll speed, -0.5 = reverse
    className?: string;
    offset?: number; // Initial offset in pixels
}

export function ParallaxLayer({
    children,
    speed = 0.5,
    className = "",
    offset = 0
}: ParallaxLayerProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll();

    // Transform scroll progress to Y position
    const y = useTransform(
        scrollYProgress,
        [0, 1],
        [offset, offset - (speed * 500)] // Adjust range based on speed
    );

    return (
        <motion.div
            ref={ref}
            style={{ y }}
            className={`will-change-transform ${className}`}
        >
            {children}
        </motion.div>
    );
}

// Container for organizing multiple parallax layers
interface ParallaxContainerProps {
    children: ReactNode;
    className?: string;
}

export function ParallaxContainer({ children, className = "" }: ParallaxContainerProps) {
    return (
        <div className={`relative overflow-hidden ${className}`}>
            {children}
        </div>
    );
}

// Decorative parallax elements
export function ParallaxDecorations() {
    return (
        <ParallaxContainer className="fixed inset-0 pointer-events-none z-0">
            {/* Far background - slowest */}
            <ParallaxLayer speed={0.1} className="absolute inset-0">
                <div className="absolute top-[20%] right-[10%] w-96 h-96 rounded-full bg-gradient-to-br from-aki-pink/5 to-transparent blur-3xl" />
                <div className="absolute bottom-[30%] left-[5%] w-80 h-80 rounded-full bg-gradient-to-tr from-aki-purple/5 to-transparent blur-3xl" />
            </ParallaxLayer>

            {/* Mid background */}
            <ParallaxLayer speed={0.3} className="absolute inset-0">
                <div className="absolute top-[40%] left-[30%] w-64 h-64 rounded-full bg-gradient-radial from-aki-highlight/10 to-transparent blur-2xl" />
            </ParallaxLayer>

            {/* Near background - faster */}
            <ParallaxLayer speed={0.6} className="absolute inset-0">
                <div className="absolute top-[60%] right-[20%] w-40 h-40 rounded-full bg-aki-pink/10 blur-2xl" />
                <div className="absolute top-[10%] left-[60%] w-32 h-32 rounded-full bg-aki-purple/10 blur-xl" />
            </ParallaxLayer>
        </ParallaxContainer>
    );
}
