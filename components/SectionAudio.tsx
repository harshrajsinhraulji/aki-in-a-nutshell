"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type SectionType = "home" | "stories" | "music" | "plushies" | "confessions" | "default";

// Ambient sound configuration per section
const sectionSounds: Record<SectionType, string | null> = {
    home: "/audio/ambient/gentle_wind.mp3",
    stories: "/audio/ambient/pages_turning.mp3",
    music: null, // Music page has its own audio
    plushies: "/audio/ambient/soft_chimes.mp3",
    confessions: "/audio/ambient/whispers.mp3",
    default: null,
};

interface SectionAudioProps {
    volume?: number;
    enabled?: boolean;
}

export function SectionAudio({ volume = 0.15, enabled = true }: SectionAudioProps) {
    const pathname = usePathname();
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [currentSection, setCurrentSection] = useState<SectionType>("default");
    const [isPlaying, setIsPlaying] = useState(false);
    const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Determine section from pathname
    useEffect(() => {
        const path = pathname.split("/")[1] || "home";
        const section = (["stories", "music", "plushies", "confessions"].includes(path) ? path : path === "" ? "home" : "default") as SectionType;
        setCurrentSection(section);
    }, [pathname]);

    // Fade out helper
    const fadeOut = (audio: HTMLAudioElement, callback?: () => void) => {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

        fadeIntervalRef.current = setInterval(() => {
            if (audio.volume > 0.01) {
                audio.volume = Math.max(0, audio.volume - 0.02);
            } else {
                if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
                audio.pause();
                audio.volume = volume;
                callback?.();
            }
        }, 50);
    };

    // Fade in helper
    const fadeIn = (audio: HTMLAudioElement) => {
        audio.volume = 0;
        audio.play().catch(() => { });

        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

        fadeIntervalRef.current = setInterval(() => {
            if (audio.volume < volume - 0.02) {
                audio.volume = Math.min(volume, audio.volume + 0.02);
            } else {
                audio.volume = volume;
                if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
            }
        }, 50);
    };

    // Handle section changes
    useEffect(() => {
        if (!enabled) return;

        const soundUrl = sectionSounds[currentSection];

        // Fade out current audio if playing
        if (audioRef.current && isPlaying) {
            fadeOut(audioRef.current, () => {
                if (soundUrl) {
                    audioRef.current!.src = soundUrl;
                    fadeIn(audioRef.current!);
                    setIsPlaying(true);
                } else {
                    setIsPlaying(false);
                }
            });
        } else if (soundUrl) {
            // Start new audio
            if (!audioRef.current) {
                audioRef.current = new Audio(soundUrl);
                audioRef.current.loop = true;
            } else {
                audioRef.current.src = soundUrl;
            }
            fadeIn(audioRef.current);
            setIsPlaying(true);
        }

        return () => {
            if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        };
    }, [currentSection, enabled, volume, isPlaying]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        };
    }, []);

    return null; // This is a non-visual component
}
