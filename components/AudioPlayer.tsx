"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Song {
    id: string;
    title: string;
    artist: string;
    url?: string;
    duration?: number;
}

interface AudioPlayerProps {
    songs: Song[];
    initialSongIndex?: number;
}

export default function AudioPlayer({
    songs,
    initialSongIndex = 0,
}: AudioPlayerProps) {
    const [currentIndex, setCurrentIndex] = useState(initialSongIndex);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    const currentSong = songs[currentIndex];

    // Load saved state from localStorage
    useEffect(() => {
        const savedIndex = localStorage.getItem("aki-player-index");
        const savedTime = localStorage.getItem("aki-player-time");
        if (savedIndex) setCurrentIndex(parseInt(savedIndex));
        if (savedTime && audioRef.current) {
            audioRef.current.currentTime = parseFloat(savedTime);
        }
    }, []);

    // Save state to localStorage
    useEffect(() => {
        localStorage.setItem("aki-player-index", currentIndex.toString());
    }, [currentIndex]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setProgress(audioRef.current.currentTime);
            localStorage.setItem("aki-player-time", audioRef.current.currentTime.toString());
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const togglePlay = useCallback(() => {
        if (!currentSong?.url) return;
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    }, [currentSong?.url, isPlaying]);

    const playNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % songs.length);
        setIsPlaying(false);
        setProgress(0);
    }, [songs.length]);

    const playPrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
        setIsPlaying(false);
        setProgress(0);
    }, [songs.length]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    // Handle keyboard controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

            switch (e.key) {
                case " ":
                    e.preventDefault();
                    togglePlay();
                    break;
                case "ArrowRight":
                    playNext();
                    break;
                case "ArrowLeft":
                    playPrev();
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [togglePlay, playNext, playPrev]);

    if (!currentSong) {
        return (
            <div className="glass rounded-2xl p-6 text-center">
                <p style={{ color: "rgba(18, 18, 18, 0.5)" }}>no songs available</p>
            </div>
        );
    }

    return (
        <div className="glass rounded-2xl p-6">
            {/* Hidden audio element */}
            {currentSong.url && (
                <audio
                    ref={audioRef}
                    src={currentSong.url}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={playNext}
                />
            )}

            {/* Now Playing */}
            <div className="text-center mb-6">
                <div
                    className="w-24 h-24 mx-auto rounded-2xl mb-4 flex items-center justify-center text-4xl"
                    style={{ backgroundColor: "rgba(255, 108, 164, 0.2)" }}
                >
                    {isPlaying ? "🎵" : "🎧"}
                </div>
                <h3 className="font-heading font-semibold" style={{ color: "#121212" }}>
                    {currentSong.title}
                </h3>
                <p className="text-sm" style={{ color: "rgba(18, 18, 18, 0.5)" }}>
                    {currentSong.artist}
                </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
                <div
                    className="h-1 rounded-full cursor-pointer"
                    style={{ backgroundColor: "rgba(255, 108, 164, 0.2)" }}
                >
                    <div
                        className="h-full rounded-full transition-all"
                        style={{
                            width: duration ? `${(progress / duration) * 100}%` : "0%",
                            backgroundColor: "#FF6CA4",
                        }}
                    />
                </div>
                <div
                    className="flex justify-between text-xs mt-1"
                    style={{ color: "rgba(18, 18, 18, 0.5)" }}
                >
                    <span>{formatTime(progress)}</span>
                    <span>{formatTime(duration || currentSong.duration || 0)}</span>
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6">
                <button
                    onClick={playPrev}
                    className="p-2 rounded-full hover:bg-white/50 transition-colors"
                    aria-label="Previous song"
                >
                    ⏮️
                </button>
                <button
                    onClick={togglePlay}
                    className="p-4 rounded-full transition-colors"
                    style={{ backgroundColor: "#FF6CA4", color: "white" }}
                    aria-label={isPlaying ? "Pause" : "Play"}
                    disabled={!currentSong.url}
                >
                    {isPlaying ? "⏸️" : "▶️"}
                </button>
                <button
                    onClick={playNext}
                    className="p-2 rounded-full hover:bg-white/50 transition-colors"
                    aria-label="Next song"
                >
                    ⏭️
                </button>
            </div>

            {/* Playlist indicator */}
            <p
                className="text-center text-xs mt-4"
                style={{ color: "rgba(18, 18, 18, 0.4)" }}
            >
                {currentIndex + 1} / {songs.length}
            </p>

            {!currentSong.url && (
                <p
                    className="text-center text-xs mt-2"
                    style={{ color: "rgba(18, 18, 18, 0.5)" }}
                >
                    (audio files coming in wave 7)
                </p>
            )}
        </div>
    );
}
