"use client";

import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface BlurImageProps extends Omit<ImageProps, "onLoad"> {
    lowQualitySrc?: string;
    showSkeleton?: boolean;
}

export default function BlurImage({
    className,
    lowQualitySrc,
    showSkeleton = true,
    ...props
}: BlurImageProps) {
    const [isLoading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    return (
        <div className={cn("relative overflow-hidden bg-muted/30", className)}>
            {/* Skeleton/Shimmer while loading */}
            <AnimatePresence>
                {isLoading && showSkeleton && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-gradient-to-r from-muted/50 via-muted/30 to-muted/50"
                        style={{
                            backgroundSize: "200% 100%",
                            animation: "shimmer 1.5s infinite linear",
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Low quality placeholder (blur-up technique) */}
            {lowQualitySrc && isLoading && (
                <Image
                    {...props}
                    src={lowQualitySrc}
                    alt=""
                    className={cn(
                        "absolute inset-0 w-full h-full object-cover",
                        "blur-xl scale-110 opacity-50"
                    )}
                    quality={10}
                    priority={false}
                />
            )}

            {/* Main image */}
            <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{
                    opacity: isLoading ? 0 : 1,
                    scale: isLoading ? 1.05 : 1,
                    filter: isLoading ? "blur(20px)" : "blur(0px)",
                }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                <Image
                    {...props}
                    className={cn("w-full h-full object-cover", className)}
                    onLoad={() => setLoading(false)}
                    onError={() => {
                        setHasError(true);
                        setLoading(false);
                    }}
                />
            </motion.div>

            {/* Error fallback */}
            {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
                    <span className="text-2xl">🖼️</span>
                </div>
            )}
        </div>
    );
}

// Optimized lazy image with intersection observer
export function LazyImage({
    ...props
}: BlurImageProps) {
    const [shouldLoad, setShouldLoad] = useState(false);
    const [ref, setRef] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!ref) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "200px" } // Start loading 200px before visible
        );

        observer.observe(ref);
        return () => observer.disconnect();
    }, [ref]);

    return (
        <div ref={setRef} className={cn("relative", props.className)}>
            {shouldLoad ? (
                <BlurImage {...props} />
            ) : (
                <div className="w-full h-full bg-muted/30 animate-pulse" />
            )}
        </div>
    );
}
