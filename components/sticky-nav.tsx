"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "./theme-provider";
import { cn } from "@/lib/utils";
import { Menu, Moon, Sun, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/stories", label: "Stories" },
    { href: "/gallery", label: "Gallery" },
    { href: "/confessions", label: "Confessions" },
    { href: "/plushies", label: "Plushies" },
    { href: "/songs", label: "Songs" },
];

export function StickyNav() {
    const { theme, toggleTheme } = useTheme();
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMobileOpen, setIsMobileOpen] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                    isScrolled && "bg-background/80 backdrop-blur-md border-white/10 shadow-sm"
                )}
            >
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="font-heading font-bold text-2xl text-primary tracking-tight">
                        aki.
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm font-medium hover:text-primary transition-colors relative group"
                                >
                                    {link.label}
                                    <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-4 border-l border-white/10 pl-6">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full hover:bg-white/5 transition-colors"
                                aria-label="Toggle theme"
                            >
                                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                            </button>

                            <a
                                href="https://discord.gg/aki-lounge"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary text-xs py-2 px-4"
                            >
                                Message Aki
                            </a>
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-40 bg-background md:hidden pt-20 px-6"
                    >
                        <div className="flex flex-col gap-6 text-lg font-medium">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileOpen(false)}
                                    className="py-2 border-b border-white/5"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="flex items-center justify-between mt-4">
                                <span>Theme</span>
                                <button
                                    onClick={toggleTheme}
                                    className="p-2 rounded-full bg-white/5"
                                >
                                    {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
