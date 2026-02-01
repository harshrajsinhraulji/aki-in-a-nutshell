"use client";

import { useEffect, useState, useCallback } from "react";
import { useAudio } from "@/lib/audio-context";

const KONAMI_CODE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

export function KonamiCode() {
    const [input, setInput] = useState<string[]>([]);
    const { playSfx } = useAudio();

    const activateEasterEgg = useCallback(() => {
        playSfx('/sfx/click_glass.mp3');
        document.documentElement.style.filter = "invert(1) hue-rotate(180deg)";
        setTimeout(() => {
            document.documentElement.style.filter = "none";
        }, 5000);
    }, [playSfx]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const newInput = [...input, e.key];
            if (newInput.length > KONAMI_CODE.length) {
                newInput.shift();
            }
            setInput(newInput);

            if (newInput.join("") === KONAMI_CODE.join("")) {
                activateEasterEgg();
                setInput([]);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [input, activateEasterEgg]);

    return null;
}
