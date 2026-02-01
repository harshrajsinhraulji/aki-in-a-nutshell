"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function PageHeader({ title, subtitle, className }: { title: string; subtitle: string; className?: string }) {
    return (
        <div className={cn("mb-20 text-center relative", className)}>
            <motion.h1
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="text-6xl md:text-8xl font-heading font-thin tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/20 mb-6"
            >
                {title}
            </motion.h1>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-aki-pink to-transparent mx-auto mb-6 opacity-50" />
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-luminous-300 text-lg md:text-xl font-body font-light tracking-wide mix-blend-plus-lighter"
            >
                {subtitle}
            </motion.p>
        </div>
    );
}
