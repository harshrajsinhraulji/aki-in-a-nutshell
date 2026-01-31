import type { Metadata } from "next";
import { Sora, Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/components/ui/Toast";
import NoiseOverlay from "@/components/ui/NoiseOverlay";

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
                className="antialiased min-h-screen flex flex-col bg-aki-light selection:bg-aki-pink selection:text-white overflow-x-hidden"
                suppressHydrationWarning
            >
                <NoiseOverlay />
                <AuthProvider>
                    <ToastProvider>
                        <Header />
                        {/* Main content padding for fixed header */}
                        <main className="flex-1 pt-24 w-full max-w-[100vw] overflow-x-hidden">
                            {children}
                        </main>
                        <Footer />
                    </ToastProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
