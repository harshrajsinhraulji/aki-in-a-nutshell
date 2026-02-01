import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // "Dreamy Light" Palette
                dream: {
                    950: "hsl(var(--background))",
                    900: "hsl(var(--muted))",
                    800: "hsl(var(--border))",
                },
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                aki: {
                    pink: "hsl(var(--primary))",
                    purple: "hsl(var(--foreground))",
                    highlight: "hsl(var(--secondary))",
                },
                luminous: {
                    50: "hsl(var(--foreground))",
                    100: "hsl(var(--foreground))",
                    200: "hsl(var(--muted-foreground))",
                    300: "hsl(var(--muted-foreground))",
                    400: "hsl(var(--muted-foreground))",
                    500: "hsl(var(--muted-foreground))",
                }
            },
            fontFamily: {
                heading: ["var(--font-sora)", "sans-serif"], // Keep Sora, it's elegant
                body: ["var(--font-inter)", "sans-serif"],
                mono: ["var(--font-roboto-mono)", "monospace"],
            },
        },
    },
    plugins: [],
};
export default config;
