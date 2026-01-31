"use client";

import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";

export default function MusicPage() {
    // In production, this would fetch from Firestore
    const songs: never[] = [];

    return (
        <PageShell maxWidth="lg">
            <PageHeader
                title="music"
                emoji="🎵"
                subtitle="songs that live rent-free in my head"
            />

            {/* Content or Empty State */}
            {songs.length === 0 ? (
                <EmptyState
                    icon="🎧"
                    iconAlt="Headphones"
                    title="The playlist is empty"
                    ownerCTA={{
                        label: "Add your first song",
                        href: "/aki/music/new",
                    }}
                    publicMessage="the vibes are loading..."
                    personality="probably something lo-fi or sad"
                    size="lg"
                />
            ) : (
                <div className="glass rounded-2xl p-6">
                    {/* Playlist would render here when available */}
                </div>
            )}
        </PageShell>
    );
}
