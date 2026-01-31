import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Aki's Stories 📖",
    description: "Late-night thoughts, random rants, and stories from Aki's brain.",
};

// Placeholder story data - will be replaced with Firestore in Wave 3
const mockStories = [
    {
        id: "1",
        title: "why 3am hits different",
        excerpt: "there's something about the silence that makes everything feel more real...",
        date: "2026-01-15",
        mood: "contemplative",
        emoji: "🌙",
    },
    {
        id: "2",
        title: "an ode to my oldest plushie",
        excerpt: "mr. whiskers has been through everything with me. yes, i'm writing about a cat plushie.",
        date: "2026-01-10",
        mood: "nostalgic",
        emoji: "🧸",
    },
    {
        id: "3",
        title: "the playlist theory",
        excerpt: "you can tell everything about a person by their spotify wrapped. here's mine.",
        date: "2026-01-05",
        mood: "chaotic",
        emoji: "🎵",
    },
];

export default function StoriesPage() {
    return (
        <div className="min-h-screen px-4 py-12">
            <div className="max-w-4xl mx-auto">
                {/* Page Header */}
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                        <span style={{ color: "#FF6CA4" }}>stories</span> 📖
                    </h1>
                    <p className="text-lg" style={{ color: "rgba(18, 18, 18, 0.7)" }}>
                        late-night thoughts & unfiltered brain dumps
                    </p>
                </header>

                {/* Stories Grid */}
                <div className="space-y-6">
                    {mockStories.map((story) => (
                        <article
                            key={story.id}
                            className="glass rounded-2xl p-6 transition-transform hover:scale-[1.02]"
                        >
                            <Link href={`/stories/${story.id}`} className="block">
                                <div className="flex items-start gap-4">
                                    <span className="text-4xl">{story.emoji}</span>
                                    <div className="flex-1">
                                        <h2 className="text-xl font-heading font-semibold mb-2" style={{ color: "#121212" }}>
                                            {story.title}
                                        </h2>
                                        <p className="mb-3" style={{ color: "rgba(18, 18, 18, 0.7)" }}>
                                            {story.excerpt}
                                        </p>
                                        <div className="flex items-center gap-4 text-sm" style={{ color: "rgba(18, 18, 18, 0.5)" }}>
                                            <span>{story.date}</span>
                                            <span
                                                className="px-2 py-1 rounded-full text-xs"
                                                style={{ backgroundColor: "rgba(255, 108, 164, 0.2)", color: "#FF6CA4" }}
                                            >
                                                {story.mood}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>

                {/* Empty State Placeholder */}
                <div className="text-center mt-12">
                    <p className="text-sm font-mono" style={{ color: "rgba(18, 18, 18, 0.5)" }}>
                        ✦ more stories brewing in my brain at 2am ✦
                    </p>
                </div>
            </div>
        </div>
    );
}
