"use client";

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
    },
    {
        id: 2,
        name: "Kai",
        username: "kai_codes",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
        bio: "Building virtual worlds.",
        tags: ["Dev", "Music", "Coffee"],
    },
    {
        id: 3,
        name: "Ruby",
        username: "ruby_red",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
        bio: "Collecting moments and stickers.",
        tags: ["Photography", "Travel"],
    },
    {
        id: 4,
        name: "Ace",
        username: "ace_of_spades",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
        bio: "Bass player in a band you've never heard of.",
        tags: ["Music", "Bass", "Vinyl"],
    },
    {
        id: 5,
        name: "Echo",
        username: "echo_location",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
        bio: "Lost in the signal noise.",
        tags: ["Cyber", "Glitch", "Synth"],
    }
];

export default function FriendsPage() {
    return (
        <div className="max-w-7xl mx-auto px-6">
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-stardust-50 mb-4">
                    Friend <span className="text-neon-cyan">Orbit</span>
                </h1>
                <p className="text-stardust-400 max-w-lg">
                    People I've met in the ether. Or maybe they're just hallucinations.
                </p>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 pb-24">
                {FRIENDS.map((friend) => (
                    <div key={friend.id} className="break-inside-avoid">
                        <FriendCard
                            name={friend.name}
                            username={friend.username}
                            avatar={friend.avatar}
                            bio={friend.bio}
                            tags={friend.tags}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
