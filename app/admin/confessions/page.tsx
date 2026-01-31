"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, getDocs, doc, updateDoc } from "firebase/firestore";
import { Check, X, AlertTriangle } from "lucide-react";
import { format } from "date-fns";

export default function AdminConfessionsPage() {
    const [pending, setPending] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPending = async () => {
        setLoading(true);
        const q = query(collection(db, "confessions"), where("status", "==", "pending"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        setPending(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
    };

    useEffect(() => {
        fetchPending();
    }, []);

    const handleAction = async (id: string, action: "approved" | "rejected") => {
        await updateDoc(doc(db, "confessions", id), { status: action });
        // Optimistic update
        setPending(prev => prev.filter(p => p.id !== id));
    };

    if (loading) return <div>Loading queue...</div>;

    return (
        <div>
            <h1 className="text-3xl font-heading font-bold mb-8">Moderation Queue</h1>

            {pending.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground border border-dashed border-white/10 rounded-2xl">
                    All caught up! The void is clean.
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {pending.map(confession => (
                        <div key={confession.id} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-xs font-mono text-white/30">
                                        {confession.createdAt?.seconds ? format(new Date(confession.createdAt.seconds * 1000), "PP p") : "Just now"}
                                    </span>
                                    {confession.flags > 0 && (
                                        <span className="px-2 py-0.5 bg-red-500/20 text-red-300 text-xs rounded uppercase font-bold flex items-center gap-1">
                                            <AlertTriangle size={12} /> Flagged
                                        </span>
                                    )}
                                </div>
                                <p className="text-lg leading-relaxed">{confession.body}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => handleAction(confession.id, "rejected")}
                                    className="p-3 rounded-full hover:bg-red-500/20 hover:text-red-400 transition"
                                    title="Reject"
                                >
                                    <X size={20} />
                                </button>
                                <button
                                    onClick={() => handleAction(confession.id, "approved")}
                                    className="p-3 bg-mint/20 text-mint rounded-full hover:bg-mint/30 transition shadow-[0_0_15px_rgba(0,230,168,0.2)]"
                                    title="Approve"
                                >
                                    <Check size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
