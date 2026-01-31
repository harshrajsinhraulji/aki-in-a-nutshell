"use client";

import { useState, useEffect } from "react";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { format } from "date-fns";

export default function StoryDetail({ params }: { params: { slug: string } }) {
    const [story, setStory] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStory() {
            try {
                const q = query(collection(db, "stories"), where("slug", "==", params.slug), limit(1));
                const snapshot = await getDocs(q);
                if (!snapshot.empty) {
                    setStory(snapshot.docs[0].data());
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        fetchStory();
    }, [params.slug]);

    if (loading) return <div className="min-h-screen pt-32 text-center text-neutral-500">Loading...</div>;
    if (!story) return <div className="min-h-screen pt-32 text-center text-red-500">Story not found.</div>;

    return (
        <article className="min-h-screen pt-24 pb-20">
            {/* Hero Cover */}
            <div className="w-full h-[50vh] relative mb-12">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark z-10" />
                <img src={story.coverUrl} alt={story.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 w-full p-6 z-20 container mx-auto">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-offwhite mb-4 shadow-black drop-shadow-lg">{story.title}</h1>
                    <div className="flex gap-4 text-neutral-300 text-sm">
                        <span>{story.publishedAt?.seconds ? format(new Date(story.publishedAt.seconds * 1000), "MMMM d, yyyy") : ""}</span>
                        <span>•</span>
                        <span>{story.tags?.join(", ")}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-3xl px-4 prose prose-invert prose-pink prose-lg">
                <Markdown remarkPlugins={[remarkGfm]}>{story.bodyMarkdown}</Markdown>
            </div>
        </article>
    );
}
