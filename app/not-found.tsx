import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { TextGlitch } from "@/components/TextGlitch";

export default function NotFound() {
    return (
        <PageShell className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            <h1 className="text-9xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-b from-aki-pink to-aki-purple opacity-50 mb-4 select-none">
                404
            </h1>
            <h2 className="text-3xl font-heading text-white mb-8">
                <TextGlitch text="Reality Glitch Detected." />
            </h2>
            <p className="text-luminous-300 max-w-md mx-auto mb-12 font-light leading-relaxed">
                The page you are looking for has been consumed by the void, or maybe it never existed at all.
            </p>

            <Link
                href="/"
                className="px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-aki-pink/50 transition-all text-sm font-bold uppercase tracking-widest text-white shadow-lg shadow-purple-500/10"
            >
                Return to Safety
            </Link>
        </PageShell>
    );
}
