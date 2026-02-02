import type { Metadata } from "next";
import { Inter, Outfit, Cormorant_Garamond, Nunito, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { SmoothScroller } from "@/components/SmoothScroller";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ContextMenu } from "@/components/ui/ContextMenu";
import { TimeGradient } from "@/components/TimeGradient";
import dynamic from "next/dynamic";
import { Decorations } from "@/components/Decorations";
import { ScrollProgress } from "@/components/ScrollProgress";
import { FloatingOrbs } from "@/components/FloatingOrbs";


const StatusPill = dynamic(() => import("@/components/StatusPill").then(mod => mod.StatusPill), { ssr: false });
const DynamicFavicon = dynamic(() => import("@/components/DynamicFavicon").then(mod => mod.DynamicFavicon), { ssr: false });
const AmbientSound = dynamic(() => import("@/components/AmbientSound").then(mod => mod.AmbientSound), { ssr: false });
const PlushieBasket = dynamic(() => import("@/components/PlushieBasket").then(mod => mod.PlushieBasket), { ssr: false });
const KonamiCode = dynamic(() => import("@/components/KonamiCode").then(mod => mod.KonamiCode), { ssr: false });
const Breadcrumbs = dynamic(() => import("@/components/Breadcrumbs").then(mod => mod.Breadcrumbs), { ssr: false });
const DynamicTitle = dynamic(() => import("@/components/DynamicTitle").then(mod => mod.DynamicTitle), { ssr: false });
const FluidBackground = dynamic(() => import("@/components/FluidBackground").then(mod => mod.FluidBackground), { ssr: false });

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["300", "400", "600", "700"],
    variable: "--font-cormorant"
});
const nunito = Nunito({
    subsets: ["latin"],
    variable: "--font-nunito"
});
const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space"
});

export const metadata: Metadata = {
    title: "Aki's World 🌸",
    description: "A cozy corner of the internet.",
};

import { AudioProvider } from "@/lib/audio-context";

// ... existing imports ...

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} ${outfit.variable} ${cormorant.variable} ${nunito.variable} ${spaceGrotesk.variable} font-body antialiased selection:bg-aki-pink selection:text-white`}>
                <SmoothScroller>
                    <div className="absolute inset-0 pointer-events-none z-[9999]">
                        <GrainOverlay />
                    </div>
                    <TimeGradient />
                    <FloatingOrbs />
                    <CustomCursor />
                    <ContextMenu />
                    <Providers>
                        <AudioProvider>
                            <ScrollProgress />
                            <StatusPill />
                            <DynamicFavicon />
                            {/* <AmbientSound /> */}
                            <PlushieBasket />
                            <KonamiCode />
                            <DynamicTitle />
                            <FluidBackground enabled={false} />
                            <Breadcrumbs />
                            <Decorations />
                            <Navbar />
                            {children}
                        </AudioProvider>
                    </Providers>
                </SmoothScroller>
            </body>
        </html>
    );
}
