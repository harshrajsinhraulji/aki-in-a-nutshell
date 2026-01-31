"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAudio } from "@/components/audio-player";
import { Play, Pause, Music } from "lucide-react";

export default function MusicPage() {
    const [songs, setSongs] = useState<any[]>([]);
    const { currentSong, isPlaying, playSong, togglePlay, setPlaylist } = useAudio();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSongs() {
            const q = query(collection(db, "songs"), orderBy("createdAt", "desc"));
            const snap = await getDocs(q);
            const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            setSongs(data);
            setPlaylist(data as any); // Update global playlist context
            setLoading(false);
        }
        fetchSongs();
    }, [setPlaylist]);

    return (
        <div className="min-h-screen pt-24 pb-20 px-4">
            <div className="container mx-auto max-w-3xl">
                <h1 className="text-4xl font-heading font-bold text-pink-500 mb-8 flex items-center gap-3">
                    <Music className="w-8 h-8" />
                    Aki's Mixtape
                </h1>

                {loading ? (
                    <p className="text-neutral-500">Loading tracks...</p>
                ) : (
                    <div className="space-y-4">
                        {songs.map((song) => {
                            const isCurrent = currentSong?.id === song.id;

                            return (
                                <div
                                    key={song.id}
                                    onClick={() => playSong(song)}
                                    className={`group flex items-center gap-4 p-4 rounded-2xl border transition cursor-pointer ${isCurrent ? "bg-pink-500/10 border-pink-500" : "bg-dark/50 border-neutral-800 hover:border-pink-500/50"
                                        }`}
                                >
                                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-neutral-900">
                                        <img src={song.coverUrl || "/placeholder-music.jpg"} className="w-full h-full object-cover" />
                                        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${isCurrent ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                            {isCurrent && isPlaying ? <Pause className="text-white" /> : <Play className="text-white" />}
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <h3 className={`font-bold ${isCurrent ? "text-pink-500" : "text-offwhite"}`}>{song.title}</h3>
                                        <p className="text-sm text-neutral-500">{song.artist || "Unknown Artist"}</p>
                                    </div>

                                    <div className="text-xs text-neutral-600 font-mono">
                                        {song.durationSec ? `${Math.floor(song.durationSec / 60)}:${(song.durationSec % 60).toString().padStart(2, '0')}` : "3:14"}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
