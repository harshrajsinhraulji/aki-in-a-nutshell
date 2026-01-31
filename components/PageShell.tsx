import { ReactNode } from "react";

interface PageShellProps {
    children: ReactNode;
    /** Max width variant */
    maxWidth?: "sm" | "md" | "lg" | "xl";
    /** Additional className */
    className?: string;
}

const maxWidthClasses = {
    sm: "max-w-xl",    // 576px - single column (confessions)
    md: "max-w-2xl",   // 672px - narrow content
    lg: "max-w-4xl",   // 896px - stories, music
    xl: "max-w-5xl",   // 1024px - grid layouts (plushies)
};

/**
 * PageShell Component
 * 
 * Consistent page wrapper with responsive padding and max-width.
 * Provides the foundation layout for all content pages.
 */
export default function PageShell({
    children,
    maxWidth = "lg",
    className = "",
}: PageShellProps) {
    return (
        <div className={`min-h-screen px-4 sm:px-6 py-8 sm:py-12 ${className}`}>
            <div className={`${maxWidthClasses[maxWidth]} mx-auto`}>
                {children}
            </div>
        </div>
    );
}
