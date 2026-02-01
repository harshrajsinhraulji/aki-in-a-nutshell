import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "outline" | "secondary" | "danger" | "success";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
    const variants = {
        default: "bg-aki-pink text-white hover:bg-aki-pink/90",
        secondary: "bg-aki-bubblegum text-aki-dark hover:bg-aki-bubblegum/80",
        outline: "border border-aki-pink text-aki-pink",
        danger: "bg-red-100 text-red-700 border border-red-200",
        success: "bg-aki-mint/20 text-teal-800 border border-aki-mint/40",
    };

    return (
        <div
            className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                variants[variant],
                className
            )}
            {...props}
        />
    );
}

export { Badge };
