import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Aki ✨",
    description: "Get to know Aki — the late-night dreamer, plushie collector, and messy-cute enthusiast.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen px-4 py-12">
            <div className="max-w-4xl mx-auto">
                {/* Page Header */}
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                        <span style={{ color: "#FF6CA4" }}>about</span> me 🌙
                    </h1>
                    <p className="text-lg" style={{ color: "rgba(18, 18, 18, 0.7)" }}>
                        the unfiltered, messy-cute version
                    </p>
                </header>

                {/* Bio Section */}
                <section className="glass rounded-2xl p-8 mb-8">
                    <h2 className="text-2xl font-heading font-semibold mb-4" style={{ color: "#121212" }}>
                        hi, i&apos;m aki! ✨
                    </h2>
                    <div className="space-y-4" style={{ color: "rgba(18, 18, 18, 0.8)" }}>
                        <p>
                            born in 2008, currently spending way too much time online and not enough time sleeping.
                            my room is full of plushies (they have names, yes), and i have a lot of late-night thoughts
                            that probably shouldn&apos;t be shared but here we are.
                        </p>
                        <p>
                            i like: soft things, 2am conversations, niche music, and pretending i have my life together.
                        </p>
                        <p>
                            i don&apos;t like: mornings, being perceived (ironic given this website), and when my favorite
                            songs get too popular.
                        </p>
                    </div>
                </section>

                {/* Fun Facts */}
                <section className="glass rounded-2xl p-8 mb-8">
                    <h2 className="text-2xl font-heading font-semibold mb-6" style={{ color: "#121212" }}>
                        random facts 🎲
                    </h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                        {[
                            "🧸 i have 47 plushies (and counting)",
                            "🌙 my best ideas come at 3am",
                            "🎵 i make playlists for every mood",
                            "☕ matcha > coffee (fight me)",
                            "📖 i write stories no one reads",
                            "💭 overthinker extraordinaire",
                        ].map((fact, i) => (
                            <li
                                key={i}
                                className="p-4 rounded-xl"
                                style={{ backgroundColor: "rgba(255, 108, 164, 0.1)" }}
                            >
                                {fact}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Current Vibe */}
                <section className="text-center">
                    <p className="text-sm font-mono" style={{ color: "rgba(18, 18, 18, 0.5)" }}>
                        current vibe: ✨ chaotic neutral ✨
                    </p>
                </section>
            </div>
        </div>
    );
}
