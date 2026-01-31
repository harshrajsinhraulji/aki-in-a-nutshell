interface FriendCardProps {
    id: string;
    name: string;
    nickname?: string;
    emoji?: string;
    since?: string;
    description?: string;
    isPublic?: boolean;
}

export default function FriendCard({
    name,
    nickname,
    emoji = "👤",
    since,
    description,
    isPublic = true,
}: FriendCardProps) {
    if (!isPublic) {
        return (
            <article className="glass rounded-2xl p-6 text-center opacity-60">
                <div className="text-4xl mb-4">🔒</div>
                <p className="text-sm" style={{ color: "rgba(18, 18, 18, 0.5)" }}>
                    private friend
                </p>
            </article>
        );
    }

    return (
        <article className="glass rounded-2xl p-6 text-center transition-transform hover:scale-105">
            <div className="text-5xl mb-4">{emoji}</div>
            <h2
                className="text-lg font-heading font-semibold mb-1"
                style={{ color: "#121212" }}
            >
                {nickname || name}
            </h2>
            {nickname && name !== nickname && (
                <p className="text-sm mb-2" style={{ color: "rgba(18, 18, 18, 0.5)" }}>
                    ({name})
                </p>
            )}
            {since && (
                <p className="text-xs mb-3" style={{ color: "rgba(18, 18, 18, 0.4)" }}>
                    friends since {since}
                </p>
            )}
            {description && (
                <p
                    className="text-sm italic"
                    style={{ color: "rgba(18, 18, 18, 0.7)" }}
                >
                    &quot;{description}&quot;
                </p>
            )}
        </article>
    );
}
