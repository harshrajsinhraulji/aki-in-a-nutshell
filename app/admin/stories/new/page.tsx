"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewStoryPage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);

    // Form State
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [body, setBody] = useState("");
    const [coverUrl, setCoverUrl] = useState("");

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await addDoc(collection(db, "stories"), {
                title,
                slug,
                excerpt,
                bodyMarkdown: body,
                coverUrl,
                tags: [],
                readTime: Math.ceil(body.split(" ").length / 200),
                publishedAt: new Date().toISOString(),
                isDraft: false
            });
            router.push("/admin/stories");
        } catch (e) {
            console.error(e);
            alert("Failed to save");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-4xl">
            <Link href="/admin/stories" className="inline-flex items-center text-sm text-muted-foreground hover:text-white mb-6">
                <ArrowLeft size={16} className="mr-1" /> Back to list
            </Link>

            <h1 className="text-3xl font-heading font-bold mb-8">Write Story</h1>

            <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold">Title</label>
                        <input
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-lg font-bold"
                            value={title}
                            onChange={e => {
                                setTitle(e.target.value);
                                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
                            }}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold">Slug</label>
                        <input
                            className="w-full bg-black/20 border border-white/10 rounded-lg p-3 font-mono text-sm"
                            value={slug}
                            onChange={e => setSlug(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold">Excerpt</label>
                    <textarea
                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3 h-20"
                        value={excerpt}
                        onChange={e => setExcerpt(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold">Cover URL</label>
                    <input
                        className="w-full bg-black/20 border border-white/10 rounded-lg p-3"
                        value={coverUrl}
                        onChange={e => setCoverUrl(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold">Markdown Content</label>
                    <textarea
                        className="w-full bg-black/20 border border-white/10 rounded-lg p-4 h-[400px] font-mono text-sm leading-relaxed"
                        value={body}
                        onChange={e => setBody(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="bg-primary text-white font-bold py-4 px-8 rounded-xl flex items-center gap-2 hover:scale-105 transition-transform"
                >
                    <Save size={20} />
                    {saving ? "Publishing..." : "Publish Story"}
                </button>
            </form>
        </div>
    );
}
