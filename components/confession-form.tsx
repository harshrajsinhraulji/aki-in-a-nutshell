"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Loader2, SendHorizontal, AlertTriangle, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type FormData = {
    body: string;
    isPublic: boolean;
};

// Simple keyword matching for demo purposes
// In production, this logic can move to a Cloud Function for security
const SELF_HARM_KEYWORDS = ["die", "suicide", "kill myself", "end it", "hurt myself"];
const PROFANITY_KEYWORDS = ["fuck", "shit", "bitch"]; // Example list

export function ConfessionForm() {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<FormData>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "helpline">("idle");
    const bodyValue = watch("body", "");

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setStatus("idle");

        const text = data.body.toLowerCase();

        // 1. Check for self-harm (Client-side immediate intervention)
        if (SELF_HARM_KEYWORDS.some(k => text.includes(k))) {
            setStatus("helpline");
            setIsSubmitting(false);
            // Still submit securely as flagged "pending" without user knowing? 
            // Better to prioritize their safety message first.
            return;
        }

        // 2. Check for profanity (Soft flag)
        let flagCount = 0;
        if (PROFANITY_KEYWORDS.some(k => text.includes(k))) {
            flagCount = 1;
        }

        try {
            await addDoc(collection(db, "confessions"), {
                body: data.body,
                isPublic: data.isPublic,
                status: "pending", // Always pending first
                flags: flagCount,
                createdAt: serverTimestamp(),
                reactions: { lol: 0, same: 0, yikes: 0 }
            });
            setStatus("success");
            reset();
        } catch (error) {
            console.error("Error submitting confession:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto">
            <AnimatePresence mode="wait">
                {status === "helpline" ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-red-500/10 border border-red-500/20 rounded-3xl p-8 text-center"
                    >
                        <AlertTriangle size={48} className="mx-auto text-red-400 mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">You are not alone.</h3>
                        <p className="text-white/80 mb-6">It sounds like you're going through a lot. Please talk to someone.</p>

                        <div className="space-y-3">
                            <a href="tel:116123" className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-full font-bold transition-colors">
                                <Phone size={18} /> Call Samaritans (116 123)
                            </a>
                            <button onClick={() => setStatus("idle")} className="text-sm text-white/50 hover:text-white underline">
                                Go back
                            </button>
                        </div>
                    </motion.div>
                ) : status === "success" ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-mint/10 border border-mint/20 rounded-3xl p-8 text-center"
                    >
                        <div className="text-4xl mb-4">✨</div>
                        <h3 className="text-xl font-bold text-mint mb-2">Confession Sent</h3>
                        <p className="text-mint/80 mb-6">It's in the void now. Aki will review it shortly.</p>
                        <button onClick={() => setStatus("idle")} className="text-sm text-mint hover:text-white underline">
                            Send another
                        </button>
                    </motion.div>
                ) : (
                    <motion.form
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div className="relative">
                            <textarea
                                {...register("body", {
                                    required: true,
                                    maxLength: 500,
                                    minLength: 10
                                })}
                                placeholder="Tell me something wild. Max 500 characters. Keep it anonymous if you want."
                                className="w-full h-40 bg-white/5 border border-white/10 rounded-3xl p-6 text-lg focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all resize-none placeholder:text-white/20"
                            />
                            <div className="absolute bottom-4 right-6 text-xs font-mono text-white/30">
                                {bodyValue.length}/500
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-white transition-colors">
                                <input type="checkbox" {...register("isPublic")} className="rounded border-white/20 bg-transparent text-primary focus:ring-primary" defaultChecked />
                                Allow public display?
                            </label>

                            <button
                                type="submit"
                                disabled={isSubmitting || bodyValue.length < 10}
                                className="bg-white text-dark font-bold py-3 px-8 rounded-full flex items-center gap-2 hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" /> : <SendHorizontal size={18} />}
                                Whispr
                            </button>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
}
