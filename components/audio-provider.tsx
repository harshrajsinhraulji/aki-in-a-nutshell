"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from "react";

interface Song {
    id: string;
    title: string;
    artist?: string;
    fileUrl: string;
    coverImageUrl?: string;
    durationSeconds?: number;
}

interface AudioContextType {
    isPlaying: boolean;
    currentSong: Song | null;
    playlist: Song[];
    volume: number;
    currentTime: number;
    duration: number;
    isMuted: boolean;
    isShuffle: boolean;
    isRepeat: boolean;
    togglePlay: () => void;
    playSong: (song: Song) => void;
    setPlaylist: (songs: Song[]) => void;
    nextSong: () => void;
    prevSong: () => void;
    seek: (time: number) => void;
    setVolume: (vol: number) => void;
    toggleMute: () => void;
    toggleShuffle: () => void;
    toggleRepeat: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [playlist, setPlaylist] = useState<Song[]>([]);
    const [volume, setVolumeState] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);

    // Initialize audio element & fetch playlist
    useEffect(() => {
        audioRef.current = new Audio();

        // Restore state from localStorage
        const savedVol = localStorage.getItem("aki-volume");
        if (savedVol) {
            const vol = parseFloat(savedVol);
            setVolumeState(vol);
            audioRef.current.volume = vol;
        }

        // Fetch playlist from Firestore
        // Note: We import these dynamically or use the global firebase instance
        import("@/lib/firebase").then(({ db }) => {
            import("firebase/firestore").then(({ collection, query, where, orderBy, getDocs }) => {
                const songsRef = collection(db, "songs");
                const q = query(songsRef, where("isPublic", "==", true), orderBy("order", "asc"));

                getDocs(q).then((snapshot) => {
                    const fetchedSongs: Song[] = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    } as Song));

                    if (fetchedSongs.length > 0) {
                        setPlaylist(fetchedSongs);
                        // Optionally set first song as current if none selected (but don't auto-play)
                        // setCurrentSong(fetchedSongs[0]); 
                    }
                }).catch(err => console.error("Failed to load playlist", err));
            });
        });

        const handleTimeUpdate = () => setCurrentTime(audioRef.current?.currentTime || 0);
        const handleDurationChange = () => setDuration(audioRef.current?.duration || 0);
        const handleEnded = () => nextSong();

        audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.addEventListener("durationchange", handleDurationChange);
        audioRef.current.addEventListener("ended", handleEnded);

        return () => {
            audioRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
            audioRef.current?.removeEventListener("durationchange", handleDurationChange);
            audioRef.current?.removeEventListener("ended", handleEnded);
        };
    }, []);

    // Play/Pause effect
    useEffect(() => {
        if (currentSong && audioRef.current) {
            if (audioRef.current.src !== currentSong.fileUrl) {
                audioRef.current.src = currentSong.fileUrl;
                audioRef.current.load();
            }

            if (isPlaying) {
                // Handle Promise to avoid race conditions
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log("Playback prevented:", error);
                        setIsPlaying(false);
                    });
                }
            } else {
                audioRef.current.pause();
            }
        }
    }, [currentSong, isPlaying]);

    const togglePlay = () => setIsPlaying(!isPlaying);

    const playSong = (song: Song) => {
        if (currentSong?.id === song.id) {
            togglePlay();
        } else {
            setCurrentSong(song);
            setIsPlaying(true);
        }
    };

    const nextSong = () => {
        if (playlist.length === 0) return;

        let nextIndex;
        const currentIndex = playlist.findIndex(s => s.id === currentSong?.id);

        if (isShuffle) {
            nextIndex = Math.floor(Math.random() * playlist.length);
        } else {
            nextIndex = (currentIndex + 1) % playlist.length;
        }

        setCurrentSong(playlist[nextIndex]);
        setIsPlaying(true);
    };

    const prevSong = () => {
        if (playlist.length === 0) return;
        const currentIndex = playlist.findIndex(s => s.id === currentSong?.id);
        const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
        setCurrentSong(playlist[prevIndex]);
        setIsPlaying(true);
    };

    const seek = (time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const setVolume = (vol: number) => {
        setVolumeState(vol);
        if (audioRef.current) audioRef.current.volume = vol;
        localStorage.setItem("aki-volume", vol.toString());
        if (vol > 0 && isMuted) setIsMuted(false);
    };

    const toggleMute = () => {
        if (audioRef.current) {
            const newMute = !isMuted;
            setIsMuted(newMute);
            audioRef.current.muted = newMute;
        }
    };

    const toggleShuffle = () => setIsShuffle(!isShuffle);

    const toggleRepeat = () => setIsRepeat(!isRepeat); // Note: Audio "loop" simple implementation

    return (
        <AudioContext.Provider value={{
            isPlaying,
            currentSong,
            playlist,
            volume,
            currentTime,
            duration,
            isMuted,
            isShuffle,
            isRepeat,
            togglePlay,
            playSong,
            setPlaylist,
            nextSong,
            prevSong,
            seek,
            setVolume,
            toggleMute,
            toggleShuffle,
            toggleRepeat
        }}>
            {children}
        </AudioContext.Provider>
    );
}

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) throw new Error("useAudio must be used within AudioProvider");
    return context;
};
