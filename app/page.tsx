export default function Home() {
    return (
        <section
            className="relative min-h-[calc(100vh-8rem)] flex items-center justify-center px-4"
            aria-label="Hero section"
        >
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-aki-pink/20 blur-3xl animate-bounce-soft" />
                <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-aki-mint/20 blur-3xl animate-bounce-soft" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-aki-yellow/15 blur-3xl" />
            </div>

            {/* Hero content */}
            <div className="relative z-10 text-center max-w-3xl mx-auto">
                {/* Main heading with gradient */}
                <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 animate-fade-in">
                    <span className="text-gradient">Hello.</span>
                    <br />
                    <span className="text-aki-dark">I&apos;m </span>
                    <span className="text-aki-pink">Aki</span>
                    <span className="inline-block animate-bounce-soft">✨</span>
                </h1>

                {/* Subline - verbatim microcopy */}
                <p className="text-lg md:text-xl text-aki-dark/70 mb-8 animate-slide-up font-body" style={{ animationDelay: '0.3s' }}>
                    welcome to my cozy corner of the internet —
                    <br className="hidden sm:block" />
                    plushies, late-night thoughts, and messy-cute vibes only
                </p>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.5s' }}>
                    <a
                        href="/stories"
                        className="btn-primary inline-flex items-center justify-center gap-2"
                        aria-label="Read Aki's stories"
                    >
                        📖 read my stories
                    </a>
                    <a
                        href="/plushies"
                        className="glass px-6 py-3 rounded-full font-medium text-aki-dark hover:bg-white/80 transition-all inline-flex items-center justify-center gap-2"
                        aria-label="Meet Aki's plushie family"
                    >
                        🧸 meet the plushie fam
                    </a>
                </div>

                {/* Late-night vibe indicator */}
                <p className="mt-12 text-sm text-aki-dark/50 font-mono animate-fade-in" style={{ animationDelay: '0.8s' }}>
                    ✦ best viewed at 2am with snacks ✦
                </p>
            </div>
        </section>
    );
}
