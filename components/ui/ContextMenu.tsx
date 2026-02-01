"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { RefreshCw, Moon, Sun, Music, Coffee } from "lucide-react";

export function ContextMenu() {
    const [visible, setVisible] = useState(false);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const { theme, setTheme } = useTheme();
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            setVisible(true);
            setCoords({ x: e.clientX, y: e.clientY });
        };

        const handleClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setVisible(false);
            }
        };

        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("click", handleClick);
        };
    }, []);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
        setVisible(false);
    };

    const reloadPage = () => {
        window.location.reload();
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    ref={menuRef}
                    initial={{ opacity: 0, scale: 0.9, x: coords.x, y: coords.y }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    drag
                    dragConstraints={{ left: 0, right: window.innerWidth, top: 0, bottom: window.innerHeight }}
                    className="fixed z-[10001] min-w-[180px] overflow-hidden rounded-xl border border-white/20 bg-black/60 backdrop-blur-xl shadow-2xl p-2 md:cursor-default"
                >
                    <div className="mb-2 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white/50">Aki&apos;s HUD</div>

                    <button onClick={toggleTheme} className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-white hover:bg-white/10 transition-colors">
                        {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                        <span>Toggle Theme</span>
                    </button>

                    <button onClick={reloadPage} className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-white hover:bg-white/10 transition-colors">
                        <RefreshCw size={14} />
                        <span>Reload System</span>
                    </button>

                    <div className="my-1 h-px bg-white/10" />

                    <div className="px-2 py-1 text-[10px] text-white/30 italic">
                        Psst... drag me around!
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
