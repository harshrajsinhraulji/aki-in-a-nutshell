"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value: number;
    max: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
    ({ className, value, max, onChange, ...props }, ref) => {
        // Calculate percentage for gradient background
        const percentage = max > 0 ? (value / max) * 100 : 0;

        return (
            <div className="relative flex items-center w-full h-4">
                <input
                    type="range"
                    min="0"
                    max={max}
                    value={value}
                    onChange={onChange}
                    ref={ref}
                    className={cn(
                        "w-full h-1.5 rounded-full outline-none appearance-none cursor-pointer z-20 bg-transparent",
                        className
                    )}
                    style={{
                        WebkitAppearance: "none",
                    }}
                    {...props}
                />

                {/* Custom Track Background */}
                <div className="absolute inset-0 top-1/2 -translate-y-1/2 h-1.5 w-full rounded-full bg-secondary/30 pointer-events-none z-10 overflow-hidden">
                    {/* Filled part */}
                    <div
                        className="h-full bg-aki-pink transition-all duration-100 ease-out"
                        style={{ width: `${percentage}%` }}
                    />
                </div>

                {/* Thumb Styles (via CSS in globals or inline styles if needed, but standard input range thumb is hard to style perfectly without heavy CSS.
                    For now, we rely on standard browser appearance for the thumb or add specific class utility if configured.)
                */}
                <style jsx>{`
                    input[type='range']::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        width: 12px;
                        height: 12px;
                        border-radius: 50%;
                        background: #FF6B9D;
                        cursor: pointer;
                        border: 2px solid white;
                        box-shadow: 0 1px 3px rgba(0,0,0,0.3);
                        transition: transform 0.1s;
                    }
                    input[type='range']::-webkit-slider-thumb:hover {
                        transform: scale(1.2);
                    }
                    input[type='range']::-moz-range-thumb {
                        width: 12px;
                        height: 12px;
                        border-radius: 50%;
                        background: #FF6B9D;
                        cursor: pointer;
                        border: 2px solid white;
                        box-shadow: 0 1px 3px rgba(0,0,0,0.3);
                        transition: transform 0.1s;
                    }
                `}</style>
            </div>
        );
    }
);

Slider.displayName = "Slider";
