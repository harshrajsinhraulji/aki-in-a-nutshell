"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface ReducedMotionContextType {
    prefersReducedMotion: boolean;
    animationDuration: number;
    shouldAnimate: boolean;
}

const ReducedMotionContext = createContext<ReducedMotionContextType>({
    prefersReducedMotion: false,
    animationDuration: 0.3,
    shouldAnimate: true,
});

export function useReducedMotion() {
    return useContext(ReducedMotionContext);
}

interface ReducedMotionProviderProps {
    children: ReactNode;
}

export function ReducedMotionProvider({ children }: ReducedMotionProviderProps) {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        // Check for reduced motion preference
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    const value: ReducedMotionContextType = {
        prefersReducedMotion,
        animationDuration: prefersReducedMotion ? 0 : 0.3,
        shouldAnimate: !prefersReducedMotion,
    };

    return (
        <ReducedMotionContext.Provider value={value}>
            {children}
        </ReducedMotionContext.Provider>
    );
}

// Hook to get animation variants based on reduced motion preference
export function useAnimationVariants<T extends Record<string, unknown>>(
    variants: T,
    staticVariant: keyof T = "animate" as keyof T
): T {
    const { prefersReducedMotion } = useReducedMotion();

    if (prefersReducedMotion) {
        // Return instant transition for all variants
        const staticValue = variants[staticVariant];
        return Object.keys(variants).reduce((acc, key) => {
            acc[key as keyof T] = staticValue as T[keyof T];
            return acc;
        }, {} as T);
    }

    return variants;
}

// Motion-safe wrapper that respects reduced motion
export function MotionSafe({
    children,
    fallback,
}: {
    children: ReactNode;
    fallback?: ReactNode;
}) {
    const { prefersReducedMotion } = useReducedMotion();

    if (prefersReducedMotion && fallback) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}
