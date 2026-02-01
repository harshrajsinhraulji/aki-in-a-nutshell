"use client";

import { useState, useEffect } from "react";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { MessageSquarePlus, Quote } from "lucide-react";
import { ConfessionModal } from "@/components/confession-modal";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { TypingIndicator } from "@/components/TypingIndicator";

import { motion, AnimatePresence } from "framer-motion";

type Confession = {
    id: string;
    body: string;
    createdAt: any;
};

export default function ConfessionsPage() {
    const [confessions, setConfessions] = useState<Confession[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isGhostTyping, setIsGhostTyping] = useState(false);

    // ... fetchConfessions effect ...

    // Ghost Typing Simulator
    useEffect(() => {
        const interval = setInterval(() => {
            // 30% chance to start typing if not already
            if (Math.random() > 0.7) {
                setIsGhostTyping(true);
                // Stop typing after random duration
                setTimeout(() => setIsGhostTyping(false), 2000 + Math.random() * 3000);
            }
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <PageShell>
            <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
                    <div>
                        <PageHeader title="Confessions" subtitle="Anonymous whispers." className="mb-0" />
                        <div className="h-6 mt-2 ml-1">
                            <AnimatePresence>
                                {isGhostTyping && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                    >
                                        <TypingIndicator />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowModal(true)}
                        className="mb-8 md:mb-0 flex items-center gap-2 bg-gradient-to-r from-aki-pink to-aki-purple text-dream-950 px-8 py-4 rounded-full font-bold shadow-lg shadow-aki-pink/20 hover:shadow-aki-pink/40 transition-all font-heading"
                    >
                        <MessageSquarePlus size={20} />
                        <span>Confess</span>
                    </motion.button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-6 h-6 border-2 border-aki-pink border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                        {confessions.length > 0 ? confessions.map((c, i) => (
                            <motion.div
                                key={c.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="break-inside-avoid bg-dream-900/30 border border-white/5 p-8 rounded-[2rem] hover:bg-dream-900/50 transition-colors relative group"
                            >
                                <Quote className="absolute top-8 left-8 text-aki-layout/10 w-8 h-8 rotate-180 group-hover:text-aki-pink/20 transition-colors" />
                                <p className="text-lg text-luminous-100 font-body font-light leading-relaxed relative z-10 pt-4">
                                    &quot;{c.body}&quot;
                                </p>
                            </motion.div>
                        )) : (
                            <div className="col-span-full text-center text-luminous-400 py-20 font-light">
                                <p>The void is silent. Be the first to whisper.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {showModal && <ConfessionModal onClose={() => setShowModal(false)} />}
        </PageShell>
    );
}
