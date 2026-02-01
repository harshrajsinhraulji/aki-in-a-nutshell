"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";

export function Breadcrumbs() {
    const pathname = usePathname();
    if (pathname === "/") return null;

    const segments = pathname.split('/').filter(Boolean);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed top-24 left-6 md:left-12 z-40 hidden md:flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-luminous-500"
        >
            <Link href="/" className="hover:text-aki-pink transition-colors">
                <Home size={12} />
            </Link>
            {segments.map((segment, i) => (
                <div key={segment} className="flex items-center gap-2">
                    <ChevronRight size={10} className="opacity-50" />
                    <Link href={`/${segments.slice(0, i + 1).join('/')}`} className="hover:text-white transition-colors">
                        {segment}
                    </Link>
                </div>
            ))}
        </motion.div>
    );
}
