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
                pink: {
                    500: "#FF6CA4", // Primary Pink
                    100: "#FFD6EC", // Bubblegum
                },
                peach: "#FFF2F7", // Pale Peach
                mint: "#00E6A8", // Mint Accent
                lemon: "#FFE27A", // Lemon Accent
                dark: "#121212", // Dark Neutral
                offwhite: "#F7F7F8", // Off-White
            },
            fontFamily: {
                heading: ["var(--font-sora)", "sans-serif"],
                body: ["var(--font-inter)", "sans-serif"],
                mono: ["var(--font-roboto-mono)", "monospace"],
            },
            borderRadius: {
                '2xl': '1.25rem',
            },
            spacing: {
                '18': '4.5rem',
                '30': '7.5rem',
            },
        },
    },
    plugins: [],
};
export default config;
