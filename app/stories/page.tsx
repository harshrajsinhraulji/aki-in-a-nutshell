"use client";

import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";

export default function StoriesPage() {
    // In production, this would fetch from Firestore
    const stories: never[] = [];

    return (
        <PageShell maxWidth="lg">
            <PageHeader
                title="stories"
                emoji="📖"
                subtitle="late-night thoughts & unfiltered brain dumps"
            />

            {/* Content or Empty State */}
            {stories.length === 0 ? (
                <EmptyState
                    icon="📖"
                    iconAlt="Open book"
                    title="Your first story awaits"
                    ownerCTA={{
                        label: "Write your first story",
                        href: "/aki/stories/new",
                    }}
                    publicMessage="stories are brewing..."
                    personality="3am thoughts hit different"
                    size="lg"
                />
            ) : (
                <div className="card-grid">
                    {/* Stories would render here when available */}
                </div>
            )}
        </PageShell>
    );
}
