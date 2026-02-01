"use client";

import { createContext, useContext, useState, useRef, useEffect } from "react";

// Since we can't easily install new packages like use-sound without confirmation, 
// I will implement a native Audio solution for interaction sounds to be safe.

type Song = {
    id: string;
    title: string;
    artist: string;
    url: string;
    duration: number;
};

type AudioContextType = {
    currentSong: Song | null;
    isPlaying: boolean;
    playSong: (song: Song) => void;
    togglePlay: () => void;
    playHoverSound: () => void; // New
    playClickSound: () => void; // New
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Interaction Sounds Refs
    const hoverSoundRef = useRef<HTMLAudioElement | null>(null);
    const clickSoundRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio();
        hoverSoundRef.current = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-interface-click-1126.mp3"); // Subtle tick
        clickSoundRef.current = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-modern-technology-select-3124.mp3"); // Soft blip

        hoverSoundRef.current.volume = 0.05; // Very quiet
        clickSoundRef.current.volume = 0.1;

        return () => {
            audioRef.current?.pause();
        };
    }, []);

    useEffect(() => {
        if (currentSong && audioRef.current) {
            audioRef.current.src = currentSong.url;
            audioRef.current.play();
            setIsPlaying(true);

            audioRef.current.onended = () => setIsPlaying(false);
        }
    }, [currentSong]);

    useEffect(() => {
        if (audioRef.current) {
            isPlaying ? audioRef.current.play() : audioRef.current.pause();
        }
    }, [isPlaying]);

    const playSong = (song: Song) => setCurrentSong(song);
    const togglePlay = () => setIsPlaying(!isPlaying);

    const playHoverSound = () => {
        if (hoverSoundRef.current) {
            hoverSoundRef.current.currentTime = 0;
            hoverSoundRef.current.play().catch(() => { });
        }
    };

    const playClickSound = () => {
        if (clickSoundRef.current) {
            clickSoundRef.current.currentTime = 0;
            clickSoundRef.current.play().catch(() => { });
        }
    };

    return (
        <AudioContext.Provider value={{ currentSong, isPlaying, playSong, togglePlay, playHoverSound, playClickSound }}>
            {children}
        </AudioContext.Provider>
    );
}

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) throw new Error("useAudio must be used within AudioProvider");
    return context;
};
