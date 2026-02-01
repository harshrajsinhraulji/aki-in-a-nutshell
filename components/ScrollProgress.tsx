"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [hue, setHue] = useState(0);

    // Rotate hue based on scroll
    useEffect(() => {
        return scrollYProgress.on("change", (latest) => {
            setHue(latest * 360);
        });
    }, [scrollYProgress]);

    return (
        <div className="fixed top-0 left-0 right-0 h-1.5 z-[100] origin-left bg-white/10">
            <motion.div
                className="h-full bg-gradient-to-r from-aki-pink to-aki-purple origin-left"
                style={{ scaleX }}
            />

            {/* The Runner (Plushie) */}
            <motion.div
                className="absolute top-1/2 -translate-y-1/2 -ml-3 w-8 h-8 pointer-events-none"
                style={{
                    left: "0%", // We can't easily map scaleX to left % without transforming motion value
                    // Actually, we can just use the same scaleX if we assume the bar width is 100%
                    // But scaling a div (bar) is different from positioning a runner.
                    // Let's use left: scrollYProgress * 100%? 
                    // motion values need to be mapped.
                    // A simpler way: The runner is a child of a div that has width = scrollYProgress?
                }}
            >
                {/* 
                  Better approach: 
                  Render runner outside the bar, position it with `left: scrollYProgress`.
               */}
            </motion.div>
        </div>
    );
}

// Rewriting for proper runner positioning
export function ScrollProgressWithRunner() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    // We map 0-1 to 0%-100% string for left position
    // Framer motion style props accept motion values directly for 'scale', 'opacity', etc.
    // For 'left', we might need a transform or useMotionTemplate but useSpring returns a number.
    // Actually, create a transform manually? No, simpler to just wrap the runner in a container that scales?
    // NO, if container scales, runner squishes.

    return (
        <>
            {/* Background Track */}
            <div className="fixed top-0 left-0 right-0 h-1 z-[9999] bg-white/5 backdrop-blur-[1px]" />

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 z-[10000] bg-gradient-to-r from-aki-pink via-aki-purple to-aki-highlight origin-left"
                style={{ scaleX }}
            />

            {/* Runner Container - We move this whole container? Or just use a fixed div and move the inner? */}
            {/* Let's try a different trick: A container that is 0 width? No. */}
            {/* Let's using basic style transform for the runner? 
                Actually, scrollYProgress is 0-1. 
                We can use a motion value transform.
            */}
        </>
    );
}
