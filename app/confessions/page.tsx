"use client";

import { useState, useEffect } from "react";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { MessageSquarePlus } from "lucide-react";
import { ConfessionModal } from "@/components/confession-modal";

type Confession = {
    id: string;
    body: string;
    createdAt: any;
};

export default function ConfessionsPage() {
    const [confessions, setConfessions] = useState<Confession[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        async function fetchConfessions() {
            try {
                const q = query(
                    collection(db, "confessions"),
                    where("status", "==", "approved"),
                    orderBy("createdAt", "desc"),
                    limit(20)
                );
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Confession));
                setConfessions(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        fetchConfessions();
    }, []);

    return (
        <div className="min-h-screen pt-24 pb-20 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-heading font-bold text-pink-500 mb-2">Confessions</h1>
                        <p className="text-neutral-400">Anonymous whispers from the void.</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="mt-6 md:mt-0 flex items-center gap-2 bg-dark border border-pink-500 text-pink-500 px-6 py-3 rounded-2xl hover:bg-pink-500 hover:text-white transition-all"
                    >
                        <MessageSquarePlus size={20} />
                        <span>Confess</span>
                    </button>
                </div>

                {loading ? (
                    <p className="text-center text-neutral-500">Loading whispers...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {confessions.map((c) => (
                            <div key={c.id} className="bg-dark/50 border border-neutral-800 p-6 rounded-3xl hover:border-pink-500/30 transition-colors">
                                <p className="text-offwhite mb-4 font-body leading-relaxed">"{c.body}"</p>
                                <div className="text-xs text-neutral-500 text-right">
                                    {/* Format time roughly */}
                                    Just now
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {showModal && <ConfessionModal onClose={() => setShowModal(false)} />}
        </div>
    );
}
