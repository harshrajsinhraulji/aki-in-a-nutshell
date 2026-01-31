"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

// Loading component using inline styles only (no Tailwind classes that might not resolve)
function Loading() {
    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div style={{ textAlign: "center" }}>
                <div
                    style={{
                        width: "64px",
                        height: "64px",
                        margin: "0 auto 16px",
                        borderRadius: "50%",
                        border: "4px solid #FFD6EC",
                        borderTopColor: "#FF6CA4",
                        animation: "spin 1s linear infinite"
                    }}
                />
                <p style={{
                    color: "rgba(18, 18, 18, 0.5)",
                    fontFamily: "monospace",
                    fontSize: "14px"
                }}>
                    loading aki&apos;s world...
                </p>
            </div>
            <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
}

// Dynamic import for HeroSection to handle Three.js SSR issues
const HeroSection = dynamic(() => import("@/components/HeroSection"), {
    ssr: false,
    loading: Loading,
});

export default function Home() {
    return (
        <Suspense fallback={<Loading />}>
            <HeroSection />
        </Suspense>
    );
}
