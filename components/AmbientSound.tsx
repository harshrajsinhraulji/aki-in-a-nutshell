"use client";

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { Howl } from 'howler';

export function AmbientSound() {
    const { theme } = useTheme();
    const ambianceRef = useRef<Howl | null>(null);

    useEffect(() => {
        // Files should be in /public/sfx/
        // Placeholder names: 'morning_birds.mp3', 'night_crickets.mp3'
        const soundFile = theme === 'dark'
            ? '/sfx/night_crickets.mp3'
            : '/sfx/morning_birds.mp3';

        // Fade out old sound
        if (ambianceRef.current) {
            ambianceRef.current.fade(0.1, 0, 1000);
            setTimeout(() => {
                ambianceRef.current?.unload();
            }, 1000);
        }

        // Create new sound (low volume background)
        const newSound = new Howl({
            src: [soundFile],
            loop: true,
            volume: 0, // Start at 0 for fade in
            onloaderror: () => {/* Silent fail if file missing */ },
        });

        newSound.play();
        newSound.fade(0, 0.05, 2000); // Very subtle fade in to 5% volume

        ambianceRef.current = newSound;

        return () => {
            newSound.unload();
        };
    }, [theme]);

    return null; // Invisible component
}
