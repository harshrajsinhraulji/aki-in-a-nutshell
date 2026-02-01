"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [trails, setTrails] = useState<{ x: number, y: number, id: number }[]>([]);
    const requestRef = useRef<number>();

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            // Add particle
            if (Math.random() > 0.5) { // Throttled particles
                setTrails(prev => [...prev.slice(-15), { x: e.clientX, y: e.clientY, id: Date.now() }]);
            }
        };

        window.addEventListener("mousemove", updateMousePosition);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
        };
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
            {/* Main Cursor */}
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 bg-aki-pink rounded-full mix-blend-screen shadow-[0_0_10px_#FF9ECE]"
                style={{ x: cursorXSpring, y: cursorYSpring, translateX: "-50%", translateY: "-50%" }}
            />

            {/* Outer Ring */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-aki-purple/50 rounded-full mix-blend-screen opacity-50"
                animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
            />

            {/* Stardust Trails */}
            {trails.map((trail) => (
                <motion.div
                    key={trail.id}
                    initial={{ opacity: 0.8, scale: 1 }}
                    animate={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.8 }}
                    className="fixed w-1 h-1 bg-white rounded-full"
                    style={{ left: trail.x, top: trail.y }}
                />
            ))}
        </div>
    );
}
