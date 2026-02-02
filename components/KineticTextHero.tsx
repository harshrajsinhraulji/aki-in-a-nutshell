"use client";

import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";
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

// Split text into characters with proper handling
interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
    gradientStyle?: React.CSSProperties;
}

function SplitText({ text, className, delay = 0, gradientStyle }: SplitTextProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    const characters = useMemo(() => {
        return text.split("").map((char, i) => ({
            char: char === " " ? "\u00A0" : char, // Non-breaking space
            key: `${char}-${i}`,
        }));
    }, [text]);

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.03,
                delayChildren: delay,
            },
        },
    };

    const charVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            rotateX: -90,
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                type: "spring",
                stiffness: 150,
                damping: 20,
            },
        },
    };

    return (
        <motion.span
            ref={ref}
            className={className}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ display: "inline-flex", perspective: "1000px" }}
        >
            {characters.map(({ char, key }) => (
                <motion.span
                    key={key}
                    variants={charVariants}
                    style={{
                        display: "inline-block",
                        transformOrigin: "bottom center",
                        ...gradientStyle,
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
}

// Reveal mask animation for subtitle
function RevealText({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <div ref={ref} className="overflow-hidden">
            <motion.div
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : { y: "100%" }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay,
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}

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
            }, 150);
        }
        return () => clearInterval(interval);
    }, [hovered]);

    // Gradient style to apply to each character
    const gradientStyle: React.CSSProperties = {
        color: "transparent",
        backgroundImage: hovered
            ? `url("${PROFILE_IMAGES[currentImage]}")`
            : "linear-gradient(135deg, #FF6B9D 0%, #C084FC 50%, #F9A8D4 100%)",
        backgroundSize: hovered ? "cover" : "200% 200%",
        backgroundPosition: "center",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        transition: "background-image 0.3s ease",
    };

    return (
        <section className="relative flex flex-col items-center justify-center min-h-[45vh] w-full py-12 md:py-20">
            {/* The Text Container */}
            <motion.div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="relative cursor-pointer group flex flex-col items-center text-center"
                data-cursor="button"
                data-cursor-label=""
            >
                {/* Main Hero Text with Staggered Reveal */}
                <h1
                    className="text-[13vw] md:text-[11vw] leading-[0.9] font-black tracking-tight select-none"
                >
                    <SplitText text="I'M" delay={0} gradientStyle={gradientStyle} />
                    <span className="inline-block w-[0.3em]" />
                    <SplitText text="AKI." delay={0.15} gradientStyle={gradientStyle} />
                </h1>

                {/* Subtitle with Reveal Animation */}
                <div className="mt-4 md:mt-6">
                    <RevealText delay={0.6}>
                        <p className="text-sm md:text-base text-muted-foreground font-light tracking-wide">
                            plushies, confessions & travel scars
                        </p>
                    </RevealText>
                </div>

                {/* Live Age Counter - Scaled Up */}
                <motion.div
                    className="mt-6 md:mt-8 transform scale-110 md:scale-125 origin-top"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <LiveAgeCounter />
                </motion.div>

                {/* Hover indicator */}
                <motion.div
                    className="mt-8 flex items-center gap-2 text-xs text-muted-foreground/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hovered ? 0 : 1 }}
                    transition={{ delay: 1.2 }}
                >
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-aki-pink/50"
                    />
                    <span>hover me</span>
                </motion.div>
            </motion.div>
        </section>
    );
}
