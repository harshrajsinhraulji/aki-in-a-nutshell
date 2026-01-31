"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";
import PlushieCard from "@/components/PlushieCard";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

// Mock Data
const PLUSHIES = [
    {
        id: 1,
        name: "Sir Fluffington",
        image: "https://images.unsplash.com/photo-1559479059-8503164a275e?w=800&q=80",
        description: "A distinguished gentleman who enjoys tea parties and silence.",
        adoptedDate: "2018",
        rarity: "Legendary" as const,
        type: "Bear",
    },
    {
        id: 2,
        name: "Mochi",
        image: "https://images.unsplash.com/photo-1572535787682-1279a1d48c8b?w=800&q=80",
        description: "Squishy, round, and smells faintly of vanilla bean.",
        adoptedDate: "2020",
        rarity: "Common" as const,
        type: "Bunny",
    },
    {
        id: 3,
        name: "Dr. Octopus",
        image: "https://images.unsplash.com/photo-1570724036728-660c6f14066f?w=800&q=80",
        description: "Requires 8 hugs a day. Highly clingy.",
        adoptedDate: "2019",
        rarity: "Rare" as const,
        type: "Aquatic",
    },
    {
        id: 4,
        name: "Cloudy",
        image: "https://images.unsplash.com/photo-1555541570-5b6510a76cf3?w=800&q=80",
        description: "Soft as a cloud, but with more emotional baggage.",
        adoptedDate: "2021",
        rarity: "Uncommon" as const,
        type: "Cloud",
    },
    {
        id: 5,
        name: "Sprout",
        image: "https://images.unsplash.com/photo-1563884873111-2092cc7a2928?w=800&q=80",
        description: "A small dinosaur who believes he is a plant.",
        adoptedDate: "2022",
        rarity: "Rare" as const,
        type: "Dino",
    },
];

const FILTERS = ["All", "Bear", "Bunny", "Aquatic", "Dino", "Cloud"];

export default function PlushiesPage() {
    const [activeFilter, setActiveFilter] = useState("All");

    const filteredPlushies = activeFilter === "All"
        ? PLUSHIES
        : PLUSHIES.filter(p => p.type === activeFilter);

    return (
        <PageShell>
            <PageHeader
                title="Plushie Shelf"
                subtitle="The silent observers of my chaotic life."
                emoji="🧸"
            />

            {/* Filter Bar */}
            <div className="flex flex-wrap gap-2 justify-center mb-12">
                {FILTERS.map((filter) => (
                    <Button
                        key={filter}
                        variant={activeFilter === filter ? "primary" : "ghost"}
                        size="sm"
                        onClick={() => setActiveFilter(filter)}
                        className="rounded-full"
                    >
                        {filter}
                    </Button>
                ))}
            </div>

            {/* Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                <AnimatePresence mode="popLayout">
                    {filteredPlushies.map((plushie) => (
                        <motion.div
                            key={plushie.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <PlushieCard
                                name={plushie.name}
                                image={plushie.image}
                                description={plushie.description}
                                adoptedDate={plushie.adoptedDate}
                                rarity={plushie.rarity}
                                onInspect={() => console.log("Inspect", plushie.name)}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Empty State */}
            {filteredPlushies.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-aki-muted font-mono">No plushies found in this category.</p>
                </div>
            )}
        </PageShell>
    );
}
