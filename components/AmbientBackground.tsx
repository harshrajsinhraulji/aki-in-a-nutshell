"use client";

export default function AmbientBackground() {
    return (
        <div className="fixed inset-0 -z-10 bg-dream-950 overflow-hidden pointer-events-none">
            {/* Deep Violet Glow Base */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(45,36,56,0.4),_transparent_70%)]" />

            {/* Top Right Highlight - Luminous Pink */}
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-luminous-400/10 blur-[130px] rounded-full mix-blend-screen opacity-60 animate-pulse-glow" />

            {/* Bottom Left Highlight - Dreamy Purple */}
            <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-luminous-500/10 blur-[120px] rounded-full mix-blend-screen opacity-50" />

            {/* Paper/Noise Texture Overlay */}
            <div
                className="absolute inset-0 opacity-[0.05] mix-blend-overlay texture-paper"
            />

            {/* Subtle Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(15,12,22,0.4)_100%)]" />
        </div>
    );
}
