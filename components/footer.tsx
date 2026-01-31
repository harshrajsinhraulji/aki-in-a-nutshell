import Link from "next/link";

export default function Footer() {
    const socialLinks = [
        { label: "Instagram", href: "#", icon: "📸" }, // Placeholder
        { label: "Spotify", href: "#", icon: "🎧" },    // Placeholder
    ];

    return (
        <footer className="w-full py-12 px-4 mt-auto">
            <div className="max-w-2xl mx-auto glass rounded-3xl p-8 flex flex-col items-center gap-6 text-center">

                {/* Brand Mark */}
                <div className="flex flex-col items-center gap-2">
                    <span className="text-4xl animate-bounce-soft">🧸</span>
                    <h3 className="font-heading font-bold text-xl text-aki-dark">
                        aki's world
                    </h3>
                    <p className="text-aki-muted text-sm font-mono lowercase">
                        made with insomnia & next.js
                    </p>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap justify-center gap-3">
                    <div className="px-3 py-1 rounded-full bg-aki-peach border border-aki-pink/20 text-xs text-aki-pink font-mono">
                        Born Jan 9, 2008
                    </div>
                    <div className="px-3 py-1 rounded-full bg-aki-mint/20 border border-aki-mint/40 text-xs text-aki-dark font-mono">
                        EST 2026
                    </div>
                </div>

                {/* Socials */}
                <div className="flex gap-4">
                    {socialLinks.map((social) => (
                        <Link
                            key={social.label}
                            href={social.href}
                            className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-lg hover:scale-110 hover:-rotate-6 transition-transform duration-300"
                        >
                            {social.icon}
                        </Link>
                    ))}
                </div>

                {/* Copyright */}
                <div className="text-xs text-aki-muted/60 mt-4">
                    &copy; {new Date().getFullYear()} Aki. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
