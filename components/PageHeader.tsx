import { ReactNode } from "react";

interface PageHeaderProps {
    /** Page title */
    title: string;
    /** Title highlight color - uses CSS var */
    titleColor?: string;
    /** Emoji icon after title */
    emoji: string;
    /** Subtitle/description */
    subtitle: string;
    /** Optional additional content below subtitle */
    children?: ReactNode;
}

/**
 * PageHeader Component
 * 
 * Consistent, responsive page header with Aki's personality.
 * Used across all content pages for cohesive design.
 */
export default function PageHeader({
    title,
    titleColor = "var(--pink)",
    emoji,
    subtitle,
    children,
}: PageHeaderProps) {
    return (
        <header className="text-center mb-8 md:mb-12 px-4">
            {/* Title with emoji */}
            <h1
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
            >
                <span style={{ color: titleColor }}>{title}</span>{" "}
                <span role="img" aria-label={title}>{emoji}</span>
            </h1>

            {/* Subtitle */}
            <p
                className="text-base sm:text-lg max-w-md mx-auto"
                style={{ color: "var(--text-secondary)" }}
            >
                {subtitle}
            </p>

            {/* Optional extra content */}
            {children && (
                <div className="mt-4">
                    {children}
                </div>
            )}
        </header>
    );
}
