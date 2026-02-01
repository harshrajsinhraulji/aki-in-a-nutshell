"use client";

import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { BookCard } from "@/components/BookCard";

const STORIES = [
    { slug: "first-plushie", title: "The First Plushie", date: "Jan 15", excerpt: "It was a cold Tuesday when Sir Fluffington arrived...", tag: "Memories" },
    { slug: "lost-in-london", title: "Lost in London", date: "Nov 20", excerpt: "The tube map looked like spaghetti...", tag: "Travel" },
];

export default function StoriesPage() {
    return (
        <PageShell>
            <div className="container mx-auto max-w-4xl">
                <PageHeader title="Stories" subtitle="Digital dust." />

                <div className="grid md:grid-cols-2 gap-6">
                    {STORIES.map((story, i) => (
                        <motion.div
                            key={story.slug}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link href={`/stories/${story.slug}`} className="block group h-full">
                                <BookCard coverColor={i % 2 === 0 ? "bg-aki-purple" : "bg-aki-pink"}>
                                    <div className="h-full flex flex-col justify-between">
                                        <div className="absolute top-0 right-0 p-8">
                                            <ArrowUpRight className="text-aki-purple" />
                                        </div>

                                        <div>
                                            <span className="text-xs font-bold uppercase tracking-widest text-aki-purple/70 mb-4 block">
                                                {story.tag}
                                            </span>

                                            <h2 className="text-3xl font-heading font-light text-white mb-4 leading-tight">
                                                {story.title}
                                            </h2>

                                            <p className="text-luminous-300 font-light leading-relaxed text-sm">
                                                {story.excerpt}
                                            </p>
                                        </div>

                                        <div className="pt-6 mt-auto border-t border-white/5 flex justify-between text-xs text-luminous-500 font-mono uppercase tracking-wider">
                                            <span>{story.date}</span>
                                            <span>Read Entry</span>
                                        </div>
                                    </div>
                                </BookCard>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </PageShell>
    );
}
