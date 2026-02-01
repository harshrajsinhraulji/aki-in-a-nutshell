"use client";

import { motion } from "framer-motion";

export const TextGlitch = ({ text }: { text: string }) => {
    return (
        <div className="relative inline-block group">
            <span className="relative z-10">{text}</span>
            <span className="absolute top-0 left-0 -z-10 text-aki-pink opacity-0 group-hover:opacity-70 animate-pulse translate-x-[2px]">{text}</span>
            <span className="absolute top-0 left-0 -z-10 text-aki-purple opacity-0 group-hover:opacity-70 animate-pulse -translate-x-[2px]">{text}</span>
        </div>
    );
};
