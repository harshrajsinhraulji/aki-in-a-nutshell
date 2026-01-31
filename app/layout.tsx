import type { Metadata } from "next";
import { Sora, Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

// Fonts
const sora = Sora({
    subsets: ["latin"],
    variable: "--font-sora",
    display: "swap",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const robotoMono = Roboto_Mono({
    subsets: ["latin"],
    variable: "--font-roboto-mono",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Aki's World ✨",
    description: "plushies, 03:14 confessions & travel scars — posted honestly",
    icons: {
        icon: "/favicon.ico", // Ensure we have a favicon or let Next.js handle it
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${sora.variable} ${inter.variable} ${robotoMono.variable}`}>
            <body className="antialiased min-h-screen flex flex-col selection:bg-aki-pink selection:text-white">
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
