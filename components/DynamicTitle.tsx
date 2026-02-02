"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

// Page title configurations
const pageTitles: Record<string, { icon: string; title: string }> = {
    "/": { icon: "🌸", title: "Aki's World" },
    "/stories": { icon: "📖", title: "Stories" },
    "/music": { icon: "🎵", title: "Mixtape" },
    "/plushies": { icon: "🧸", title: "Plushies" },
    "/confessions": { icon: "💭", title: "Confessions" },
    "/about": { icon: "✨", title: "About Aki" },
    "/aki": { icon: "👋", title: "Admin" },
};

interface DynamicTitleProps {
    baseTitle?: string;
    showTypewriter?: boolean;
    showNowPlaying?: boolean;
    currentTrack?: string | null;
}

export function DynamicTitle({
    baseTitle = "Aki's World",
    showTypewriter = true,
    showNowPlaying = true,
    currentTrack = null
}: DynamicTitleProps) {
    const pathname = usePathname();
    const [displayTitle, setDisplayTitle] = useState(baseTitle);
    const [isTyping, setIsTyping] = useState(false);

    // Typewriter effect
    const typewriterEffect = useCallback((text: string) => {
        if (!showTypewriter) {
            document.title = text;
            return;
        }

        setIsTyping(true);
        let index = 0;
        const chars = text.split("");

        const typeInterval = setInterval(() => {
            if (index <= chars.length) {
                document.title = chars.slice(0, index).join("");
                index++;
            } else {
                clearInterval(typeInterval);
                setIsTyping(false);
            }
        }, 80);

        return () => clearInterval(typeInterval);
    }, [showTypewriter]);

    // Update title on route change
    useEffect(() => {
        const pageConfig = pageTitles[pathname] || { icon: "🌸", title: baseTitle };
        const newTitle = `${pageConfig.icon} ${pageConfig.title}`;

        setDisplayTitle(newTitle);

        if (showTypewriter && !isTyping) {
            typewriterEffect(newTitle);
        } else {
            document.title = newTitle;
        }
    }, [pathname, baseTitle, showTypewriter, typewriterEffect, isTyping]);

    // Show "Now Playing" when music is active
    useEffect(() => {
        if (showNowPlaying && currentTrack && !isTyping) {
            const musicTitle = `🎵 Now Playing: ${currentTrack}`;
            document.title = musicTitle;
            setDisplayTitle(musicTitle);
        }
    }, [currentTrack, showNowPlaying, isTyping]);

    // Visibility change - show different title when tab is inactive
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                document.title = "👋 Come back!";
            } else {
                document.title = displayTitle;
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, [displayTitle]);

    return null; // Non-visual component
}
