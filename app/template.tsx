"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

// Premium page transition variants
const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
        scale: 0.98,
        filter: "blur(10px)",
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
    },
    exit: {
        opacity: 0,
        y: -10,
        scale: 1.02,
        filter: "blur(5px)",
    },
};

const pageTransition = {
    type: "spring",
    stiffness: 100,
    damping: 20,
    mass: 0.5,
};

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={pageTransition}
                className="w-full min-h-screen"
            >
                {/* Page content */}
                {children}

                {/* Transition overlay effect */}
                <motion.div
                    className="fixed inset-0 pointer-events-none z-[100] bg-gradient-to-b from-background via-transparent to-background"
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 0 }}
                    exit={{ opacity: 0.3 }}
                    transition={{ duration: 0.3 }}
                />
            </motion.div>
        </AnimatePresence>
    );
}
