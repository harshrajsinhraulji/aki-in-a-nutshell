"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";
import { Ghost, Instagram, Twitter } from "lucide-react";

interface FriendProps {
    name: string;
    username: string;
    avatar: string;
    bio: string;
    tags: string[];
    role?: string;
}

export default function FriendCard({
    name,
    username,
    avatar,
    bio,
    tags,
    role = "User",
}: FriendProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden rounded-2xl bg-midnight-900 border border-white/5 p-6 shadow-lg group"
        >
            <div className="absolute top-0 right-0 p-4 opacity-50 text-stardust-600">
                <Ghost size={20} />
            </div>

            <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-16 w-16 border-2 border-neon-purple/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                    <AvatarImage src={avatar} alt={name} />
                    <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="font-heading font-bold text-lg text-stardust-50">{name}</h3>
                    <p className="font-mono text-xs text-neon-cyan">@{username}</p>
                </div>
            </div>

            <p className="text-stardust-400 text-sm mb-6 leading-relaxed">
                {bio}
            </p>

            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-white/5 text-stardust-400 border border-white/5"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-neon-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />
        </motion.div>
    );
}
