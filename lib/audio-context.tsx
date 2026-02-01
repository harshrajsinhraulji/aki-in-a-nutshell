"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';

// Song interface
export interface Song {
    id: string;
    title: string;
    artist: string;
    url: string;
}

// Full playlist - Aki's Mixtape
export const PLAYLIST: Song[] = [
    { id: "1", title: "Black Beatles", artist: "Rae Sremmurd", url: "/music/Black Beatles.mp3" },
    { id: "2", title: "Cola", artist: "Lana Del Rey", url: "/music/Cola.mp3" },
    { id: "3", title: "Drinkee", artist: "Sofi Tukker", url: "/music/Drinkee.mp3" },
    { id: "4", title: "Fast Car", artist: "Tracy Chapman", url: "/music/Fast Car.mp3" },
    { id: "5", title: "Guess", artist: "Charli XCX ft. Billie Eilish", url: "/music/Guess featuring billie eilish.mp3" },
    { id: "6", title: "Lady Killers II", artist: "G-Eazy", url: "/music/Lady Killers II.mp3" },
    { id: "7", title: "Never Be Like You", artist: "Flume ft. Kai", url: "/music/Never Be Like You.mp3" },
    { id: "8", title: "Original Sin", artist: "INXS", url: "/music/Original Sin.mp3" },
    { id: "9", title: "RITMO", artist: "Black Eyed Peas", url: "/music/RITMO (Bad Boys For Life).mp3" },
    { id: "10", title: "Stay", artist: "The Kid LAROI & Justin Bieber", url: "/music/Stay.mp3" },
    { id: "11", title: "Supercut", artist: "Lorde", url: "/music/Supercut.mp3" },
    { id: "12", title: "Swing", artist: "Sofi Tukker", url: "/music/Swing.mp3" },
    { id: "13", title: "Tumblr Girls", artist: "G-Eazy", url: "/music/Tumblr Girls (feat. Christoph Andersson).mp3" },
    { id: "14", title: "WACUKA", artist: "Bensoul", url: "/music/WACUKA.mp3" },
    { id: "15", title: "Walking The Wire", artist: "Imagine Dragons", url: "/music/Walking The Wire.mp3" },
];

// Define context shape
interface AudioContextType {
    isPlaying: boolean;
    togglePlay: () => void;
    volume: number;
    setVolume: (val: number) => void;
    playSfx: (src: string) => void;
    currentTrack: Song | null;
    currentTrackIndex: number;
    playTrack: (song: Song) => void;
    nextTrack: () => void;
    prevTrack: () => void;
    playlist: Song[];
    analyser: AnalyserNode | null;
    duration: number;
    currentTime: number;
    seek: (time: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [currentTrack, setCurrentTrack] = useState<Song | null>(null);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const soundRef = useRef<any>(null);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const analyserRef = useRef<AnalyserNode | null>(null);

    // Setup Web Audio API Analyser for visualizer
    useEffect(() => {
        import('howler').then(({ Howler }) => {
            if (typeof window !== 'undefined' && !analyserRef.current) {
                const ctx = Howler.ctx;
                if (ctx) {
                    const analyser = ctx.createAnalyser();
                    analyser.fftSize = 256;
                    analyserRef.current = analyser;
                    Howler.masterGain.connect(analyser);
                    analyser.connect(ctx.destination);
                }
            }
        });

        // Loop to update current time for UI
        const timer = setInterval(() => {
            if (soundRef.current && isPlaying) {
                setCurrentTime(soundRef.current.seek());
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [isPlaying]);

    const playTrack = useCallback(async (song: Song) => {
        const { Howl } = await import('howler');

        // Stop current track
        if (soundRef.current) {
            soundRef.current.stop();
            soundRef.current.unload();
        }

        // Find index in playlist
        const index = PLAYLIST.findIndex(s => s.id === song.id);
        setCurrentTrackIndex(index >= 0 ? index : 0);
        setCurrentTrack(song);

        // Create new Howl instance
        soundRef.current = new Howl({
            src: [song.url],
            html5: true,
            volume: volume,
            onplay: () => {
                setIsPlaying(true);
                setDuration(soundRef.current.duration());
            },
            onpause: () => setIsPlaying(false),
            onend: () => {
                // Auto-play next track
                const nextIndex = (index + 1) % PLAYLIST.length;
                playTrack(PLAYLIST[nextIndex]);
            },
            onload: () => {
                setDuration(soundRef.current.duration());
            },
            onloaderror: (id, error) => console.error("Load error:", error),
        });

        soundRef.current.play();
    }, [volume]);

    const seek = useCallback((time: number) => {
        if (soundRef.current) {
            soundRef.current.seek(time);
            setCurrentTime(time);
        }
    }, []);

    const togglePlay = useCallback(() => {
        if (!soundRef.current) {
            // If no track loaded, start with first song
            if (PLAYLIST.length > 0) {
                playTrack(PLAYLIST[0]);
            }
            return;
        }

        if (isPlaying) {
            soundRef.current.pause();
        } else {
            soundRef.current.play();
        }
    }, [isPlaying, playTrack]);

    const nextTrack = useCallback(() => {
        const nextIndex = (currentTrackIndex + 1) % PLAYLIST.length;
        playTrack(PLAYLIST[nextIndex]);
    }, [currentTrackIndex, playTrack]);

    const prevTrack = useCallback(() => {
        const prevIndex = currentTrackIndex === 0 ? PLAYLIST.length - 1 : currentTrackIndex - 1;
        playTrack(PLAYLIST[prevIndex]);
    }, [currentTrackIndex, playTrack]);

    const playSfx = useCallback(async (src: string) => {
        const { Howl } = await import('howler');
        const sfx = new Howl({
            src: [src],
            volume: volume * 1.2,
        });
        sfx.play();

        // Ducking effect
        if (soundRef.current && isPlaying) {
            soundRef.current.fade(volume, volume * 0.3, 200);
            setTimeout(() => {
                if (soundRef.current && isPlaying) {
                    soundRef.current.fade(volume * 0.3, volume, 500);
                }
            }, 1000);
        }
    }, [volume, isPlaying]);

    // Update volume when changed
    useEffect(() => {
        if (soundRef.current) {
            soundRef.current.volume(volume);
        }
    }, [volume]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            soundRef.current?.unload();
        };
    }, []);

    return (
        <AudioContext.Provider value={{
            isPlaying,
            togglePlay,
            volume,
            setVolume,
            playSfx,
            currentTrack,
            currentTrackIndex,
            playTrack,
            nextTrack,
            prevTrack,
            playlist: PLAYLIST,
            analyser: analyserRef.current,
            duration,
            currentTime,
            seek
        }}>
            {children}
        </AudioContext.Provider>
    );
}

export function useAudio() {
    const context = useContext(AudioContext);
    if (context === undefined) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
}
