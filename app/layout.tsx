import type { Metadata } from "next";
import { Sora, Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastProvider } from "@/components/ui/Toast";
import AmbientBackground from "@/components/AmbientBackground";
import FloatingDock from "@/components/FloatingDock";
import { StatusBar } from "@/components/StatusBar";

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
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${sora.variable} ${inter.variable} ${robotoMono.variable}`}>
            <body
                className="antialiased min-h-screen bg-midnight-950 text-stardust-50 selection:bg-neon-purple selection:text-white overflow-x-hidden"
                suppressHydrationWarning
            >
                <AmbientBackground />
                <AuthProvider>
                    <ToastProvider>
                        <StatusBar />

                        {/* Core Content Area */}
                        <main className="relative z-10 w-full min-h-screen pt-20 pb-32 overflow-x-hidden">
                            {children}
                        </main>

                        <FloatingDock />
                    </ToastProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
