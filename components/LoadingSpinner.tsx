"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type LoadingVariant = "default" | "vinyl" | "plushie" | "candle" | "dots";

interface LoadingSpinnerProps {
    variant?: LoadingVariant;
    size?: "sm" | "md" | "lg";
    className?: string;
    text?: string;
}

const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
};

// Vinyl spinning animation for music
function VinylLoader({ size, className }: { size: string; className?: string }) {
    return (
        <motion.div
            className={cn(size, "relative", className)}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
            {/* Vinyl disc */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 border-4 border-gray-700">
                {/* Grooves */}
                <div className="absolute inset-2 rounded-full border border-gray-600/30" />
                <div className="absolute inset-4 rounded-full border border-gray-600/20" />
                {/* Center label */}
                <div className="absolute inset-0 m-auto w-1/3 h-1/3 rounded-full bg-gradient-to-br from-aki-pink to-aki-purple" />
                {/* Center hole */}
                <div className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-gray-900" />
            </div>
        </motion.div>
    );
}

// Bouncing plushie animation
function PlushieLoader({ size, className }: { size: string; className?: string }) {
    return (
        <motion.div
            className={cn(size, "text-4xl flex items-center justify-center", className)}
            animate={{
                y: [0, -15, 0],
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            🧸
        </motion.div>
    );
}

// Flickering candle for confessions
function CandleLoader({ size, className }: { size: string; className?: string }) {
    return (
        <div className={cn(size, "relative flex items-end justify-center", className)}>
            {/* Candle body */}
            <div className="w-3 h-8 bg-gradient-to-b from-amber-100 to-amber-200 rounded-t-sm" />
            {/* Flame */}
            <motion.div
                className="absolute -top-4 w-3"
                animate={{
                    scaleY: [1, 1.3, 0.9, 1.1, 1],
                    scaleX: [1, 0.9, 1.1, 0.95, 1],
                }}
                transition={{ duration: 0.3, repeat: Infinity }}
            >
                <div className="w-3 h-5 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full blur-[1px]" />
                <div className="absolute inset-0 w-2 h-4 mx-auto bg-gradient-to-t from-orange-400 to-white rounded-full" />
            </motion.div>
            {/* Glow */}
            <div className="absolute -top-4 w-8 h-8 bg-orange-400/30 rounded-full blur-md" />
        </div>
    );
}

// Animated dots
function DotsLoader({ size, className }: { size: string; className?: string }) {
    return (
        <div className={cn("flex items-center justify-center gap-1", className)}>
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-aki-pink"
                    animate={{
                        y: [0, -8, 0],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.15,
                    }}
                />
            ))}
        </div>
    );
}

// Default spinner
function DefaultLoader({ size, className }: { size: string; className?: string }) {
    return (
        <motion.div
            className={cn(size, "rounded-full border-2 border-aki-pink/30 border-t-aki-pink", className)}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
    );
}

export function LoadingSpinner({
    variant = "default",
    size = "md",
    className,
    text
}: LoadingSpinnerProps) {
    const sizeClass = sizes[size];

    const loaders: Record<LoadingVariant, JSX.Element> = {
        default: <DefaultLoader size={sizeClass} className={className} />,
        vinyl: <VinylLoader size={sizeClass} className={className} />,
        plushie: <PlushieLoader size={sizeClass} className={className} />,
        candle: <CandleLoader size={sizeClass} className={className} />,
        dots: <DotsLoader size={sizeClass} className={className} />,
    };

    return (
        <div className="flex flex-col items-center gap-3">
            {loaders[variant]}
            {text && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-muted-foreground"
                >
                    {text}
                </motion.p>
            )}
        </div>
    );
}
