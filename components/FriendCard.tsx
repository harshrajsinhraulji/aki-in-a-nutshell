"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface FriendProps {
    name: string;
    username: string;
    avatar: string;
    bio: string;
    tags: string[];
    color?: string; // Optional custom color for the sticker border/bg
    rotation?: number; // Random rotation for sticker effect
}

export default function FriendCard({
    name,
    username,
    avatar,
    bio,
    tags,
    color = "bg-white",
    rotation = 0,
}: FriendProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
            whileTap={{ scale: 0.95 }}
            initial={{ rotate: rotation, opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "relative flex flex-col items-center p-6 rounded-3xl shadow-md border-2 border-white/50 backdrop-blur-sm transition-all cursor-default",
                color
            )}
            style={{
                rotate: `${rotation}deg`,
            }}
        >
            {/* Tape Effect */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-yellow-100/80 rotate-1 shadow-sm backdrop-blur-sm z-20 opacity-80" />

            <Avatar className="w-20 h-20 border-4 border-white shadow-lg mb-4">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>

            <div className="text-center w-full">
                <h3 className="font-heading font-bold text-lg text-aki-dark">{name}</h3>
                <p className="text-sm font-mono text-aki-muted mb-2">@{username}</p>

                <p className="text-sm text-aki-dark/80 line-clamp-3 mb-4 min-h-[3.75rem]">
                    &quot;{bio}&quot;
                </p>

                <div className="flex flex-wrap justify-center gap-1.5">
                    {tags.map((tag) => (
                        <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-white/50 hover:bg-white/80 text-[10px] px-2"
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
