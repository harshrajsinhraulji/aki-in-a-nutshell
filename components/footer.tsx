import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="glass border-t border-white/20 mt-auto">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Copyright */}
                    <p className="text-sm text-aki-dark/60 text-center md:text-left">
                        © {currentYear} aki&apos;s world ✨
                        <span className="hidden sm:inline"> — made with 💖 and too much screen time</span>
                    </p>

                    {/* Quick Links */}
                    <nav className="flex items-center gap-4" aria-label="Footer navigation">
                        <Link
                            href="/aki"
                            className="text-sm text-aki-dark/60 hover:text-aki-pink transition-colors"
                            aria-label="Aki's personal room"
                        >
                            🔐 aki&apos;s room
                        </Link>
                        <Link
                            href="/admin"
                            className="text-sm text-aki-dark/60 hover:text-aki-pink transition-colors"
                            aria-label="Admin dashboard"
                        >
                            ⚙️ admin
                        </Link>
                    </nav>
                </div>

                {/* Fun tagline */}
                <p className="text-center text-xs text-aki-dark/40 mt-4 font-mono">
                    ✦ probably need sleep but here we are ✦
                </p>
            </div>
        </footer>
    );
}
