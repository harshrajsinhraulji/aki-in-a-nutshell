"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BookCardProps {
    children: React.ReactNode;
    coverColor?: string;
    className?: string;
}

export function BookCard({ children, coverColor = "bg-aki-purple", className }: BookCardProps) {
    return (
        <div className={cn("group perspective-1000 relative h-full w-full min-h-[300px]", className)}>
            <motion.div
                className="relative w-full h-full transition-all duration-700 transform-style-3d group-hover:rotate-y-180"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front (Cover) */}
                <div className="absolute inset-0 backface-hidden">
                    <div className={cn("h-full w-full rounded-[2rem] p-8 flex flex-col justify-between shadow-xl", coverColor)}>
                        {/* Spine Effect */}
                        <div className="absolute left-0 top-0 bottom-0 w-8 bg-black/20 rounded-l-[2rem] z-10" />
                        <div className="absolute left-2 top-0 bottom-0 w-[1px] bg-white/10 z-20" />

                        <div className="relative z-30 h-full flex flex-col">
                            {/* Decorative Cover Art - We can pass this in or generic */}
                            <div className="border-2 border-white/20 rounded-xl flex-1 flex items-center justify-center mb-6">
                                <div className="text-white/40 font-heading text-4xl">Stories</div>
                            </div>
                            <div className="text-center">
                                <h3 className="text-white font-bold text-xl mb-1">Vol. {Math.floor(Math.random() * 10) + 1}</h3>
                                <p className="text-white/60 text-xs font-mono uppercase tracking-widest">Hover to Read</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back (Content) */}
                <div
                    className="absolute inset-0 h-full w-full bg-dream-900 border border-white/10 rounded-[2rem] p-8 backface-hidden rotate-y-180 overflow-hidden"
                    style={{ transform: "rotateY(180deg)" }}
                >
                    {children}
                </div>
            </motion.div>
        </div>
    );
}
