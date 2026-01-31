"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/admin");
        } catch (err: any) {
            console.error(err);
            setError("Invalid credentials. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-3xl">
                <h1 className="font-heading font-bold text-2xl mb-2 text-center">Admin Access</h1>
                <p className="text-center text-muted-foreground mb-8 text-sm">
                    Owner access only — ask Aki for the secret email
                </p>

                {error && (
                    <div className="bg-red-500/20 text-red-200 p-3 rounded-lg mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-muted-foreground">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-black/20 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 transition-colors"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-muted-foreground">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-black/20 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary/50 transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : "Enter"}
                    </button>
                </form>
            </div>
        </div>
    );
}
