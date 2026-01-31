import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Confessions 💭",
    description: "Anonymous confessions from Aki's corner of the internet.",
};

// Mock confessions - will come from Firestore in Wave 6
const mockConfessions = [
    {
        id: "1",
        content: "i pretend to like coffee but i actually hate it. everyone just assumes i drink it.",
        timestamp: "2 hours ago",
        reactions: { "💀": 12, "😭": 8, "🤝": 5 },
    },
    {
        id: "2",
        content: "sometimes i talk to my plushies out loud and forget my door is open.",
        timestamp: "5 hours ago",
        reactions: { "😭": 24, "🫂": 15, "✨": 9 },
    },
    {
        id: "3",
        content: "i've had the same song on repeat for 3 weeks and i still haven't told anyone about it.",
        timestamp: "1 day ago",
        reactions: { "🎵": 18, "🤝": 11, "💀": 7 },
    },
];

export default function ConfessionsPage() {
    return (
        <div className="min-h-screen px-4 py-12">
            <div className="max-w-2xl mx-auto">
                {/* Page Header */}
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                        <span style={{ color: "#FF6CA4" }}>confessions</span> 💭
                    </h1>
                    <p className="text-lg" style={{ color: "rgba(18, 18, 18, 0.7)" }}>
                        anonymous thoughts from aki&apos;s corner of the internet
                    </p>
                </header>

                {/* Submit Form Placeholder */}
                <div className="glass rounded-2xl p-6 mb-8">
                    <textarea
                        placeholder="confess something... (it's anonymous, promise)"
                        className="w-full p-4 rounded-xl border-2 border-transparent focus:border-pink-300 bg-white/50 resize-none"
                        style={{ minHeight: "100px" }}
                        disabled
                    />
                    <div className="flex justify-between items-center mt-4">
                        <p className="text-xs" style={{ color: "rgba(18, 18, 18, 0.5)" }}>
                            be kind. no hate allowed.
                        </p>
                        <button
                            className="btn-primary opacity-50 cursor-not-allowed"
                            disabled
                        >
                            confess ✨
                        </button>
                    </div>
                    <p className="text-center text-sm mt-4 font-mono" style={{ color: "rgba(18, 18, 18, 0.5)" }}>
                        (submissions coming in wave 6)
                    </p>
                </div>

                {/* Confessions List */}
                <div className="space-y-4">
                    {mockConfessions.map((confession) => (
                        <article key={confession.id} className="glass rounded-2xl p-6">
                            <p className="text-lg mb-4" style={{ color: "#121212" }}>
                                &quot;{confession.content}&quot;
                            </p>
                            <div className="flex justify-between items-center">
                                <span className="text-sm" style={{ color: "rgba(18, 18, 18, 0.5)" }}>
                                    {confession.timestamp}
                                </span>
                                <div className="flex gap-2">
                                    {Object.entries(confession.reactions).map(([emoji, count]) => (
                                        <button
                                            key={emoji}
                                            className="px-2 py-1 rounded-full text-sm"
                                            style={{ backgroundColor: "rgba(255, 108, 164, 0.1)" }}
                                        >
                                            {emoji} {count}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
