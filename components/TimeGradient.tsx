"use client";

import { useEffect, useState } from "react";

export function TimeGradient() {
    const [gradient, setGradient] = useState("");

    useEffect(() => {
        const updateGradient = () => {
            const hour = new Date().getHours();
            let colors = "";

            if (hour >= 5 && hour < 12) {
                // Morning: Soft Peach/Pink
                colors = "from-rose-100 via-orange-50 to-rose-200 dark:from-rose-950 dark:via-slate-950 dark:to-purple-950";
            } else if (hour >= 12 && hour < 17) {
                // Afternoon: Bright Blue/Cloud
                colors = "from-sky-100 via-rose-50 to-blue-100 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900";
            } else if (hour >= 17 && hour < 20) {
                // Evening: Sunset (Purple/Orange)
                colors = "from-indigo-100 via-purple-50 to-orange-100 dark:from-indigo-950 dark:via-purple-950 dark:to-slate-950";
            } else {
                // Night: Deep Void
                colors = "from-slate-950 via-purple-950 to-black dark:from-black dark:via-slate-950 dark:to-purple-950"; // Force dark aesthetic at night
            }

            setGradient(colors);
        };

        updateGradient();
        const interval = setInterval(updateGradient, 60000); // Check every minute
        return () => clearInterval(interval);
    }, []);

    if (!gradient) return null;

    return (
        <div className={`fixed inset-0 -z-50 bg-gradient-to-br ${gradient} transition-colors duration-[3000ms] opacity-60 dark:opacity-80`} />
    );
}
