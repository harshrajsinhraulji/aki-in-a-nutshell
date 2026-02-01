"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { AudioProvider } from "@/components/audio-provider";
import { BasketProvider } from "@/components/BasketProvider";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <AudioProvider>
                <BasketProvider>
                    {children}
                </BasketProvider>
            </AudioProvider>
        </ThemeProvider>
    );
}
