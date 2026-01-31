"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs, doc, updateDoc, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Check, X, AlertTriangle } from "lucide-react";

export function AdminConfessions() {
    const [pending, setPending] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPending = async () => {
        setLoading(true);
        const q = query(
            collection(db, "confessions"),
            where("status", "==", "pending"),
            orderBy("createdAt", "desc")
        );
        const snap = await getDocs(q);
        setPending(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        setLoading(false);
    };

    useEffect(() => {
        fetchPending();
    }, []);

    const handleAction = async (id: string, action: "approved" | "rejected") => {
        await updateDoc(doc(db, "confessions", id), {
            status: action
        });
        setPending(prev => prev.filter(p => p.id !== id));
    };

    if (loading) return <div>Loading queue...</div>;

    if (pending.length === 0) return <div className="text-neutral-500">No pending confessions. Good job!</div>;

    return (
        <div className="space-y-4">
            {pending.map((confession) => (
                <div key={confession.id} className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl flex flex-col md:flex-row gap-4 items-start justify-between">
                    <div className="flex-1">
                        {confession.flags > 0 && (
                            <div className="flex items-center gap-2 text-red-400 text-xs mb-2 font-bold uppercase tracking-wider">
                                <AlertTriangle size={12} /> Flagged Content
                            </div>
                        )}
                        <p className="text-offwhite whitespace-pre-wrap">{confession.body}</p>
                        <p className="text-xs text-neutral-500 mt-2">
                            {confession.createdAt?.seconds ? new Date(confession.createdAt.seconds * 1000).toLocaleString() : "Just now"}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleAction(confession.id, "rejected")}
                            className="bg-red-500/10 hover:bg-red-500/20 text-red-500 p-3 rounded-xl transition"
                            title="Reject"
                        >
                            <X size={20} />
                        </button>
                        <button
                            onClick={() => handleAction(confession.id, "approved")}
                            className="bg-green-500/10 hover:bg-green-500/20 text-green-500 p-3 rounded-xl transition"
                            title="Approve"
                        >
                            <Check size={20} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
