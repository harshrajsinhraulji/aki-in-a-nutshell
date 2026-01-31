"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Loader2, Trash2, Plus, GripVertical } from "lucide-react";

export default function AdminPlushiesPage() {
    const [plushies, setPlushies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

    // Form inputs
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [tags, setTags] = useState("");
    const [coverUrl, setCoverUrl] = useState("");

    const fetchPlushies = async () => {
        setLoading(true);
        const q = query(collection(db, "plushies"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        setPlushies(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
    };

    useEffect(() => {
        fetchPlushies();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsCreating(true);
        try {
            await addDoc(collection(db, "plushies"), {
                name,
                description: desc,
                coverUrl,
                tags: tags.split(",").map(t => t.trim()),
                isPublic: true,
                moodLog: [],
                createdAt: new Date() // In real app use serverTimestamp()
            });
            // Reset
            setName("");
            setDesc("");
            setTags("");
            setCoverUrl("");
            fetchPlushies();
        } catch (e) {
            console.error(e);
        } finally {
            setIsCreating(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this plushie?")) return;
        await deleteDoc(doc(db, "plushies", id));
        setPlushies(prev => prev.filter(p => p.id !== id));
    };

    return (
        <div className="max-w-4xl">
            <h1 className="text-3xl font-heading font-bold mb-8">Manage Plushies</h1>

            {/* Create Form */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-12">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Plus size={18} /> Summon New Plushie
                </h3>
                <form onSubmit={handleCreate} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            className="bg-black/20 border border-white/10 rounded-lg p-3"
                            placeholder="Name (e.g. Mr. Snuggles)"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                        <input
                            className="bg-black/20 border border-white/10 rounded-lg p-3"
                            placeholder="Cover Image URL"
                            value={coverUrl}
                            onChange={e => setCoverUrl(e.target.value)}
                        />
                    </div>
                    <input
                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3"
                        placeholder="Description/Tagline"
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                        required
                    />
                    <input
                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3"
                        placeholder="Tags (comma separated)"
                        value={tags}
                        onChange={e => setTags(e.target.value)}
                    />

                    <button
                        type="submit"
                        disabled={isCreating}
                        className="bg-primary text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 disabled:opacity-50"
                    >
                        {isCreating ? <Loader2 className="animate-spin" /> : "Create"}
                    </button>
                </form>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 gap-4">
                {plushies.map(p => (
                    <div key={p.id} className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl">
                        <div className="w-16 h-16 bg-black/40 rounded-lg relative overflow-hidden">
                            {p.coverUrl && <img src={p.coverUrl} className="object-cover w-full h-full" />}
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-lg">{p.name}</h4>
                            <p className="text-sm text-muted-foreground">{p.description}</p>
                            <div className="flex gap-1 mt-1">
                                {p.tags?.map((t: string) => (
                                    <span key={t} className="text-xs bg-white/10 px-1 rounded">{t}</span>
                                ))}
                            </div>
                        </div>
                        <button
                            onClick={() => handleDelete(p.id)}
                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
