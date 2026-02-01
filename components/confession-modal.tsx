"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/siteConfig";
import { X, AlertTriangle, Heart } from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Basic keyword lists
const SELF_HARM_KEYWORDS = ["die", "suicide", "kill myself", "end it all", "hurt myself", "cut myself"];
const PROFANITY_KEYWORDS = ["fuck", "shit", "bitch", "cunt"];

export function ConfessionModal({ onClose }: { onClose: () => void }) {
    const [text, setText] = useState("");
    const [isAnonymous, setIsAnonymous] = useState(true);
    const [step, setStep] = useState<"write" | "safety" | "submitting" | "done">("write");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const lower = text.toLowerCase();

        // Safety Check
        const hasSelfHarm = SELF_HARM_KEYWORDS.some(k => lower.includes(k));
        if (hasSelfHarm) {
            setStep("safety");
            return;
        }

        // Profanity Check (Flagging)
        const hasProfanity = PROFANITY_KEYWORDS.some(k => lower.includes(k));

        setStep("submitting");

        try {
            await addDoc(collection(db, "confessions"), {
                body: text,
                isPublic: !isAnonymous,
                status: "pending",
                flags: hasProfanity ? 1 : 0,
                createdAt: serverTimestamp(),
                reactions: { lol: 0, same: 0, yikes: 0 }
            });
            setStep("done");
        } catch (err) {
            console.error(err);
            alert("Something went wrong. Try again.");
            setStep("write");
        }
    };

    if (step === "safety") {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark/95 backdrop-blur-md p-4">
                <div className="bg-dark border border-red-500/50 rounded-2xl max-w-md w-full p-6 text-center shadow-red-500/20 shadow-2xl">
                    <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2 text-offwhite">Are you okay?</h3>
                    <p className="text-neutral-300 mb-6">
                        It sounds like you are going through a tough time. We care about you and want you to be safe.
                    </p>
                    <div className="bg-neutral-800 p-4 rounded-xl mb-6">
                        <p className="font-bold text-offwhite mb-1">UK Helplines:</p>
                        <p className="text-pink-400">{siteConfig.helplines.uk}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-full bg-neutral-700 hover:bg-neutral-600 text-offwhite py-3 rounded-xl"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-dark/90 border border-neutral-700 rounded-3xl w-full max-w-lg p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-offwhite"><X /></button>

                {step === "done" ? (
                    <div className="text-center py-12">
                        <Heart className="w-16 h-16 text-pink-500 mx-auto mb-4 animate-bounce" />
                        <h3 className="text-2xl font-heading mb-2">Sent.</h3>
                        <p className="text-neutral-400">Aki reads every single one.</p>
                        <p className="text-xs text-neutral-500 mt-4">(It will appear after review)</p>
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl font-heading mb-1 text-pink-500">Confess.</h2>
                        <p className="text-sm text-neutral-400 mb-6">{siteConfig.microcopy.confessionPlaceholder}</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                maxLength={500}
                                className="w-full h-40 bg-black/30 border border-neutral-700 rounded-xl p-4 text-offwhite focus:border-pink-500 focus:outline-none resize-none"
                                placeholder="I stole a traffic cone once..."
                                required
                            />
                            <div className="flex justify-between text-xs text-neutral-500">
                                <span>{text.length}/500</span>
                                <span>Anonymous</span>
                            </div>

                            <button
                                type="submit"
                                disabled={step === "submitting"}
                                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl transition-transform active:scale-95 disabled:opacity-50"
                            >
                                {step === "submitting" ? "Sending..." : "Whisper into the void"}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
