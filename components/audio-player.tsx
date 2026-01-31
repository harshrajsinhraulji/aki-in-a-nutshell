"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from "lucide-react";

type Song = {
    id: string;
    title: string;
    artist?: string;
    fileUrl: string;
    coverUrl?: string;
};

type AudioContextType = {
    currentSong: Song | null;
    isPlaying: boolean;
    playSong: (song: Song) => void;
    togglePlay: () => void;
    nextSong: () => void;
    prevSong: () => void;
    playlist: Song[];
    setPlaylist: (songs: Song[]) => void;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function useAudio() {
    const context = useContext(AudioContext);
    if (!context) throw new Error("useAudio must be used within AudioProvider");
    return context;
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playlist, setPlaylist] = useState<Song[]>([]);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Initialize audio element
    useEffect(() => {
        audioRef.current = new Audio();
        audioRef.current.addEventListener("ended", nextSong);

        // Restore state from localStorage
        const savedSong = localStorage.getItem("aki-last-song");
        const savedTime = localStorage.getItem("aki-last-time");
        if (savedSong) {
            try {
                const parsedSong = JSON.parse(savedSong);
                setCurrentSong(parsedSong);
                if (audioRef.current) {
                    audioRef.current.src = parsedSong.fileUrl;
                    if (savedTime) audioRef.current.currentTime = parseFloat(savedTime);
                }
            } catch (e) {
                console.error("Failed to restore audio state", e);
            }
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener("ended", nextSong);
                audioRef.current.pause();
            }
        };
    }, []);

    // Save state to localStorage periodically
    useEffect(() => {
        const interval = setInterval(() => {
            if (audioRef.current && isPlaying) {
                localStorage.setItem("aki-last-time", audioRef.current.currentTime.toString());
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [isPlaying]);

    const playSong = (song: Song) => {
        if (!audioRef.current) return;

        // If clicking same song, just toggle
        if (currentSong?.id === song.id) {
            togglePlay();
            return;
        }

        // New song
        setCurrentSong(song);
        localStorage.setItem("aki-last-song", JSON.stringify(song));
        audioRef.current.src = song.fileUrl;
        audioRef.current.play();
        setIsPlaying(true);
    };

    const togglePlay = () => {
        if (!audioRef.current || !currentSong) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const nextSong = () => {
        if (!currentSong || playlist.length === 0) return;
        const idx = playlist.findIndex((s) => s.id === currentSong.id);
        const nextIdx = (idx + 1) % playlist.length;
        playSong(playlist[nextIdx]);
    };

    const prevSong = () => {
        if (!currentSong || playlist.length === 0) return;
        const idx = playlist.findIndex((s) => s.id === currentSong.id);
        const prevIdx = (idx - 1 + playlist.length) % playlist.length;
        playSong(playlist[prevIdx]);
    };

    // Keyboard shortcuts
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            // Ignore if typing in input
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

            if (e.code === "Space") {
                e.preventDefault();
                togglePlay();
            } else if (e.code === "ArrowRight" && e.shiftKey) {
                nextSong();
            } else if (e.code === "ArrowLeft" && e.shiftKey) {
                prevSong();
            } else if (e.key === "m") {
                if (audioRef.current) audioRef.current.muted = !audioRef.current.muted;
            }
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [currentSong, isPlaying, playlist]);

    return (
        <AudioContext.Provider value={{ currentSong, isPlaying, playSong, togglePlay, nextSong, prevSong, playlist, setPlaylist }}>
            {children}
            {currentSong && (
                <div className="fixed bottom-4 left-4 z-50 flex items-center gap-4 bg-dark/80 backdrop-blur-md p-4 rounded-2xl border border-pink-500/20 shadow-xl w-[calc(100%-2rem)] md:w-auto md:min-w-[400px]">
                    <img src={currentSong.coverUrl || "/placeholder-music.jpg"} alt="Album Art" className="w-12 h-12 rounded-lg object-cover bg-neutral-800" />
                    <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold truncate text-pink-500">{currentSong.title}</h4>
                        <p className="text-xs text-neutral-400 truncate">{currentSong.artist || "Unknown Artist"}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={prevSong} className="hover:text-pink-400"><SkipBack size={20} /></button>
                        <button onClick={togglePlay} className="w-10 h-10 rounded-full bg-pink-500 text-dark flex items-center justify-center hover:scale-105 transition">
                            {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
                        </button>
                        <button onClick={nextSong} className="hover:text-pink-400"><SkipForward size={20} /></button>
                    </div>
                </div>
            )}
        </AudioContext.Provider>
    );
}
