"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/20 group"
            aria-label="Toggle Theme"
        >
            <motion.div
                initial={false}
                animate={{ rotate: theme === "dark" ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
                {theme === "dark" ? (
                    <Moon className="w-5 h-5 text-aki-pink" />
                ) : (
                    <Sun className="w-5 h-5 text-amber-400" />
                )}
            </motion.div>
        </button>
    );
}
