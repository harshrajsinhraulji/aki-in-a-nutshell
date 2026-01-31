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
                // Aki's World Exact Tokens
                aki: {
                    pink: "#FF6CA4",
                    bubblegum: "#FFD6EC",
                    peach: "#FFF2F7",
                    mint: "#00E6A8",
                    lemon: "#FFE27A",
                    dark: "#121212",
                    light: "#F7F7F8",
                    muted: "rgba(18, 18, 18, 0.6)", // derived
                },
            },
            borderRadius: {
                DEFAULT: "1.25rem", // 20px
                "2xl": "1.25rem",
                "3xl": "1.5rem",
                "4xl": "2rem",
            },
            fontFamily: {
                heading: ["var(--font-sora)", "sans-serif"],
                body: ["var(--font-inter)", "sans-serif"],
                mono: ["var(--font-roboto-mono)", "monospace"],
            },
            spacing: {
                // Enforce spacing scale: 4, 8, 12, 16, 24, 32
                "space-1": "4px",
                "space-2": "8px",
                "space-3": "12px",
                "space-4": "16px",
                "space-6": "24px",
                "space-8": "32px",
                "space-12": "48px",
                "space-16": "64px",
            },
            transitionTimingFunction: {
                "aki-bounce": "cubic-bezier(.22, .9, .29, 1)",
            },
            animation: {
                "float": "float 6s ease-in-out infinite",
                "bounce-soft": "bounce-soft 2s infinite",
                "typing": "blink 1s step-end infinite",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                "bounce-soft": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-5px)" },
                },
                blink: {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
