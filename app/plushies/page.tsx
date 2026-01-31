import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Aki's Plushie Family 🧸",
    description: "Meet all of Aki's plushies. Yes, they all have names. Yes, they're all important.",
};

// Placeholder plushie data - will come from Firestore in Wave 8
const mockPlushies = [
    {
        id: "1",
        name: "Mr. Whiskers",
        type: "cat",
        emoji: "🐱",
        acquired: "2015",
        story: "my first plushie. been through everything.",
        mood: "wise",
    },
    {
        id: "2",
        name: "Boba",
        type: "bear",
        emoji: "🐻",
        acquired: "2020",
        story: "got them during lockdown. best impulse buy ever.",
        mood: "cozy",
    },
    {
        id: "3",
        name: "Pixel",
        type: "bunny",
        emoji: "🐰",
        acquired: "2023",
        story: "someone gave this to me. still not sure who.",
        mood: "mysterious",
    },
    {
        id: "4",
        name: "Mochi",
        type: "seal",
        emoji: "🦭",
        acquired: "2024",
        story: "round. soft. perfect.",
        mood: "sleepy",
    },
];

export default function PlushiesPage() {
    return (
        <div className="min-h-screen px-4 py-12">
            <div className="max-w-5xl mx-auto">
                {/* Page Header */}
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                        <span style={{ color: "#FF6CA4" }}>plushie</span> family 🧸
                    </h1>
                    <p className="text-lg" style={{ color: "rgba(18, 18, 18, 0.7)" }}>
                        yes they all have names. yes they&apos;re all important.
                    </p>
                    <p className="text-sm font-mono mt-2" style={{ color: "rgba(18, 18, 18, 0.5)" }}>
                        current count: {mockPlushies.length} (and growing)
                    </p>
                </header>

                {/* Plushies Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockPlushies.map((plushie) => (
                        <article
                            key={plushie.id}
                            className="glass rounded-2xl p-6 text-center transition-transform hover:scale-105"
                        >
                            <div className="text-6xl mb-4">{plushie.emoji}</div>
                            <h2 className="text-xl font-heading font-semibold mb-1" style={{ color: "#121212" }}>
                                {plushie.name}
                            </h2>
                            <p className="text-sm mb-3" style={{ color: "rgba(18, 18, 18, 0.5)" }}>
                                {plushie.type} • since {plushie.acquired}
                            </p>
                            <p className="text-sm mb-4" style={{ color: "rgba(18, 18, 18, 0.7)" }}>
                                &quot;{plushie.story}&quot;
                            </p>
                            <span
                                className="inline-block px-3 py-1 rounded-full text-xs"
                                style={{ backgroundColor: "rgba(0, 230, 168, 0.2)", color: "#00E6A8" }}
                            >
                                mood: {plushie.mood}
                            </span>
                        </article>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <p className="text-sm font-mono" style={{ color: "rgba(18, 18, 18, 0.5)" }}>
                        ✦ more plushies being adopted regularly ✦
                    </p>
                </div>
            </div>
        </div>
    );
}
