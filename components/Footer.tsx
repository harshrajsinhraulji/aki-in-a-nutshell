"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

export function Footer() {
    return (
        <footer className="py-8 border-t border-neutral-800 mt-20">
            <div className="container mx-auto px-4 text-center">
                <p className="text-sm text-neutral-500 mb-4">
                    {siteConfig.microcopy.hero}
                </p>
                <div className="flex justify-center gap-6 text-xs text-neutral-600 mb-8">
                    <Link href="/about" className="hover:text-pink-500 transition-colors">About</Link>
                    <Link href="/contact" className="hover:text-pink-500 transition-colors">Contact</Link>
                    <Link href="/aki" className="hover:text-pink-500 transition-colors">Aki Room</Link>
                    <Link href="/admin" className="hover:text-pink-500 transition-colors">Staff</Link>
                </div>
                <p className="text-xs text-neutral-700">
                    &copy; {new Date().getFullYear()} Aki&apos;s World. Made with stardust.
                </p>
            </div>
        </footer>
    );
}
