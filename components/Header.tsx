"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

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
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close menu on route change or resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Prevent scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    return (
        <header
            className={`header ${isScrolled ? "header-scrolled" : ""}`}
            style={{
                borderBottom: isScrolled ? "none" : "1px solid rgba(255, 255, 255, 0.2)"
            }}
        >
            <nav
                className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between"
                aria-label="Main navigation"
            >
                {/* Logo */}
                <Link
                    href="/"
                    className="font-bold text-lg sm:text-xl transition-transform hover:scale-105 active:scale-95"
                    style={{
                        fontFamily: "var(--font-heading)",
                        color: "var(--pink)"
                    }}
                    aria-label="Aki's World home"
                >
                    aki&apos;s world <span className="inline-block animate-bounce-soft" style={{ animationDuration: "2s" }}>✨</span>
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex items-center gap-1" role="menubar">
                    {navLinks.map((link) => (
                        <li key={link.href} role="none">
                            <Link
                                href={link.href}
                                className="nav-link"
                                role="menuitem"
                            >
                                <span aria-hidden="true">{link.emoji}</span>
                                <span className="hidden lg:inline">{link.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-3 -mr-3 transition-colors rounded-lg"
                    style={{
                        color: "var(--dark)",
                        minWidth: "44px",
                        minHeight: "44px",
                    }}
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

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                        style={{ top: "var(--header-height)" }}
                        onClick={() => setIsMenuOpen(false)}
                        aria-hidden="true"
                    />

                    {/* Menu Panel */}
                    <div
                        id="mobile-menu"
                        className="md:hidden fixed left-0 right-0 z-50 glass"
                        style={{
                            top: "var(--header-height)",
                            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
                            animation: "slideUp 0.2s ease-out forwards"
                        }}
                    >
                        <ul className="px-4 py-4 space-y-1" role="menu">
                            {navLinks.map((link, index) => (
                                <li
                                    key={link.href}
                                    role="none"
                                    style={{
                                        animation: `fadeIn 0.2s ease-out ${index * 0.05}s forwards`,
                                        opacity: 0
                                    }}
                                >
                                    <Link
                                        href={link.href}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors"
                                        style={{
                                            color: "var(--dark)",
                                            minHeight: "48px",
                                        }}
                                        role="menuitem"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className="text-xl"
                                        >
                                            {link.emoji}
                                        </span>
                                        <span className="font-medium">{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Mobile menu footer */}
                        <div
                            className="px-8 py-4 text-center border-t"
                            style={{
                                borderColor: "rgba(255, 255, 255, 0.2)",
                                color: "var(--text-muted)"
                            }}
                        >
                            <p className="text-xs font-mono lowercase">
                                ✦ welcome to my corner ✦
                            </p>
                        </div>
                    </div>
                </>
            )}
        </header>
    );
}
