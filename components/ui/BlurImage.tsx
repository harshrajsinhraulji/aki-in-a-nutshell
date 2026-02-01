"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function BlurImage({ className, ...props }: ImageProps) {
    const [isLoading, setLoading] = useState(true);

    return (
        <div className={cn("overflow-hidden bg-aki-peach/50", className)}>
            <Image
                {...props}
                className={cn(
                    "duration-700 ease-in-out",
                    isLoading ? "scale-110 blur-xl opacity-0" : "scale-100 blur-0 opacity-100",
                    className
                )}
                onLoad={() => setLoading(false)}
            />
        </div>
    );
}
