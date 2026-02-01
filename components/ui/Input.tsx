import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex h-12 w-full rounded-2xl border border-white/10 bg-dream-900/50 px-4 py-2 text-sm ring-offset-dream-950 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-luminous-300/30 text-luminous-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luminous-400/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-inner shadow-black/20",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export { Input };
