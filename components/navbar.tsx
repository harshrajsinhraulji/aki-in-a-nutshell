"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/stories", label: "Stories" },
    { href: "/plushies", label: "Plushies" },
    { href: "/confessions", label: "Confessions" },
    { href: "/music", label: "Music" },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-dark/80 backdrop-blur-md border border-neutral-800 rounded-2xl px-6 py-3 flex items-center justify-between shadow-lg">
                    <Link href="/" className="font-heading font-bold text-xl text-offwhite hover:text-pink-500 transition">
                        Aki.
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-6">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative text-sm font-medium transition-colors ${pathname === link.href ? "text-pink-500" : "text-neutral-400 hover:text-offwhite"
                                    }`}
                            >
                                {link.label}
                                {pathname === link.href && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-pink-500 rounded-full"
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-neutral-400 hover:text-offwhite"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:hidden mt-2 bg-dark/95 border border-neutral-800 rounded-2xl p-4 flex flex-col gap-4 shadow-xl"
                    >
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`text-sm font-medium p-2 rounded-lg ${pathname === link.href ? "bg-pink-500/10 text-pink-500" : "text-neutral-400"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </div>
        </nav>
    );
}
