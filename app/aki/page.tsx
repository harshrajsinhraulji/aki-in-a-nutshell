"use client";

import { useState } from "react";

export default function AkiPage() {
    const [password, setPassword] = useState("");
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [error, setError] = useState("");

    // Default password as specified in requirements
    const correctPassword = "akiupload";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === correctPassword) {
            setIsUnlocked(true);
            setError("");
        } else {
            setError("wrong password, try again 💔");
        }
    };

    if (!isUnlocked) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="glass rounded-2xl p-8 max-w-md w-full text-center">
                    <div className="text-6xl mb-6">🔐</div>
                    <h1 className="text-2xl font-heading font-bold mb-2" style={{ color: "#121212" }}>
                        aki&apos;s room
                    </h1>
                    <p className="text-sm mb-6" style={{ color: "rgba(18, 18, 18, 0.6)" }}>
                        this is my private space. password required.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="enter the secret..."
                            className="w-full p-3 rounded-xl border-2 border-transparent focus:border-pink-300 bg-white/50 text-center"
                            autoFocus
                        />
                        {error && (
                            <p className="text-sm" style={{ color: "#FF6CA4" }}>{error}</p>
                        )}
                        <button type="submit" className="w-full btn-primary py-3">
                            unlock ✨
                        </button>
                    </form>

                    <p className="text-xs mt-6 font-mono" style={{ color: "rgba(18, 18, 18, 0.4)" }}>
                        hint: if you know, you know
                    </p>
                </div>
            </div>
        );
    }

    // Unlocked view
    return (
        <div className="min-h-screen px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                        <span style={{ color: "#FF6CA4" }}>welcome back</span> 💜
                    </h1>
                    <p className="text-lg" style={{ color: "rgba(18, 18, 18, 0.7)" }}>
                        this is your space, aki
                    </p>
                </header>

                {/* Quick Actions */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    <div className="glass rounded-2xl p-6 text-center">
                        <div className="text-4xl mb-4">🧸</div>
                        <h2 className="font-heading font-semibold mb-2" style={{ color: "#121212" }}>add plushie</h2>
                        <p className="text-sm mb-4" style={{ color: "rgba(18, 18, 18, 0.6)" }}>new member of the family?</p>
                        <button className="btn-primary text-sm opacity-50 cursor-not-allowed" disabled>
                            coming wave 8
                        </button>
                    </div>

                    <div className="glass rounded-2xl p-6 text-center">
                        <div className="text-4xl mb-4">👥</div>
                        <h2 className="font-heading font-semibold mb-2" style={{ color: "#121212" }}>add friend</h2>
                        <p className="text-sm mb-4" style={{ color: "rgba(18, 18, 18, 0.6)" }}>someone special?</p>
                        <button className="btn-primary text-sm opacity-50 cursor-not-allowed" disabled>
                            coming wave 8
                        </button>
                    </div>

                    <div className="glass rounded-2xl p-6 text-center">
                        <div className="text-4xl mb-4">📖</div>
                        <h2 className="font-heading font-semibold mb-2" style={{ color: "#121212" }}>write story</h2>
                        <p className="text-sm mb-4" style={{ color: "rgba(18, 18, 18, 0.6)" }}>late night thoughts?</p>
                        <button className="btn-primary text-sm opacity-50 cursor-not-allowed" disabled>
                            coming wave 3
                        </button>
                    </div>

                    <div className="glass rounded-2xl p-6 text-center">
                        <div className="text-4xl mb-4">📸</div>
                        <h2 className="font-heading font-semibold mb-2" style={{ color: "#121212" }}>upload photo</h2>
                        <p className="text-sm mb-4" style={{ color: "rgba(18, 18, 18, 0.6)" }}>share a moment</p>
                        <button className="btn-primary text-sm opacity-50 cursor-not-allowed" disabled>
                            coming wave 5
                        </button>
                    </div>

                    <div className="glass rounded-2xl p-6 text-center">
                        <div className="text-4xl mb-4">🎵</div>
                        <h2 className="font-heading font-semibold mb-2" style={{ color: "#121212" }}>add song</h2>
                        <p className="text-sm mb-4" style={{ color: "rgba(18, 18, 18, 0.6)" }}>current obsession?</p>
                        <button className="btn-primary text-sm opacity-50 cursor-not-allowed" disabled>
                            coming wave 7
                        </button>
                    </div>

                    <div className="glass rounded-2xl p-6 text-center">
                        <div className="text-4xl mb-4">⚙️</div>
                        <h2 className="font-heading font-semibold mb-2" style={{ color: "#121212" }}>settings</h2>
                        <p className="text-sm mb-4" style={{ color: "rgba(18, 18, 18, 0.6)" }}>customize stuff</p>
                        <button className="btn-primary text-sm opacity-50 cursor-not-allowed" disabled>
                            coming wave 9
                        </button>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-sm font-mono" style={{ color: "rgba(18, 18, 18, 0.5)" }}>
                        ✦ your uploads will appear on the public pages ✦
                    </p>
                </div>
            </div>
        </div>
    );
}
