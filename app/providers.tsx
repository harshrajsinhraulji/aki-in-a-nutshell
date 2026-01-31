"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Make sure to export auth from here
import { ThemeProvider as NextThemesProvider } from "next-themes";

// --- Auth Context ---
const AuthContext = createContext<{ user: User | null; loading: boolean }>({
    user: null,
    loading: true,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

import { AudioProvider } from "@/components/audio-player";

// --- Combined Providers ---
export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <AuthProvider>
                <AudioProvider>
                    {children}
                </AudioProvider>
            </AuthProvider>
        </NextThemesProvider>
    );
}
