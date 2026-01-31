"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Users, FileText, Music, Settings, LogOut, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (!authUser) {
                router.push("/admin/login");
            } else {
                // Ideally check 'role' in Firestore / custom claims here
                setUser(authUser);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading Admin...</div>;
    if (!user) return null; // Router will redirect

    const navItems = [
        { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { label: "Confessions", href: "/admin/confessions", icon: MessageSquare },
        { label: "Plushies", href: "/admin/plushies", icon: Users },
        { label: "Stories", href: "/admin/stories", icon: FileText },
        { label: "Songs", href: "/admin/songs", icon: Music },
        { label: "Settings", href: "/admin/settings", icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-dark flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 bg-black/20 fixed h-full hidden md:flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <h2 className="font-heading font-bold text-xl text-primary">Aki Admin</h2>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium",
                                    isActive ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <item.icon size={18} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={() => signOut(auth)}
                        className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                    >
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 min-h-screen bg-dark">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
