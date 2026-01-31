import Link from "next/link";
import { Instagram, MessageSquare } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-background border-t border-white/5 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h2 className="font-heading font-bold text-2xl text-primary">aki.</h2>
                        <p className="text-muted-foreground max-w-xs">
                            Chaos coordinator. Plushie enthusiast. Insomniac.
                        </p>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-lemon rounded-full text-dark text-xs font-bold shadow-[2px_2px_0_#121212]">
                            <span>Born Jan 9, 2008 ✨</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="font-heading font-semibold">Explore</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/stories" className="hover:text-primary transition-colors">Stories</Link></li>
                            <li><Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
                            <li><Link href="/confessions" className="hover:text-primary transition-colors">Confessions</Link></li>
                            <li><Link href="/admin" className="hover:text-primary transition-colors opacity-50">Admin</Link></li>
                        </ul>
                    </div>

                    {/* Socials */}
                    <div className="space-y-4">
                        <h3 className="font-heading font-semibold">Stalk Me nicely</h3>
                        <div className="flex flex-col gap-3">
                            <a
                                href="https://discord.gg/aki-lounge"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                            >
                                <div className="p-2 bg-[#5865F2] rounded-lg text-white group-hover:scale-110 transition-transform">
                                    <MessageSquare size={18} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold">Discord</span>
                                    <span className="text-xs text-muted-foreground">aki.in.a.nutshell</span>
                                </div>
                            </a>

                            <a
                                href="https://instagram.com/aki"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                            >
                                <div className="p-2 bg-gradient-to-tr from-[#FD1D1D] to-[#833AB4] rounded-lg text-white group-hover:scale-110 transition-transform">
                                    <Instagram size={18} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold">Instagram</span>
                                    <span className="text-xs text-muted-foreground">@aki</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                    <p>© {new Date().getFullYear()} Aki's World. Built with 💕 at 3am.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-primary">Privacy</Link>
                        <Link href="/terms" className="hover:text-primary">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
