"use client";

import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";

export default function PlushiesPage() {
    // In production, this would fetch from Firestore
    const plushies: never[] = [];

    return (
        <PageShell maxWidth="xl">
            <PageHeader
                title="plushie family"
                emoji="🧸"
                subtitle="yes they all have names. yes they're all important."
            >
                {plushies.length > 0 && (
                    <p
                        className="text-sm font-mono"
                        style={{ color: "var(--text-muted)" }}
                    >
                        current count: {plushies.length} (and growing)
                    </p>
                )}
            </PageHeader>

            {/* Content or Empty State */}
            {plushies.length === 0 ? (
                <EmptyState
                    icon="🧸"
                    iconAlt="Teddy bear"
                    title="The plushie family awaits"
                    ownerCTA={{
                        label: "Add your first plushie",
                        href: "/aki/plushies/new",
                    }}
                    publicMessage="the collection is being curated..."
                    personality="every plushie has a backstory"
                    size="lg"
                />
            ) : (
                <div className="card-grid">
                    {/* Plushies would render here when available */}
                </div>
            )}
        </PageShell>
    );
}
