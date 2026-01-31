import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Plushie {
    id: string;
    name: string;
    coverUrl: string;
    description: string; // Used as tagline
    tags: string[];
}

interface PlushieCardProps {
    plushie: Plushie;
    className?: string;
    fullWidth?: boolean;
}

export function PlushieCard({ plushie, className, fullWidth = false }: PlushieCardProps) {
    return (
        <Link
            href={`/plushies/${plushie.id}`}
            className={cn(
                "group relative flex flex-col items-center text-center",
                className
            )}
        >
            {/* Image Container with Sticker Effect */}
            <div className={cn(
                "relative bg-white p-2 shadow-soft transition-transform duration-300 group-hover:rotate-2 group-hover:scale-[1.02] group-hover:shadow-hover",
                fullWidth ? "w-full aspect-[16/9]" : "aspect-square w-full rotate-1"
            )}>
                <div className="relative w-full h-full overflow-hidden bg-gray-100">
                    <Image
                        src={plushie.coverUrl || "https://placehold.co/400x400?text=Plushie"}
                        alt={plushie.name}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Info */}
            <div className="mt-4 space-y-1">
                <h3 className="font-heading font-bold text-xl text-offwhite group-hover:text-primary transition-colors inline-block relative">
                    {plushie.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </h3>
                <p className="text-sm text-muted-foreground font-medium line-clamp-1 italic">
                    {plushie.description}
                </p>
                <div className="flex justify-center gap-2 mt-2">
                    {plushie.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[10px] text-muted-foreground/60 uppercase tracking-widest">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
}
