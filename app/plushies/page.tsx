"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

type Plushie = {
    id: string;
    name: string;
    coverUrl: string;
    description: string;
};

export default function PlushiesPage() {
    const [plushies, setPlushies] = useState<Plushie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPlushies() {
            try {
                const q = query(collection(db, "plushies"), orderBy("createdAt", "desc"), limit(20));
                const snapshot = await getDocs(q);
                setPlushies(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Plushie)));
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        }
        fetchPlushies();
    }, []);

    return (
        <div className="min-h-screen pt-24 pb-20 px-4">
            <div className="container mx-auto">
                <h1 className="text-4xl md:text-6xl font-heading font-bold text-pink-500 mb-8 text-center">Plushie Army</h1>

                {loading ? (
                    <p className="text-center text-neutral-500">Mustering the troops...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {plushies.map((plush) => (
                            <Link href={`/plushies/${plush.id}`} key={plush.id} className="group">
                                <div className="aspect-square bg-neutral-900 rounded-3xl overflow-hidden mb-4 border border-neutral-800 group-hover:border-pink-500 transition-all">
                                    <img
                                        src={plush.coverUrl || "/assets/hero_fallback.jpg"}
                                        alt={plush.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-offwhite group-hover:text-pink-500 transition">{plush.name}</h3>
                                <p className="text-sm text-neutral-500 truncate">{plush.description}</p>
                            </Link>
                        ))}
                        {/* Add Card (Static for Aki) */}
                        <Link href="/aki" className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-neutral-800 rounded-3xl text-neutral-600 hover:text-pink-500 hover:border-pink-500/50 transition bg-dark/30">
                            <span className="text-4xl mb-2">+</span>
                            <span className="font-bold">Add New</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
