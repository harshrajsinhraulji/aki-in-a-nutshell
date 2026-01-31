"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { format } from "date-fns";

type Story = {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    coverUrl: string;
    publishedAt: any;
    tags: string[];
};

export default function StoriesPage() {
    const [stories, setStories] = useState<Story[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStories() {
            try {
                const q = query(collection(db, "stories"), orderBy("publishedAt", "desc"), limit(20));
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Story));
                setStories(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        fetchStories();
    }, []);

    return (
        <div className="min-h-screen pt-24 pb-20 px-4">
            <div className="container mx-auto max-w-5xl">
                <h1 className="text-4xl md:text-6xl font-heading font-bold text-pink-500 mb-2">Late Night Thoughts</h1>
                <p className="text-neutral-400 mb-12">Travel logs, scars, and sleepy ramblings.</p>

                {loading ? (
                    <div className="text-center text-neutral-500">Loading stories...</div>
                ) : (
                    <div className="space-y-12">
                        {stories.map(story => (
                            <article key={story.id} className="flex flex-col md:flex-row gap-8 items-start group">
                                <Link href={`/stories/${story.slug}`} className="w-full md:w-1/3 aspect-[4/3] bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-800 group-hover:border-pink-500 transition-all">
                                    <img src={story.coverUrl} alt={story.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </Link>
                                <div className="w-full md:w-2/3">
                                    <div className="flex gap-2 mb-3">
                                        {story.tags?.map(tag => (
                                            <span key={tag} className="text-xs uppercase tracking-wider text-pink-500 border border-pink-500/30 px-2 py-1 rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <Link href={`/stories/${story.slug}`}>
                                        <h2 className="text-3xl font-heading font-bold text-offwhite mb-3 group-hover:text-pink-500 transition">{story.title}</h2>
                                    </Link>
                                    <p className="text-neutral-400 leading-relaxed mb-4">{story.excerpt}</p>
                                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                                        <Calendar size={14} />
                                        {/* Need check if publishedAt is Timestamp or string */}
                                        {story.publishedAt?.seconds ? format(new Date(story.publishedAt.seconds * 1000), "MMM d, yyyy") : "Recently"}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
