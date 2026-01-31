import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "variant"> {
    variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
    size?: "sm" | "md" | "lg" | "icon";
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
        const variants = {
            primary: "bg-aki-pink text-white hover:bg-aki-pink/90 shadow-md",
            secondary: "bg-aki-bubblegum text-aki-dark hover:bg-aki-bubblegum/80",
            ghost: "bg-transparent text-aki-pink hover:bg-aki-pink/10",
            danger: "bg-red-500 text-white hover:bg-red-600",
            outline: "border-2 border-aki-pink text-aki-pink hover:bg-aki-pink/10",
        };

        const sizes = {
            sm: "h-9 px-4 text-xs rounded-xl",
            md: "h-11 px-6 text-sm rounded-2xl",
            lg: "h-14 px-8 text-base rounded-3xl",
            icon: "h-11 w-11 rounded-2xl flex items-center justify-center p-0",
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                    "inline-flex items-center justify-center font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aki-pink disabled:pointer-events-none disabled:opacity-50",
                    variants[variant],
                    sizes[size],
                    className
                )}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading ? (
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : null}
                {children as React.ReactNode}
            </motion.button>
        );
    }
);
Button.displayName = "Button";

export { Button };
