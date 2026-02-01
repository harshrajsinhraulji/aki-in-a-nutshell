"use client";

import { motion } from "framer-motion";

export function PageShell({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} // Bezier for "premium" feel
            className={`min-h-screen pt-32 px-6 md:px-12 pb-24 ${className}`}
        >
            {children}
        </motion.div>
    );
}
