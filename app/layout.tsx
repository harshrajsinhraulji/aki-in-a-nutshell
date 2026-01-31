import type { Metadata } from "next";
import { Sora, Inter, Roboto_Mono, Lexend } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

const sora = Sora({
    variable: "--font-sora",
    subsets: ["latin"],
    display: "swap",
});

const lexend = Lexend({
    variable: "--font-lexend",
    subsets: ["latin"],
    display: "swap",
});

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

const robotoMono = Roboto_Mono({
    variable: "--font-roboto-mono",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Aki's World ✨",
    description: "Welcome to Aki's cozy corner of the internet — plushies, late-night thoughts, and all the messy-cute vibes.",
    keywords: ["Aki", "personal", "blog", "plushies", "stories", "confessions"],
    authors: [{ name: "Aki" }],
    openGraph: {
        title: "Aki's World ✨",
        description: "Welcome to Aki's cozy corner of the internet.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${sora.variable} ${lexend.variable} ${inter.variable} ${robotoMono.variable}`}>
            <body className="antialiased min-h-screen flex flex-col">
                <AuthProvider>
                    {/* Skip to main content link for accessibility */}
                    <a href="#main-content" className="skip-link">
                        Skip to main content
                    </a>

                    <Header />

                    <main id="main-content" className="flex-1">
                        {children}
                    </main>

                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}

