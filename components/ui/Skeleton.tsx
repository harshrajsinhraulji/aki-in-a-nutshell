"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SkeletonProps {
    className?: string;
    variant?: "text" | "circular" | "rectangular" | "card";
    width?: string | number;
    height?: string | number;
    lines?: number; // For text variant
}

export function Skeleton({
    className,
    variant = "rectangular",
    width,
    height,
    lines = 1,
}: SkeletonProps) {
    const baseClasses = "relative overflow-hidden bg-muted/50 dark:bg-muted/30";

    // Shimmer animation
    const shimmerClasses = `
        before:absolute before:inset-0 
        before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
        before:animate-[shimmer_2s_infinite]
    `;

    const variantClasses = {
        text: "h-4 rounded-md",
        circular: "rounded-full aspect-square",
        rectangular: "rounded-lg",
        card: "rounded-[2.5rem]",
    };

    const style = {
        width: width || "100%",
        height: variant === "text" ? undefined : (height || "100%"),
    };

    // Multiple lines for text
    if (variant === "text" && lines > 1) {
        return (
            <div className={cn("space-y-2", className)}>
                {Array.from({ length: lines }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className={cn(
                            baseClasses,
                            shimmerClasses,
                            variantClasses.text,
                            i === lines - 1 ? "w-3/4" : "w-full" // Last line shorter
                        )}
                        style={{ height: height || 16 }}
                    />
                ))}
            </div>
        );
    }

    return (
        <div
            className={cn(
                baseClasses,
                shimmerClasses,
                variantClasses[variant],
                className
            )}
            style={style}
        />
    );
}

// Skeleton for cards with glassmorphism
export function CardSkeleton({ className }: { className?: string }) {
    return (
        <div className={cn(
            "relative overflow-hidden rounded-[2.5rem] p-6",
            "bg-white/20 dark:bg-black/20 backdrop-blur-md",
            "border border-white/30 dark:border-white/10",
            className
        )}>
            {/* Shimmer overlay */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />

            {/* Icon placeholder */}
            <Skeleton variant="circular" width={40} height={40} className="mb-4" />

            {/* Title */}
            <Skeleton variant="text" width="60%" className="mb-2" />

            {/* Description */}
            <Skeleton variant="text" lines={2} className="mb-4" />

            {/* Footer */}
            <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <Skeleton variant="text" width={80} height={12} />
                <Skeleton variant="circular" width={16} height={16} />
            </div>
        </div>
    );
}

// Avatar skeleton
export function AvatarSkeleton({ size = 40 }: { size?: number }) {
    return (
        <Skeleton
            variant="circular"
            width={size}
            height={size}
            className="flex-shrink-0"
        />
    );
}

// Image skeleton with aspect ratio
export function ImageSkeleton({
    aspectRatio = "16/9",
    className
}: {
    aspectRatio?: string;
    className?: string;
}) {
    return (
        <div
            className={cn("relative overflow-hidden rounded-xl", className)}
            style={{ aspectRatio }}
        >
            <Skeleton variant="rectangular" className="absolute inset-0" />
            {/* Icon placeholder */}
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 5h13v7h2V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h8v-2H4V5z" />
                    <path d="m8 11-3 4h11l-4-6-3 4z" />
                    <path d="M19 14h-2v3h-3v2h3v3h2v-3h3v-2h-3z" />
                </svg>
            </div>
        </div>
    );
}
