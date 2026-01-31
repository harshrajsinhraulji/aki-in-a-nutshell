"use client";

import PageHeader from "@/components/PageHeader";
import PageShell from "@/components/PageShell";
import FriendCard from "@/components/FriendCard";
import { motion } from "framer-motion";

const FRIENDS = [
    {
        id: 1,
        name: "Luna",
        username: "luna_skies",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
        bio: "Digital artist & night owl. I draw things that don't exist.",
        tags: ["Artist", "Gamer", "INFP"],
        color: "bg-purple-50",
        rotation: -2,
    },
    {
        id: 2,
        name: "Kai",
        username: "kai_codes",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
        bio: "Building virtual worlds.",
        tags: ["Dev", "Music", "Coffee"],
        color: "bg-blue-50",
        rotation: 3,
    },
    {
        id: 3,
        name: "Ruby",
        username: "ruby_red",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
        bio: "Collecting moments and stickers.",
        tags: ["Photography", "Travel"],
        color: "bg-red-50",
        rotation: -1,
    },
    {
        id: 4,
        name: "Ace",
        username: "ace_of_spades",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
        bio: "Bass player in a band you've never heard of.",
        tags: ["Music", "Bass", "Vinyl"],
        color: "bg-gray-50",
        rotation: 4,
    },
];

export default function FriendsPage() {
    return (
        <PageShell>
            <PageHeader
                title="Friend Wall"
                subtitle="Cool people I met on the internet."
                emoji="🤝"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
                {FRIENDS.map((friend, index) => (
                    <motion.div
                        key={friend.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <FriendCard
                            name={friend.name}
                            username={friend.username}
                            avatar={friend.avatar}
                            bio={friend.bio}
                            tags={friend.tags}
                            color={friend.color}
                            rotation={friend.rotation}
                        />
                    </motion.div>
                ))}
            </div>
        </PageShell>
    );
}
