"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
    { href: "/about", label: "about", emoji: "🌙" },
    { href: "/stories", label: "stories", emoji: "📖" },
    { href: "/plushies", label: "plushies", emoji: "🧸" },
    { href: "/confessions", label: "confessions", emoji: "💭" },
    { href: "/music", label: "music", emoji: "🎵" },
    { href: "/contact", label: "contact", emoji: "💌" },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 glass border-b border-white/20">
            <nav
                className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between"
                aria-label="Main navigation"
            >
                {/* Logo */}
                <Link
                    href="/"
                    className="font-heading font-bold text-xl text-aki-pink hover:scale-105 transition-transform"
                    aria-label="Aki's World home"
                >
                    aki&apos;s world ✨
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex items-center gap-6" role="menubar">
                    {navLinks.map((link) => (
                        <li key={link.href} role="none">
                            <Link
                                href={link.href}
                                className="text-aki-dark/80 hover:text-aki-pink transition-colors font-medium text-sm flex items-center gap-1"
                                role="menuitem"
                            >
                                <span aria-hidden="true">{link.emoji}</span>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-aki-dark hover:text-aki-pink transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-menu"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div
                    id="mobile-menu"
                    className="md:hidden glass border-t border-white/20 animate-slide-up"
                >
                    <ul className="px-4 py-4 space-y-2" role="menu">
                        {navLinks.map((link) => (
                            <li key={link.href} role="none">
                                <Link
                                    href={link.href}
                                    className="block py-2 text-aki-dark/80 hover:text-aki-pink transition-colors font-medium"
                                    role="menuitem"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span aria-hidden="true">{link.emoji}</span> {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
}
