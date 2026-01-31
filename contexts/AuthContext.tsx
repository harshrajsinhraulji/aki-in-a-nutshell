"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
    isOwner: boolean;
    login: (password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const OWNER_PASSWORD = "akiupload";
const AUTH_KEY = "aki_owner_session";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        // Check for existing session on mount
        const session = localStorage.getItem(AUTH_KEY);
        if (session === "authenticated") {
            setIsOwner(true);
        }
    }, []);

    const login = (password: string): boolean => {
        if (password === OWNER_PASSWORD) {
            localStorage.setItem(AUTH_KEY, "authenticated");
            setIsOwner(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem(AUTH_KEY);
        setIsOwner(false);
    };

    return (
        <AuthContext.Provider value={{ isOwner, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useIsOwner(): boolean {
    const context = useContext(AuthContext);
    if (context === undefined) {
        // Return false if not wrapped in provider (safe fallback)
        return false;
    }
    return context.isOwner;
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
