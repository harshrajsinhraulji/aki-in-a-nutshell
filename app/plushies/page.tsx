"use client";

import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { PlushieCard } from "@/components/PlushieCard";

const PLUSHIES = [
    { id: "1", name: "Sir Fluffington", type: "Bear", rarity: "Legendary" },
    { id: "2", name: "Mochi", type: "Bunny", rarity: "Common" },
    { id: "3", name: "Dr. Octopus", type: "Aquatic", rarity: "Rare" },
    { id: "4", name: "Cloudy", type: "Weather", rarity: "Uncommon" },
    { id: "5", name: "Bamboo", type: "Panda", rarity: "Common" },
    { id: "6", name: "Void", type: "Unknown", rarity: "Legendary" },
];

export default function PlushiesPage() {
    return (
        <PageShell>
            <div className="container mx-auto max-w-7xl">
                <PageHeader title="Plushie Army" subtitle="The council has assembled." />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                    {PLUSHIES.map((p) => (
                        <PlushieCard key={p.id} {...p} />
                    ))}
                </div>
            </div>
        </PageShell>
    );
}
