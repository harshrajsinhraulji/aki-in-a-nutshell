interface PlushieCardProps {
    id: string;
    name: string;
    type: string;
    emoji?: string;
    acquired?: string;
    story?: string;
    mood?: string;
    onClick?: () => void;
}

export default function PlushieCard({
    name,
    type,
    emoji = "🧸",
    acquired,
    story,
    mood,
    onClick,
}: PlushieCardProps) {
    return (
        <article
            className="glass rounded-2xl p-6 text-center transition-transform hover:scale-105 cursor-pointer"
            onClick={onClick}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
            onKeyDown={(e) => {
                if (onClick && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    onClick();
                }
            }}
        >
            <div className="text-6xl mb-4">{emoji}</div>
            <h2
                className="text-xl font-heading font-semibold mb-1"
                style={{ color: "#121212" }}
            >
                {name}
            </h2>
            <p className="text-sm mb-3" style={{ color: "rgba(18, 18, 18, 0.5)" }}>
                {type}
                {acquired && ` • since ${acquired}`}
            </p>
            {story && (
                <p
                    className="text-sm mb-4 italic"
                    style={{ color: "rgba(18, 18, 18, 0.7)" }}
                >
                    &quot;{story}&quot;
                </p>
            )}
            {mood && (
                <span
                    className="inline-block px-3 py-1 rounded-full text-xs"
                    style={{
                        backgroundColor: "rgba(0, 230, 168, 0.2)",
                        color: "#00E6A8",
                    }}
                >
                    mood: {mood}
                </span>
            )}
        </article>
    );
}
