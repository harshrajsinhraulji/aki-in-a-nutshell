import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Aki's Music 🎵",
    description: "Playlists, current obsessions, and the songs that live rent-free in Aki's head.",
};

// Mock songs - will come from Firestore in Wave 7
const mockSongs = [
    {
        id: "1",
        title: "late night drive",
        artist: "unknown indie artist",
        mood: "2am vibes",
        isPlaying: false,
    },
    {
        id: "2",
        title: "melancholy sunshine",
        artist: "probably japanese",
        mood: "rainy day",
        isPlaying: false,
    },
    {
        id: "3",
        title: "static dreams",
        artist: "bedroom producer",
        mood: "dissociating",
        isPlaying: false,
    },
];

export default function MusicPage() {
    return (
        <div className="min-h-screen px-4 py-12">
            <div className="max-w-3xl mx-auto">
                {/* Page Header */}
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                        <span style={{ color: "#FF6CA4" }}>music</span> 🎵
                    </h1>
                    <p className="text-lg" style={{ color: "rgba(18, 18, 18, 0.7)" }}>
                        songs that live rent-free in my head
                    </p>
                </header>

                {/* Now Playing Placeholder */}
                <div className="glass rounded-2xl p-8 mb-8 text-center">
                    <div
                        className="w-32 h-32 mx-auto rounded-2xl mb-6 flex items-center justify-center text-6xl"
                        style={{ backgroundColor: "rgba(255, 108, 164, 0.2)" }}
                    >
                        🎧
                    </div>
                    <h2 className="text-xl font-heading font-semibold mb-2" style={{ color: "#121212" }}>
                        audio player coming soon
                    </h2>
                    <p className="text-sm" style={{ color: "rgba(18, 18, 18, 0.5)" }}>
                        (wave 7 will bring the vibes)
                    </p>

                    {/* Fake Progress Bar */}
                    <div className="mt-6">
                        <div className="h-1 rounded-full" style={{ backgroundColor: "rgba(255, 108, 164, 0.2)" }}>
                            <div
                                className="h-full rounded-full"
                                style={{ width: "35%", backgroundColor: "#FF6CA4" }}
                            />
                        </div>
                        <div className="flex justify-between text-xs mt-2" style={{ color: "rgba(18, 18, 18, 0.5)" }}>
                            <span>1:24</span>
                            <span>3:45</span>
                        </div>
                    </div>
                </div>

                {/* Playlist */}
                <div className="glass rounded-2xl p-6">
                    <h3 className="text-lg font-heading font-semibold mb-4" style={{ color: "#121212" }}>
                        current rotation 🔄
                    </h3>
                    <div className="space-y-3">
                        {mockSongs.map((song, i) => (
                            <div
                                key={song.id}
                                className="flex items-center gap-4 p-3 rounded-xl transition-colors hover:bg-white/50"
                            >
                                <span className="text-sm font-mono" style={{ color: "rgba(18, 18, 18, 0.5)" }}>
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <div className="flex-1">
                                    <p className="font-medium" style={{ color: "#121212" }}>{song.title}</p>
                                    <p className="text-sm" style={{ color: "rgba(18, 18, 18, 0.5)" }}>{song.artist}</p>
                                </div>
                                <span
                                    className="px-2 py-1 rounded-full text-xs"
                                    style={{ backgroundColor: "rgba(255, 226, 122, 0.3)", color: "#121212" }}
                                >
                                    {song.mood}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center mt-8">
                    <p className="text-sm font-mono" style={{ color: "rgba(18, 18, 18, 0.5)" }}>
                        ✦ playlists updated at random intervals ✦
                    </p>
                </div>
            </div>
        </div>
    );
}
