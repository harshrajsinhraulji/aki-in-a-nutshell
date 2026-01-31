"use client";

import { useState } from "react";
import { AkiPasswordGate } from "@/components/aki-password-gate";
import { AkiUploadWall } from "@/components/aki-upload-wall";
import { Navbar } from "@/components/navbar"; // Need to create this or sticknav? User had sticky-nav.tsx

export default function AkiRoomPage() {
    const [unlocked, setUnlocked] = useState(false);

    return (
        <div className="min-h-screen pt-24 px-4 pb-20">
            <div className="container mx-auto">
                <h1 className="text-4xl md:text-5xl font-heading text-center mb-8">
                    <span className="text-pink-500">Aki's</span> Room
                </h1>

                {!unlocked ? (
                    <AkiPasswordGate onUnlock={() => setUnlocked(true)} />
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <AkiUploadWall />
                        {/* Could add a grid of existing uploads here later */}
                    </div>
                )}
            </div>
        </div>
    );
}
