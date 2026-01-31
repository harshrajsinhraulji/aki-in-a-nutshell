"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Home, MessageSquare, Music, Settings, User, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

const NAV_ITEMS = [
    { icon: Home, label: "Home", href: "/" },
    { icon: User, label: "About", href: "/about" }, // Placeholder for now
    { icon: Zap, label: "Plushies", href: "/plushies" },
    { icon: MessageSquare, label: "Friends", href: "/friends" },
    { icon: Music, label: "Music", href: "/music" },
];

function DockIcon({
    mouseX,
    icon: Icon,
    href,
    label,
    isActive,
}: {
    mouseX: any;
    icon: any;
    href: string;
    label: string;
    isActive: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href={href}>
            <motion.div
                ref={ref}
                style={{ width }}
                className="aspect-square flex flex-col items-center justify-center gap-1 group relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, x: "-50%" }}
                            animate={{ opacity: 1, y: -45, x: "-50%" }}
                            exit={{ opacity: 0, y: 2, x: "-50%" }}
                            className="absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-midnight-900/90 px-2 py-1 text-xs text-stardust-50 backdrop-blur-md"
                        >
                            {label}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div
                    className={cn(
                        "flex h-full w-full items-center justify-center rounded-full transition-colors duration-300",
                        isActive
                            ? "bg-neon-purple/20 text-neon-purple shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                            : "bg-white/5 text-stardust-400 hover:bg-white/10 hover:text-stardust-50"
                    )}
                >
                    <Icon size={24} strokeWidth={1.5} />
                </div>

                {isActive && (
                    <motion.div
                        layoutId="active-dot"
                        className="absolute -bottom-2 h-1 w-1 rounded-full bg-neon-purple shadow-[0_0_8px_#a855f7]"
                    />
                )}
            </motion.div>
        </Link>
    );
}

export default function FloatingDock() {
    const mouseX = useMotionValue(Infinity);
    const pathname = usePathname();

    return (
        <div className="fixed bottom-12 left-1/2 z-50 -translate-x-1/2">
            <motion.div
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className="flex h-16 items-end gap-4 rounded-full border border-white/5 bg-midnight-900/40 px-4 pb-3 backdrop-blur-xl shadow-2xl ring-1 ring-white/5"
            >
                {NAV_ITEMS.map((item) => (
                    <DockIcon
                        key={item.label}
                        href={item.href}
                        label={item.label}
                        icon={item.icon}
                        mouseX={mouseX}
                        isActive={pathname === item.href}
                    />
                ))}
            </motion.div>
        </div>
    );
}
