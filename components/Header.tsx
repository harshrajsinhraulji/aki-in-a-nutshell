"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { href: "/stories", label: "stories", emoji: "📖" },
    { href: "/plushies", label: "plushies", emoji: "🧸" },
    { href: "/confessions", label: "confessions", emoji: "💭" },
    { href: "/music", label: "music", emoji: "🎵" },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.header
                className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none px-4"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 0.9, 0.29, 1] }}
            >
                <div
                    className={`
            pointer-events-auto flex items-center justify-between gap-4 
            px-5 py-3 rounded-full transition-all duration-300
            ${isScrolled ? "glass-dark shadow-xl bg-aki-dark/90" : "glass shadow-lg bg-white/70"}
            backdrop-blur-xl border border-white/20
          `}
                >
                    {/* Brand */}
                    <Link href="/" className="group flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-aki-pink flex items-center justify-center text-lg overflow-hidden border-2 border-white shadow-sm group-hover:rotate-12 transition-transform duration-300">
                            <span role="img" aria-label="Aki">🌸</span>
                        </div>
                        <span className={`font-heading font-bold text-lg tracking-tight ${isScrolled ? "text-white" : "text-aki-dark"}`}>
                            aki
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                    ${isActive
                                            ? "bg-aki-pink text-white shadow-md"
                                            : isScrolled ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-aki-dark/80 hover:bg-black/5 hover:text-aki-dark"
                                        }
                  `}
                                >
                                    <span className="mr-2">{link.emoji}</span>
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`
              md:hidden w-10 h-10 rounded-full flex items-center justify-center
              ${isScrolled ? "text-white hover:bg-white/10" : "text-aki-dark hover:bg-black/5"}
              transition-colors
            `}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? "✕" : "☰"}
                    </button>

                    {/* User/Status (Placeholder for now) */}
                    <div className="hidden md:block w-8 h-8 rounded-full bg-aki-bubblegum border-2 border-white/50" />
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-20 left-4 right-4 z-40 p-4 rounded-3xl glass shadow-2xl md:hidden"
                    >
                        <nav className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-aki-peach transition-colors text-aki-dark font-medium"
                                >
                                    <span className="text-xl">{link.emoji}</span>
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
