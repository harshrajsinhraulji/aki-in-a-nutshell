"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Birthday: January 9th, 2008
const BIRTHDAY = new Date("2008-01-09T00:00:00");

interface AgeBreakdown {
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

function calculateAge(birthday: Date, now: Date): AgeBreakdown {
    let years = now.getFullYear() - birthday.getFullYear();
    let months = now.getMonth() - birthday.getMonth();
    let days = now.getDate() - birthday.getDate();
    let hours = now.getHours() - birthday.getHours();
    let minutes = now.getMinutes() - birthday.getMinutes();
    let seconds = now.getSeconds() - birthday.getSeconds();

    if (seconds < 0) { seconds += 60; minutes--; }
    if (minutes < 0) { minutes += 60; hours--; }
    if (hours < 0) { hours += 24; days--; }
    if (days < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
    }
    if (months < 0) { months += 12; years--; }

    return { years, months, days, hours, minutes, seconds };
}

export function LiveAgeCounter() {
    const [age, setAge] = useState<AgeBreakdown | null>(null);

    useEffect(() => {
        setAge(calculateAge(BIRTHDAY, new Date()));
        const interval = setInterval(() => {
            setAge(calculateAge(BIRTHDAY, new Date()));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!age) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-4 md:mt-6"
        >
            {/* Scaled counter - responsive sizing to match hero proportions */}
            <div className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 bg-white/50 dark:bg-white/10 backdrop-blur-lg px-4 md:px-6 py-2 md:py-3 rounded-full border border-white/60 dark:border-white/20 shadow-lg shadow-aki-pink/10">
                <span className="text-sm md:text-base font-medium text-foreground/70">I am</span>

                {/* Years */}
                <span className="text-base md:text-lg font-black text-aki-pink tabular-nums">{age.years}</span>
                <span className="text-xs md:text-sm text-muted-foreground">years</span>

                {/* Months */}
                <span className="text-base md:text-lg font-black text-aki-purple tabular-nums">{age.months}</span>
                <span className="text-xs md:text-sm text-muted-foreground">months</span>

                {/* Days */}
                <span className="text-base md:text-lg font-black text-aki-highlight tabular-nums">{age.days}</span>
                <span className="text-xs md:text-sm text-muted-foreground">days</span>

                {/* Hours */}
                <span className="text-base md:text-lg font-bold text-foreground/80 tabular-nums">{age.hours}</span>
                <span className="text-xs md:text-sm text-muted-foreground">hrs</span>

                {/* Minutes */}
                <span className="text-base md:text-lg font-bold text-foreground/80 tabular-nums">{age.minutes}</span>
                <span className="text-xs md:text-sm text-muted-foreground">min</span>

                {/* Seconds - animated pulse */}
                <motion.span
                    key={age.seconds}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="text-base md:text-lg font-black text-aki-pink tabular-nums"
                >
                    {age.seconds}
                </motion.span>
                <span className="text-xs md:text-sm text-muted-foreground">sec</span>
            </div>
        </motion.div>
    );
}
