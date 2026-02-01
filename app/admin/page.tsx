import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Admin Dashboard ⚙️",
    description: "Admin area for managing Aki's World content.",
};

export default function AdminPage() {
    // This will require Firebase Auth in Wave 9
    const isLoggedIn = false;

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="glass rounded-2xl p-8 max-w-md w-full text-center">
                    <div className="text-6xl mb-6">⚙️</div>
                    <h1 className="text-2xl font-heading font-bold mb-2" style={{ color: "#121212" }}>
                        admin login
                    </h1>
                    <p className="text-sm mb-6" style={{ color: "rgba(18, 18, 18, 0.6)" }}>
                        for site managers only
                    </p>

                    <form className="space-y-4">
                        <input
                            type="email"
                            placeholder="email"
                            className="w-full p-3 rounded-xl border-2 border-transparent focus:border-pink-300 bg-white/50"
                            disabled
                        />
                        <input
                            type="password"
                            placeholder="password"
                            className="w-full p-3 rounded-xl border-2 border-transparent focus:border-pink-300 bg-white/50"
                            disabled
                        />
                        <button
                            type="submit"
                            className="w-full btn-primary py-3 opacity-50 cursor-not-allowed"
                            disabled
                        >
                            login
                        </button>
                    </form>

                    <p className="text-xs mt-6 font-mono" style={{ color: "rgba(18, 18, 18, 0.4)" }}>
                        (firebase auth coming in wave 9)
                    </p>
                </div>
            </div>
        );
    }

    // Admin dashboard (shown when logged in - Wave 9)
    return (
        <div className="min-h-screen px-4 py-12">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-3xl font-heading font-bold mb-2" style={{ color: "#121212" }}>
                        admin dashboard
                    </h1>
                    <p style={{ color: "rgba(18, 18, 18, 0.6)" }}>
                        manage all the things
                    </p>
                </header>

                {/* Stats Overview */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: "stories", count: 3, emoji: "📖" },
                        { label: "plushies", count: 47, emoji: "🧸" },
                        { label: "confessions", count: 12, emoji: "💭" },
                        { label: "pending", count: 5, emoji: "⏳" },
                    ].map((stat) => (
                        <div key={stat.label} className="glass rounded-2xl p-6 text-center">
                            <div className="text-3xl mb-2">{stat.emoji}</div>
                            <div className="text-2xl font-bold" style={{ color: "#FF6CA4" }}>{stat.count}</div>
                            <div className="text-sm" style={{ color: "rgba(18, 18, 18, 0.6)" }}>{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link href="/admin/stories" className="glass rounded-2xl p-6 hover:scale-105 transition-transform">
                        <h2 className="font-heading font-semibold mb-2" style={{ color: "#121212" }}>
                            📖 manage stories
                        </h2>
                        <p className="text-sm" style={{ color: "rgba(18, 18, 18, 0.6)" }}>
                            create, edit, delete stories
                        </p>
                    </Link>

                    <Link href="/admin/confessions" className="glass rounded-2xl p-6 hover:scale-105 transition-transform">
                        <h2 className="font-heading font-semibold mb-2" style={{ color: "#121212" }}>
                            💭 moderate confessions
                        </h2>
                        <p className="text-sm" style={{ color: "rgba(18, 18, 18, 0.6)" }}>
                            approve or reject submissions
                        </p>
                    </Link>

                    <Link href="/admin/settings" className="glass rounded-2xl p-6 hover:scale-105 transition-transform">
                        <h2 className="font-heading font-semibold mb-2" style={{ color: "#121212" }}>
                            ⚙️ site settings
                        </h2>
                        <p className="text-sm" style={{ color: "rgba(18, 18, 18, 0.6)" }}>
                            passwords, config, helplines
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
