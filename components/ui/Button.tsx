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
            primary: "bg-luminous-400 text-dream-950 hover:bg-luminous-300 shadow-lg shadow-luminous-500/20 hover:shadow-luminous-500/40",
            secondary: "bg-dream-800 text-luminous-100 hover:bg-dream-700 border border-white/5",
            ghost: "bg-transparent text-luminous-300 hover:bg-luminous-400/10 hover:text-luminous-400",
            danger: "bg-red-500/10 text-red-400 border border-red-500/50 hover:bg-red-500/20",
            outline: "border border-luminous-400/50 text-luminous-300 hover:border-luminous-400 hover:text-luminous-400 hover:bg-luminous-400/5",
        };

        const sizes = {
            sm: "h-9 px-4 text-xs rounded-xl",
            md: "h-11 px-6 text-sm rounded-2xl",
            lg: "h-14 px-8 text-base rounded-[1.5rem]",
            icon: "h-11 w-11 rounded-2xl flex items-center justify-center p-0",
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
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
