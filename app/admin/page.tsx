"use client";

import { useEffect, useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { ShieldCheck, LogOut } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

import { AdminConfessions } from "@/components/admin-confessions";

export default function AdminPage() {
    const [user, setUser] = useState<any>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("confessions");

    const router = useRouter();

    // Check auth status
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
        });
        return () => unsub();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (e: any) {
            setError("Invalid credentials.");
        }
    };

    const handleLogout = () => {
        signOut(auth);
    };

    if (loading) return <div className="min-h-screen bg-dark flex items-center justify-center">Loading...</div>;

    if (!user) {
        return (
            <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-md bg-neutral-900 p-8 rounded-3xl border border-neutral-800">
                    <h1 className="text-2xl font-bold text-offwhite mb-2">Admin Access</h1>
                    <p className="text-sm text-neutral-500 mb-6">{siteConfig.microcopy.adminLoginHint}</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email} onChange={e => setEmail(e.target.value)}
                            className="w-full bg-black/50 border border-neutral-700 p-3 rounded-xl text-offwhite"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password} onChange={e => setPassword(e.target.value)}
                            className="w-full bg-black/50 border border-neutral-700 p-3 rounded-xl text-offwhite"
                        />
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button className="w-full bg-pink-500 text-white font-bold py-3 rounded-xl hover:bg-pink-600">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // Authenticated Dashboard
    return (
        <div className="min-h-screen bg-dark pt-24 px-4 pb-12">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-offwhite flex items-center gap-2">
                        <ShieldCheck className="text-mint-500" /> Dashboard
                    </h1>
                    <button onClick={handleLogout} className="flex items-center gap-2 text-neutral-400 hover:text-white">
                        <LogOut size={16} /> Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <button onClick={() => setActiveTab("confessions")} className={`p-4 rounded-2xl border transition ${activeTab === "confessions" ? "border-pink-500 text-pink-500 bg-pink-500/10" : "border-neutral-800 bg-neutral-900 hover:border-neutral-600"}`}>
                        Confessions
                    </button>
                    {/* Placeholders for other tabs */}
                    <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 text-center opacity-50">Plushies (Soon)</div>
                    <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 text-center opacity-50">Songs (Soon)</div>
                    <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 text-center opacity-50">Stories (Soon)</div>
                </div>

                <div className="bg-neutral-900/50 p-8 rounded-3xl min-h-[400px] border border-neutral-800">
                    {activeTab === "confessions" && <AdminConfessions />}
                </div>
            </div>
        </div>
    );
}
