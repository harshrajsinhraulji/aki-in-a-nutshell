"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import BlurImage from "@/components/ui/BlurImage";
import { Badge } from "@/components/ui/Badge";

interface PlushieProps {
    name: string;
    image: string;
    description: string;
    adoptedDate: string;
    rarity?: "Common" | "Uncommon" | "Rare" | "Legendary";
    onInspect: () => void;
}

export default function PlushieCard({
    name,
    image,
    description,
    adoptedDate,
    rarity = "Common",
    onInspect,
}: PlushieProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring animation for tilt
    const mouseX = useSpring(x, { stiffness: 500, damping: 30 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 30 });

    // Transform mouse position to rotation
    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Calculate relative mouse position (-0.5 to 0.5)
        const mouseXRel = (e.clientX - rect.left) / width - 0.5;
        const mouseYRel = (e.clientY - rect.top) / height - 0.5;

        x.set(mouseXRel);
        y.set(mouseYRel);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    const rarityColors = {
        Common: "bg-gray-100 text-gray-600 border-gray-200",
        Uncommon: "bg-green-100 text-green-700 border-green-200",
        Rare: "bg-blue-100 text-blue-700 border-blue-200",
        Legendary: "bg-amber-100 text-amber-700 border-amber-200",
    };

    return (
        <motion.div
            ref={ref}
            style={{
                perspective: 1000,
            }}
            className="relative h-[400px] w-full cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={onInspect}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
        >
            <motion.div
                style={{
                    rotateX: isHovered ? rotateX : 0,
                    rotateY: isHovered ? rotateY : 0,
                    transformStyle: "preserve-3d",
                }}
                className="relative h-full w-full rounded-3xl bg-white shadow-xl transition-all duration-200 ease-out border border-white/50"
            >
                {/* Card Content Layer - Lifted */}
                <div
                    style={{ transform: "translateZ(20px)" }}
                    className="absolute inset-0 flex flex-col p-4"
                >
                    {/* Image Container */}
                    <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-aki-peach/30 mb-4">
                        <BlurImage
                            src={image}
                            alt={name}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute top-2 right-2">
                            <Badge variant="secondary" className={cn("border backdrop-blur-md", rarityColors[rarity])}>
                                {rarity}
                            </Badge>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between">
                        <div>
                            <h3 className="font-heading font-bold text-xl text-aki-dark truncate">{name}</h3>
                            <p className="text-xs font-mono text-aki-muted uppercase tracking-wide">
                                Adopted: {adoptedDate}
                            </p>
                        </div>

                        <p className="mt-2 text-sm text-aki-dark/80 line-clamp-2 font-body">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Shine Effect */}
                <div
                    className="absolute inset-0 z-10 rounded-3xl opacity-0 transition-opacity duration-300 pointer-events-none"
                    style={{
                        background: "linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.4) 45%, rgba(255, 255, 255, 0.2) 50%, transparent 54%)",
                        opacity: isHovered ? 1 : 0,
                        transform: "translateZ(1px)",
                    }}
                />
            </motion.div>
        </motion.div>
    );
}
