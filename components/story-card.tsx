import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Story {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    coverUrl: string;
    tags: string[];
    publishedAt: string;
}

interface StoryCardProps {
    story: Story;
    className?: string;
}

export function StoryCard({ story, className }: StoryCardProps) {
    // Format date relative or absolute
    const date = new Date(story.publishedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });

    return (
        <Link
            href={`/stories/${story.slug}`}
            className={cn(
                "group relative block bg-dark/40 border border-white/5 rounded-2xl overflow-hidden hover:shadow-hover transition-all duration-300 hover:border-white/10 hover:-translate-y-1",
                className
            )}
        >
            {/* Image Container */}
            <div className="aspect-[4/3] relative overflow-hidden bg-white/5">
                <Image
                    src={story.coverUrl || "https://placehold.co/600x400/121212/FFF?text=No+Image"}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay only on hover for better visibility */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {story.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full bg-white/10 text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                            #{tag}
                        </span>
                    ))}
                </div>

                <h3 className="font-heading font-bold text-xl mb-2 line-clamp-2 text-offwhite group-hover:text-primary transition-colors">
                    {story.title}
                </h3>

                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {story.excerpt}
                </p>

                <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                    <Clock size={12} />
                    <span>{date}</span>
                </div>
            </div>
        </Link>
    );
}
