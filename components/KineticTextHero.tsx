"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { LiveAgeCounter } from "./LiveAgeCounter";

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

    // Preload images to prevent flickering
    useEffect(() => {
        PROFILE_IMAGES.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    // Cycle images on hover
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (hovered) {
            interval = setInterval(() => {
                setCurrentImage((prev) => (prev + 1) % PROFILE_IMAGES.length);
            }, 150); // Slightly slower for better visibility
        }
        return () => clearInterval(interval);
    }, [hovered]);

    return (
        <section className="relative flex flex-col items-center justify-center min-h-[45vh] w-full py-12 md:py-20">
            {/* The Text Container */}
            <motion.div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="relative cursor-pointer group flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Main Hero Text
                    - Added Tracking for the space between chars
                    - Added explicit space between I'M and AKI
                */}
                <h1
                    className="text-[13vw] md:text-[11vw] leading-[0.9] font-black tracking-tight select-none transition-all duration-300"
                    style={{
                        // Fallback color + Gradient
                        color: hovered ? "transparent" : "transparent",
                        backgroundImage: hovered
                            ? `url(${PROFILE_IMAGES[currentImage]})`
                            : "linear-gradient(135deg, #FF6B9D 0%, #C084FC 50%, #F9A8D4 100%)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        // Ensure text stroke or shadow doesn't interfere
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    I&rsquo;M &nbsp; AKI.
                </h1>

                {/* Live Age Counter - Scaled Up as requested */}
                <div className="mt-6 md:mt-8 transform scale-110 md:scale-125 origin-top transition-transform duration-300">
                    <LiveAgeCounter />
                </div>
            </motion.div>
        </section>
    );
}
