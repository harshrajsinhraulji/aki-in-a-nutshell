"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { LiveAgeCounter } from "./LiveAgeCounter";

// Aki's intro images - cycling on hover
// Aki's intro images - cycling on hover
const PROFILE_IMAGES = [
    "/images/aki/img1.png",
    "/images/aki/img2.jpg",
    "/images/aki/img3.jpg",
    "/images/aki/img4.png",
    "/images/aki/img5.jpg",
    "/images/aki/img6.png",
    "/images/aki/img7.png",
    "/images/aki/img8.png",
    "/images/aki/img9.png"
];

export function KineticTextHero() {
    const [hovered, setHovered] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);

    // Flash images on hover
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (hovered) {
            interval = setInterval(() => {
                setCurrentImage((prev) => (prev + 1) % PROFILE_IMAGES.length);
            }, 120);
        }
        return () => clearInterval(interval);
    }, [hovered]);

    return (
        <section className="relative flex flex-col items-center justify-center min-h-[40vh] w-full py-8 md:py-12">
            {/* The Text Container */}
            <motion.div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="relative cursor-pointer group flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Main Hero Text - Always visible with gradient, shows images on hover */}
                <h1
                    className="text-[15vw] md:text-[12vw] leading-[0.9] font-black tracking-tight text-transparent bg-clip-text bg-center bg-cover select-none transition-all duration-150"
                    style={{
                        backgroundImage: hovered
                            ? `url(${PROFILE_IMAGES[currentImage]})`
                            : "linear-gradient(135deg, #FF6B9D 0%, #C084FC 50%, #F9A8D4 100%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                    }}
                >
                    I&apos;M AKI.
                </h1>

                {/* Live Age Counter - Proportional sizing */}
                <LiveAgeCounter />
            </motion.div>
        </section>
    );
}
