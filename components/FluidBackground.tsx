"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface FluidBackgroundProps {
    enabled?: boolean;
    intensity?: number;
    className?: string;
}

export function FluidBackground({
    enabled = true,
    intensity = 0.5,
    className = ""
}: FluidBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
    const [isMobile, setIsMobile] = useState(false);
    const animationRef = useRef<number>();

    // Check for mobile/reduced motion
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(pointer: coarse)").matches);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Mouse tracking
    useEffect(() => {
        if (isMobile || !enabled) return;

        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [isMobile, enabled]);

    // Canvas fluid simulation (simplified metaballs)
    useEffect(() => {
        if (!enabled || isMobile || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Metaball simulation
        const balls = [
            { x: 0.3, y: 0.3, vx: 0.001, vy: 0.0015, radius: 150 },
            { x: 0.7, y: 0.6, vx: -0.0012, vy: 0.001, radius: 120 },
            { x: 0.5, y: 0.8, vx: 0.0008, vy: -0.001, radius: 100 },
        ];

        const animate = () => {
            if (!ctx) return;

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update ball positions
            balls.forEach((ball) => {
                ball.x += ball.vx;
                ball.y += ball.vy;

                // Bounce off edges
                if (ball.x < 0 || ball.x > 1) ball.vx *= -1;
                if (ball.y < 0 || ball.y > 1) ball.vy *= -1;

                // Mouse influence
                const dx = mousePos.x - ball.x;
                const dy = mousePos.y - ball.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 0.3) {
                    ball.x -= dx * 0.01 * intensity;
                    ball.y -= dy * 0.01 * intensity;
                }
            });

            // Draw metaballs with gradient
            balls.forEach((ball) => {
                const gradient = ctx.createRadialGradient(
                    ball.x * canvas.width,
                    ball.y * canvas.height,
                    0,
                    ball.x * canvas.width,
                    ball.y * canvas.height,
                    ball.radius * intensity
                );
                gradient.addColorStop(0, "rgba(255, 108, 164, 0.15)");
                gradient.addColorStop(0.5, "rgba(192, 132, 252, 0.08)");
                gradient.addColorStop(1, "transparent");

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(
                    ball.x * canvas.width,
                    ball.y * canvas.height,
                    ball.radius * intensity,
                    0,
                    Math.PI * 2
                );
                ctx.fill();
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [enabled, isMobile, mousePos, intensity]);

    // Don't render on mobile or when disabled
    if (isMobile || !enabled) return null;

    return (
        <motion.canvas
            ref={canvasRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={`fixed inset-0 pointer-events-none z-0 ${className}`}
            style={{ filter: "blur(60px)" }}
        />
    );
}
