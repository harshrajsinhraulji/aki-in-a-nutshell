"use client";

import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

type Plushie = {
    id: string;
    name: string;
    coverUrl: string;
    images?: string[];
    description: string;
    createdAt?: any;
    moodLog?: { ts: number; text: string }[];
};

export default function PlushieDetailPage({ params }: { params: { id: string } }) {
    const [plushie, setPlushie] = useState<Plushie | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPlushie() {
            try {
                const docRef = doc(db, "plushies", params.id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setPlushie({ id: docSnap.id, ...docSnap.data() } as Plushie);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        fetchPlushie();
    }, [params.id]);

    if (loading) return <div className="text-center pt-32 text-neutral-500">Summoning...</div>;
    if (!plushie) return <div className="text-center pt-32 text-red-500">Plushie MIA.</div>;

    return (
        <div className="min-h-screen pt-24 pb-20 px-4">
            <div className="container mx-auto max-w-4xl">
                <Link href="/plushies" className="inline-flex items-center gap-2 text-neutral-400 hover:text-pink-500 mb-8 transition">
                    <ArrowLeft size={20} /> Back to Army
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Gallery (Simple version: Cover + Grid) */}
                    <div>
                        <div className="aspect-square bg-neutral-900 rounded-3xl overflow-hidden mb-4 border border-neutral-800">
                            <img src={plushie.coverUrl} alt={plushie.name} className="w-full h-full object-cover" />
                        </div>
                        {plushie.images && plushie.images.length > 0 && (
                            <div className="grid grid-cols-4 gap-2">
                                {plushie.images.map((img, i) => (
                                    <div key={i} className="aspect-square rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800">
                                        <img src={img} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-pink-500 mb-4">{plushie.name}</h1>
                        <div className="text-sm text-neutral-500 mb-6 flex items-center gap-2">
                            <Clock size={16} />
                            Acquired {plushie.createdAt?.seconds ? format(new Date(plushie.createdAt.seconds * 1000), "MMMM yyyy") : "Unknown Date"}
                        </div>

                        <div className="bg-dark/50 border border-neutral-800 p-6 rounded-3xl mb-8">
                            <h3 className="text-lg font-bold text-offwhite mb-2">Backstory</h3>
                            <p className="text-neutral-300 leading-relaxed font-body">
                                {plushie.description}
                            </p>
                        </div>

                        {/* Mood Log */}
                        {plushie.moodLog && plushie.moodLog.length > 0 && (
                            <div>
                                <h3 className="text-lg font-bold text-offwhite mb-4">Mood History</h3>
                                <div className="relative border-l border-neutral-800 pl-6 space-y-6">
                                    {plushie.moodLog.map((log, i) => (
                                        <div key={i} className="relative">
                                            <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-pink-500" />
                                            <p className="text-neutral-300 text-sm">"{log.text}"</p>
                                            <span className="text-xs text-neutral-600 block mt-1">
                                                {format(new Date(log.ts), "MMM d, h:mm a")}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
