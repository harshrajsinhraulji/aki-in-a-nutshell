"use client";

import Link from "next/link";
import { useIsOwner } from "@/contexts/AuthContext";

interface EmptyStateProps {
    /** Emoji icon to display */
    icon: string;
    /** Alt text for the icon (accessibility) */
    iconAlt: string;
    /** Main title message - should be inviting, not apologetic */
    title: string;
    /** CTA for owners only */
    ownerCTA?: {
        label: string;
        href: string;
    };
    /** Message shown to public visitors */
    publicMessage?: string;
    /** Optional fun personality text */
    personality?: string;
    /** Size variant */
    size?: "sm" | "md" | "lg";
}

const sizeClasses = {
    sm: {
        container: "py-8 sm:py-12",
        icon: "text-4xl sm:text-5xl",
        title: "text-lg sm:text-xl",
        message: "text-sm",
    },
    md: {
        container: "py-12 sm:py-16",
        icon: "text-5xl sm:text-6xl",
        title: "text-xl sm:text-2xl",
        message: "text-sm sm:text-base",
    },
    lg: {
        container: "py-16 sm:py-24",
        icon: "text-6xl sm:text-7xl md:text-8xl",
        title: "text-2xl sm:text-3xl",
        message: "text-base",
    },
};

/**
 * EmptyState Component
 * 
 * Shows a friendly, personalized empty state when no content exists.
 * Philosophy: Opportunity, not failure. Invite, don't apologize.
 * 
 * - Owners see a CTA to add content
 * - Public visitors see a soft, personality-filled message
 */
export default function EmptyState({
    icon,
    iconAlt,
    title,
    ownerCTA,
    publicMessage = "check back soon ✨",
    personality,
    size = "md",
}: EmptyStateProps) {
    const isOwner = useIsOwner();
    const classes = sizeClasses[size];

    return (
        <section
            className={`rounded-2xl sm:rounded-[2rem] ${classes.container} px-6 sm:px-8 bg-dream-900/50 border border-white/5`}
            role="status"
            aria-live="polite"
        >
            <div className="flex flex-col items-center justify-center text-center max-w-sm mx-auto">
                {/* Animated emoji icon */}
                <span
                    className={`${classes.icon} mb-4 sm:mb-6 block animate-bounce-soft filter drop-shadow-[0_0_15px_rgba(232,121,249,0.3)] grayscale hover:grayscale-0 transition-all`}
                    role="img"
                    aria-label={iconAlt}
                    style={{ animationDuration: "3s" }}
                >
                    {icon}
                </span>

                {/* Inviting title */}
                <h2
                    className={`${classes.title} font-heading font-bold mb-2 sm:mb-3 text-luminous-100`}
                >
                    {title}
                </h2>

                {/* Owner CTA or public message */}
                {isOwner && ownerCTA ? (
                    <Link
                        href={ownerCTA.href}
                        className="mt-4 sm:mt-6 px-6 py-2 rounded-full bg-luminous-400 hover:bg-luminous-300 text-dream-950 font-bold shadow-lg shadow-luminous-500/20 active:scale-95 transition-all text-sm"
                    >
                        {ownerCTA.label}
                    </Link>
                ) : (
                    <p
                        className={`${classes.message} lowercase text-luminous-300/50 font-mono`}
                    >
                        {publicMessage}
                    </p>
                )}

                {/* Optional personality text */}
                {personality && (
                    <p
                        className="text-xs sm:text-sm mt-4 sm:mt-6 font-mono lowercase text-luminous-300/30"
                    >
                        ✦ {personality} ✦
                    </p>
                )}
            </div>
        </section>
    );
}
