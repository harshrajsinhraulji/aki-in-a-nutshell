"use client";

import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";

export default function ConfessionsPage() {
    // In production, this would fetch from Firestore
    const confessions: never[] = [];

    return (
        <PageShell maxWidth="md">
            <PageHeader
                title="confessions"
                emoji="💭"
                subtitle="anonymous thoughts from aki's corner of the internet"
            />

            {/* Content or Empty State */}
            {confessions.length === 0 ? (
                <EmptyState
                    icon="💭"
                    iconAlt="Thought bubble"
                    title="Waiting for confessions"
                    ownerCTA={{
                        label: "Share the confessions wall",
                        href: "/aki/confessions/share",
                    }}
                    publicMessage="be the first to confess something~"
                    personality="judgment-free zone, promise"
                    size="lg"
                />
            ) : (
                <div className="space-y-4">
                    {/* Confessions would render here when available */}
                </div>
            )}
        </PageShell>
    );
}
