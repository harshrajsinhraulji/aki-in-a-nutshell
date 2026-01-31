import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className="glass mt-auto"
            style={{ borderTop: "1px solid rgba(255, 255, 255, 0.2)" }}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Copyright */}
                    <p
                        className="text-xs sm:text-sm text-center sm:text-left"
                        style={{ color: "var(--text-muted)" }}
                    >
                        © {currentYear} aki&apos;s world ✨
                        <span className="hidden sm:inline"> — made with 💖 and too much screen time</span>
                    </p>

                    {/* Quick Links */}
                    <nav
                        className="flex items-center gap-3 sm:gap-4"
                        aria-label="Footer navigation"
                    >
                        <Link
                            href="/aki"
                            className="text-xs sm:text-sm transition-colors px-2 py-1"
                            style={{ color: "var(--text-muted)" }}
                            aria-label="Aki's personal room"
                        >
                            🔐 aki&apos;s room
                        </Link>
                        <Link
                            href="/admin"
                            className="text-xs sm:text-sm transition-colors px-2 py-1"
                            style={{ color: "var(--text-muted)" }}
                            aria-label="Admin dashboard"
                        >
                            ⚙️ admin
                        </Link>
                    </nav>
                </div>

                {/* Fun tagline */}
                <p
                    className="text-center text-[10px] sm:text-xs mt-3 sm:mt-4 font-mono lowercase"
                    style={{ color: "var(--text-muted)", opacity: 0.6 }}
                >
                    ✦ probably need sleep but here we are ✦
                </p>
            </div>
        </footer>
    );
}
