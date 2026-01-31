import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Semantic Rebirth Tokens
                midnight: {
                    950: "#09090b", // Deep Bg
                    900: "#18181b", // Surface
                    800: "#27272a", // Card Highlight
                },
                stardust: {
                    50: "#fafafa", // Primary Text
                    400: "#a1a1aa", // Secondary
                    600: "#52525b", // Muted
                },
                // Accents
                neon: {
                    purple: "#a855f7",
                    pink: "#e879f9",
                    cyan: "#22d3ee",
                },
            },
            borderRadius: {
                DEFAULT: "0.75rem",
                "xl": "1.5rem",
            },
            fontFamily: {
                heading: ["var(--font-sora)", "sans-serif"],
                body: ["var(--font-inter)", "sans-serif"],
                mono: ["var(--font-roboto-mono)", "monospace"],
            },
            backgroundImage: {
                "aurora": "conic-gradient(at top right, #a855f7 0%, transparent 40%), radial-gradient(at bottom left, #22d3ee 0%, transparent 40%)",
            },
            animation: {
                "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
        },
    },
    plugins: [],
};

export default config;
