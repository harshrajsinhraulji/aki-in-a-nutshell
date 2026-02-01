"use client";

import { useEffect, useRef } from "react";

export function DynamicFavicon() {
    const originalTitle = useRef<string>("");

    useEffect(() => {
        originalTitle.current = document.title;

        const handleVisibilityChange = () => {
            if (document.hidden) {
                document.title = "Come back! 🥺 | Aki's World";
            } else {
                document.title = originalTitle.current;
                // Restore strictly after a delay to ensure "flashing" isn't annoying
                setTimeout(() => {
                    if (!document.hidden) document.title = originalTitle.current;
                }, 2000);
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    return null;
}
