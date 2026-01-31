"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Minimal top bar for status/time
export function StatusBar() {
    const time = format(new Date(), "h:mm a");

    return (
        <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 text-xs font-mono text-stardust-600 uppercase tracking-widest mix-blend-plus-lighter pointer-events-none">
            <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-neon-cyan animate-pulse" />
                <span>Online</span>
            </div>

            <Link href="/" className="pointer-events-auto hover:text-stardust-50 transition-colors">
                Aki's World <span className="text-neon-purple">v2.0</span>
            </Link>

            <div>{time}</div>
        </div>
    );
}
