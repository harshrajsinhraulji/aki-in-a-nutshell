"use client";

import { useAudio, PLAYLIST, Song } from "@/lib/audio-context";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPage() {
    const {
        isPlaying,
        togglePlay,
        currentTrack,
        playTrack,
        nextTrack,
        prevTrack,
        volume,
        setVolume,
        playlist
    } = useAudio();

    return (
        <PageShell>
            <div className="container mx-auto max-w-3xl">
                <PageHeader title="Aki's Mixtape" subtitle="The soundtrack to my existence." />

                {/* Now Playing Card */}
                <AnimatePresence mode="wait">
                    {currentTrack && (
                        <motion.div
                            key={currentTrack.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="mb-8 p-6 rounded-3xl bg-gradient-to-br from-aki-pink/20 via-aki-purple/10 to-transparent backdrop-blur-xl border border-white/20 shadow-2xl shadow-aki-pink/10"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <p className="text-xs font-mono uppercase tracking-widest text-aki-pink mb-2">Now Playing</p>
                                    <h2 className="text-2xl font-heading font-bold text-foreground mb-1">{currentTrack.title}</h2>
                                    <p className="text-sm text-muted-foreground">{currentTrack.artist}</p>
                                </div>

                                {/* Controls */}
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={prevTrack}
                                        className="p-2 rounded-full hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
                                    >
                                        <SkipBack size={20} />
                                    </button>
                                    <button
                                        onClick={togglePlay}
                                        className="w-14 h-14 rounded-full bg-aki-pink text-white flex items-center justify-center shadow-lg shadow-aki-pink/30 hover:scale-105 transition-transform"
                                    >
                                        {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                                    </button>
                                    <button
                                        onClick={nextTrack}
                                        className="p-2 rounded-full hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
                                    >
                                        <SkipForward size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Volume Slider */}
                            <div className="mt-4 flex items-center gap-3">
                                <Volume2 size={16} className="text-muted-foreground" />
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                                    className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-aki-pink"
                                />
                            </div>

                            {/* Animated bars */}
                            {isPlaying && (
                                <div className="flex gap-1 h-4 items-end justify-center mt-4">
                                    {[1, 2, 3, 4, 5].map(bar => (
                                        <motion.div
                                            key={bar}
                                            animate={{ height: ["20%", "100%", "40%", "80%", "20%"] }}
                                            transition={{ repeat: Infinity, duration: 1.2, delay: bar * 0.1 }}
                                            className="w-1 bg-aki-pink rounded-full"
                                        />
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Playlist */}
                <div className="space-y-2">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
                        Playlist • {playlist.length} tracks
                    </h3>
                    {playlist.map((song, i) => {
                        const isCurrentSong = currentTrack?.id === song.id;
                        return (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.03 }}
                                key={song.id}
                                onClick={() => playTrack(song)}
                                className={`group p-4 rounded-2xl flex items-center justify-between cursor-pointer transition-all duration-300 ${isCurrentSong
                                        ? "bg-gradient-to-r from-aki-pink/15 to-transparent border border-aki-pink/30"
                                        : "hover:bg-white/5 border border-transparent hover:border-white/10"
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    {/* Track Number / Play Icon */}
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono transition-all ${isCurrentSong
                                            ? "bg-aki-pink text-white"
                                            : "bg-white/5 text-muted-foreground group-hover:bg-aki-pink/20 group-hover:text-aki-pink"
                                        }`}>
                                        {isCurrentSong && isPlaying ? (
                                            <div className="flex gap-0.5 h-3 items-end">
                                                {[1, 2, 3].map(bar => (
                                                    <motion.div
                                                        key={bar}
                                                        animate={{ height: ["30%", "100%", "30%"] }}
                                                        transition={{ repeat: Infinity, duration: 0.8, delay: bar * 0.1 }}
                                                        className="w-0.5 bg-white rounded-full"
                                                    />
                                                ))}
                                            </div>
                                        ) : (
                                            <span>{i + 1}</span>
                                        )}
                                    </div>

                                    <div>
                                        <h3 className={`font-medium ${isCurrentSong ? "text-aki-pink" : "text-foreground"}`}>
                                            {song.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">{song.artist}</p>
                                    </div>
                                </div>

                                {/* Play button on hover */}
                                <div className={`opacity-0 group-hover:opacity-100 transition-opacity ${isCurrentSong ? "opacity-100" : ""}`}>
                                    {isCurrentSong && isPlaying ? (
                                        <Pause size={18} className="text-aki-pink" />
                                    ) : (
                                        <Play size={18} className="text-muted-foreground group-hover:text-aki-pink" />
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </PageShell>
    );
}
