"use client";

import { useState, useEffect } from "react";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { AkiPasswordGate } from "@/components/aki-password-gate";
import { UploadCloud } from "lucide-react";

export default function AkiRoomPage() {
    const [isUnlocked, setIsUnlocked] = useState(false);

    // Persist unlock state
    useEffect(() => {
        const unlocked = localStorage.getItem("aki-unlocked");
        if (unlocked === "true") setIsUnlocked(true);
    }, []);

    const handleUnlock = () => {
        setIsUnlocked(true);
        localStorage.setItem("aki-unlocked", "true");
    };

    if (!isUnlocked) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-dream-950 relative overflow-hidden">
                {/* Dreamy Background */}
                <div className="absolute inset-0 bg-gradient-glow opacity-20 pointer-events-none" />

                <div className="relative z-10 w-full px-4">
                    <AkiPasswordGate onUnlock={handleUnlock} />
                </div>
            </div>
        );
    }

    return (
        <PageShell>
            <div className="container mx-auto">
                <PageHeader title="Aki's Room" subtitle="Upload memories to the cloud." />

                <div className="max-w-2xl mx-auto bg-dream-900/40 border border-white/5 p-12 rounded-[2rem] backdrop-blur-md text-center group hover:border-aki-pink/30 transition-all duration-500 cursor-pointer relative overflow-hidden">

                    <div className="absolute inset-0 bg-gradient-to-br from-aki-pink/5 to-aki-purple/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="bg-white/5 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-aki-pink/10 group-hover:text-aki-pink transition-colors">
                        <UploadCloud size={32} />
                    </div>

                    <h3 className="text-3xl font-heading font-thin text-white mb-2">Drop Stardust Here</h3>
                    <p className="text-luminous-400 mb-10 font-light">
                        Only verified personnel (me) beyond this point.
                    </p>

                    <div className="border border-dashed border-white/10 rounded-2xl p-8 group-hover:border-aki-pink/30 transition-colors bg-dream-950/30">
                        <span className="text-sm text-luminous-500 font-mono tracking-widest uppercase">
                            Support for images, audio, and chaos.
                        </span>
                    </div>
                </div>
            </div>
        </PageShell>
    );
}
