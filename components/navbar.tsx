"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState } from "react";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/stories", label: "Stories" },
    { href: "/plushies", label: "Plushies" },
    { href: "/music", label: "Mixtape" },
    { href: "/confessions", label: "Confessions" },
];

import { Dock, DockItem } from "@/components/ui/Dock";
import { Magnetic } from "@/components/ui/Magnetic";
import { MagneticLink } from "@/components/MagneticButton";

export function Navbar() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);
    const { scrollY } = useScroll();

    // Show navbar after scrolling 100px
    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsVisible(latest > 100);
    });

    // Dynamic blur based on scroll
    const backdropBlur = useTransform(scrollY, [0, 200], [8, 16]);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{
                y: isVisible ? 0 : -100,
                opacity: isVisible ? 1 : 0,
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
            }}
            className="fixed top-4 inset-x-0 z-50 flex justify-center pointer-events-none"
        >
            {/* Glassmorphism Pill with enhanced blur on scroll */}
            <motion.div
                style={{ backdropFilter: `blur(${backdropBlur}px)` }}
                className="bg-background/60 dark:bg-background/40 rounded-full px-4 py-2 pointer-events-auto flex items-center gap-2 shadow-lg shadow-black/5 dark:shadow-black/20 border border-white/20 dark:border-white/10"
            >
                <Dock className="flex items-end gap-2 px-2">
                    {NAV_LINKS.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <DockItem key={link.href}>
                                <MagneticLink>
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "relative text-sm font-medium transition-colors hover:text-aki-highlight px-3 py-2 block whitespace-nowrap",
                                            isActive ? "text-aki-pink" : "text-foreground/70"
                                        )}
                                    >
                                        {link.label}
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-dot"
                                                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-aki-pink"
                                            />
                                        )}
                                    </Link>
                                </MagneticLink>
                            </DockItem>
                        );
                    })}
                </Dock>
                <div className="w-px h-4 bg-foreground/10 mx-2" />
                <Magnetic>
                    <Link
                        href="/aki"
                        className="text-sm font-bold text-aki-purple hover:text-aki-highlight transition-colors px-2 py-1 block"
                    >
                        Aki
                    </Link>
                </Magnetic>
                <div className="w-px h-4 bg-foreground/10 mx-2" />
                <Magnetic>
                    <ThemeToggle />
                </Magnetic>
            </motion.div>
        </motion.nav>
    );
}

