import Link from "next/link";

interface StoryCardProps {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    mood?: string;
    emoji?: string;
}

export default function StoryCard({
    id,
    title,
    excerpt,
    date,
    mood = "reflective",
    emoji = "📖",
}: StoryCardProps) {
    return (
        <article className="glass rounded-2xl p-6 transition-transform hover:scale-[1.02]">
            <Link href={`/stories/${id}`} className="block">
                <div className="flex items-start gap-4">
                    <span className="text-4xl flex-shrink-0">{emoji}</span>
                    <div className="flex-1 min-w-0">
                        <h2
                            className="text-xl font-heading font-semibold mb-2 truncate"
                            style={{ color: "#121212" }}
                        >
                            {title}
                        </h2>
                        <p
                            className="mb-3 line-clamp-2"
                            style={{ color: "rgba(18, 18, 18, 0.7)" }}
                        >
                            {excerpt}
                        </p>
                        <div
                            className="flex items-center gap-4 text-sm"
                            style={{ color: "rgba(18, 18, 18, 0.5)" }}
                        >
                            <span>{date}</span>
                            {mood && (
                                <span
                                    className="px-2 py-1 rounded-full text-xs"
                                    style={{
                                        backgroundColor: "rgba(255, 108, 164, 0.2)",
                                        color: "#FF6CA4",
                                    }}
                                >
                                    {mood}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </article>
    );
}
