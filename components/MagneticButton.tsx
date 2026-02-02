"use client";

import { motion, useSpring, useMotionValue } from "framer-motion";
import { useRef, useCallback, ReactNode } from "react";

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    strength?: number;
    radius?: number;
}

export function MagneticButton({
    children,
    className = "",
    strength = 0.35,
    radius = 100
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring physics for premium feel
    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!ref.current) return;

        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;

        // Calculate distance from center
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        // Only apply magnetic effect within radius
        if (distance < radius) {
            const magneticStrength = (1 - distance / radius) * strength;
            x.set(deltaX * magneticStrength);
            y.set(deltaY * magneticStrength);
        }
    }, [x, y, strength, radius]);

    const handleMouseLeave = useCallback(() => {
        x.set(0);
        y.set(0);
    }, [x, y]);

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: xSpring, y: ySpring }}
            className={className}
            data-interactive
        >
            {children}
        </motion.div>
    );
}

// Enhanced magnetic wrapper for links with glow effect
interface MagneticLinkProps {
    children: ReactNode;
    className?: string;
    href?: string;
    glowColor?: string;
}

export function MagneticLink({
    children,
    className = "",
    glowColor = "rgba(255, 108, 164, 0.3)"
}: MagneticLinkProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const glowX = useMotionValue(50);
    const glowY = useMotionValue(50);

    const springConfig = { stiffness: 200, damping: 20, mass: 0.1 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!ref.current) return;

        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;

        x.set(deltaX * 0.2);
        y.set(deltaY * 0.2);

        // Update glow position
        glowX.set(((clientX - left) / width) * 100);
        glowY.set(((clientY - top) / height) * 100);
    }, [x, y, glowX, glowY]);

    const handleMouseLeave = useCallback(() => {
        x.set(0);
        y.set(0);
        glowX.set(50);
        glowY.set(50);
    }, [x, y, glowX, glowY]);

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                x: xSpring,
                y: ySpring,
            }}
            className={`relative ${className}`}
            whileHover={{
                filter: `drop-shadow(0 0 8px ${glowColor})`,
            }}
            data-interactive
        >
            {children}
        </motion.div>
    );
}
