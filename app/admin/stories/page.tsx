"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { Loader2, Trash2, Plus, Edit } from "lucide-react";
import Link from "next/link";

export default function AdminStoriesPage() {
    const [stories, setStories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchStories = async () => {
        setLoading(true);
        const q = query(collection(db, "stories"), orderBy("publishedAt", "desc"));
        const snapshot = await getDocs(q);
        setStories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
    };

    useEffect(() => {
        fetchStories();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this story?")) return;
        await deleteDoc(doc(db, "stories", id));
        setStories(prev => prev.filter(s => s.id !== id));
    };

    return (
        <div className="max-w-4xl">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-heading font-bold">Manage Stories</h1>
                <Link href="/admin/stories/new" className="bg-primary text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                    <Plus size={18} /> New Story
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {stories.map(story => (
                    <div key={story.id} className="bg-white/5 border border-white/10 p-5 rounded-xl flex items-center justify-between group">
                        <div>
                            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{story.title}</h3>
                            <p className="text-sm text-muted-foreground">{story.excerpt}</p>
                            <div className="text-xs font-mono mt-2 opacity-50">
                                /{story.slug} • {new Date(story.publishedAt).toLocaleDateString()}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => handleDelete(story.id)}
                                className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
