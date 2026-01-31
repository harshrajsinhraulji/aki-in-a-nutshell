export default function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 gap-8 text-center">
            <div className="flex flex-col gap-4 max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-bold font-heading text-aki-pink animate-float">
                    Aki's World <span className="text-aki-dark">Scaffold</span>
                </h1>
                <p className="text-lg md:text-xl text-aki-muted font-body">
                    Wave 00: Design System & Tokens Active
                </p>
            </div>

            {/* Token Verification Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
                <div className="p-6 rounded-2xl bg-aki-pink text-white flex items-center justify-center font-mono">
                    aki-pink
                </div>
                <div className="p-6 rounded-2xl bg-aki-bubblegum text-aki-dark flex items-center justify-center font-mono">
                    aki-bubblegum
                </div>
                <div className="p-6 rounded-2xl bg-aki-peach text-aki-dark flex items-center justify-center font-mono border border-aki-pink/20">
                    aki-peach
                </div>
                <div className="p-6 rounded-2xl bg-aki-mint text-aki-dark flex items-center justify-center font-mono">
                    aki-mint
                </div>
                <div className="p-6 rounded-2xl bg-aki-lemon text-aki-dark flex items-center justify-center font-mono">
                    aki-lemon
                </div>
                <div className="p-6 rounded-2xl bg-aki-dark text-white flex items-center justify-center font-mono">
                    aki-dark
                </div>
                <div className="p-6 rounded-2xl bg-aki-light text-aki-dark flex items-center justify-center font-mono border border-gray-200">
                    aki-light
                </div>
                <div className="p-6 rounded-2xl glass text-aki-dark flex items-center justify-center font-mono">
                    .glass
                </div>
            </div>

            <div className="mt-8 flex gap-4">
                <button className="px-8 py-3 rounded-2xl bg-aki-pink text-white font-heading font-bold hover:scale-105 transition-transform duration-300 ease-aki-bounce">
                    Primary Button
                </button>
                <button className="px-8 py-3 rounded-2xl bg-aki-bubblegum text-aki-dark font-heading font-bold hover:scale-105 transition-transform duration-300 ease-aki-bounce">
                    Secondary Button
                </button>
            </div>
        </div>
    );
}
