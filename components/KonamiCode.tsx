"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/lib/audio-context";

// Easter egg types
type EasterEggType = "konami" | "logoClick" | "secretHover" | "tripleClick" | "scrollMaster";

interface Achievement {
    id: EasterEggType;
    name: string;
    description: string;
    icon: string;
    unlocked: boolean;
    unlockedAt?: Date;
}

const ACHIEVEMENTS: Omit<Achievement, "unlocked" | "unlockedAt">[] = [
    { id: "konami", name: "Retro Gamer", description: "Entered the Konami code", icon: "🎮" },
    { id: "logoClick", name: "Obsessive", description: "Clicked the logo 5 times", icon: "🌸" },
    { id: "secretHover", name: "Explorer", description: "Found a secret hover zone", icon: "🔍" },
    { id: "tripleClick", name: "Impatient", description: "Triple-clicked something", icon: "⚡" },
    { id: "scrollMaster", name: "Speed Reader", description: "Scrolled to the bottom fast", icon: "📜" },
];

const KONAMI_CODE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

export function KonamiCode() {
    const [input, setInput] = useState<string[]>([]);
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [showTrophy, setShowTrophy] = useState(false);
    const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
    const [logoClicks, setLogoClicks] = useState(0);
    const { playSfx } = useAudio();

    // Load achievements from localStorage
    useEffect(() => {
        const stored = localStorage.getItem("aki_achievements");
        if (stored) {
            setAchievements(JSON.parse(stored));
        } else {
            setAchievements(ACHIEVEMENTS.map(a => ({ ...a, unlocked: false })));
        }
    }, []);

    // Save achievements to localStorage
    const saveAchievements = useCallback((updated: Achievement[]) => {
        localStorage.setItem("aki_achievements", JSON.stringify(updated));
        setAchievements(updated);
    }, []);

    // Unlock an achievement
    const unlockAchievement = useCallback((id: EasterEggType) => {
        const updated = achievements.map(a =>
            a.id === id && !a.unlocked
                ? { ...a, unlocked: true, unlockedAt: new Date() }
                : a
        );

        const justUnlocked = updated.find(a => a.id === id && a.unlocked);
        if (justUnlocked && !achievements.find(a => a.id === id)?.unlocked) {
            setNewAchievement(justUnlocked);
            playSfx('/sfx/achievement.mp3');

            // Hide notification after 3 seconds
            setTimeout(() => setNewAchievement(null), 3000);
        }

        saveAchievements(updated);
    }, [achievements, saveAchievements, playSfx]);

    // Konami code detection
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const newInput = [...input, e.key];
            if (newInput.length > KONAMI_CODE.length) {
                newInput.shift();
            }
            setInput(newInput);

            if (newInput.join("") === KONAMI_CODE.join("")) {
                unlockAchievement("konami");
                // Fun visual effect
                document.documentElement.style.filter = "invert(1) hue-rotate(180deg)";
                setTimeout(() => {
                    document.documentElement.style.filter = "none";
                }, 5000);
                setInput([]);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [input, unlockAchievement]);

    // Logo click detection
    useEffect(() => {
        const logo = document.querySelector('[data-logo]');
        if (!logo) return;

        const handleLogoClick = () => {
            setLogoClicks(prev => {
                const newCount = prev + 1;
                if (newCount >= 5) {
                    unlockAchievement("logoClick");
                    return 0;
                }
                return newCount;
            });
        };

        logo.addEventListener("click", handleLogoClick);
        return () => logo.removeEventListener("click", handleLogoClick);
    }, [unlockAchievement]);

    // Triple click detection
    useEffect(() => {
        let clickCount = 0;
        let clickTimer: NodeJS.Timeout;

        const handleClick = () => {
            clickCount++;
            clearTimeout(clickTimer);

            if (clickCount >= 3) {
                unlockAchievement("tripleClick");
                clickCount = 0;
            }

            clickTimer = setTimeout(() => {
                clickCount = 0;
            }, 500);
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, [unlockAchievement]);

    // Fast scroll detection
    useEffect(() => {
        let lastScrollY = 0;
        let scrollSpeed = 0;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            scrollSpeed = Math.abs(currentScrollY - lastScrollY);
            lastScrollY = currentScrollY;

            // If scrolled very fast to near bottom
            if (scrollSpeed > 500 && currentScrollY > document.body.scrollHeight - window.innerHeight - 200) {
                unlockAchievement("scrollMaster");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [unlockAchievement]);

    // Toggle trophy modal with keyboard shortcut
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "t" && e.ctrlKey) {
                e.preventDefault();
                setShowTrophy(prev => !prev);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const unlockedCount = achievements.filter(a => a.unlocked).length;

    return (
        <>
            {/* Achievement notification */}
            <AnimatePresence>
                {newAchievement && (
                    <motion.div
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 300, opacity: 0 }}
                        className="fixed top-20 right-4 z-[200] bg-background/90 backdrop-blur-xl border border-aki-pink/30 rounded-2xl p-4 shadow-2xl shadow-aki-pink/20"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-3xl">{newAchievement.icon}</span>
                            <div>
                                <p className="text-xs text-aki-pink font-bold uppercase tracking-wider">Achievement Unlocked!</p>
                                <p className="font-bold text-foreground">{newAchievement.name}</p>
                                <p className="text-xs text-muted-foreground">{newAchievement.description}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Trophy modal */}
            <AnimatePresence>
                {showTrophy && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[300] flex items-center justify-center bg-black/50 backdrop-blur-sm"
                        onClick={() => setShowTrophy(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-background/95 backdrop-blur-xl border border-white/20 rounded-3xl p-6 max-w-md w-full mx-4 shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="text-center mb-6">
                                <span className="text-5xl">🏆</span>
                                <h2 className="text-2xl font-bold mt-2">Easter Eggs</h2>
                                <p className="text-sm text-muted-foreground">
                                    {unlockedCount}/{achievements.length} discovered
                                </p>
                            </div>

                            <div className="space-y-3">
                                {achievements.map(achievement => (
                                    <div
                                        key={achievement.id}
                                        className={`flex items-center gap-3 p-3 rounded-xl transition-all ${achievement.unlocked
                                                ? "bg-aki-pink/10 border border-aki-pink/20"
                                                : "bg-muted/30 opacity-50"
                                            }`}
                                    >
                                        <span className="text-2xl">{achievement.unlocked ? achievement.icon : "❓"}</span>
                                        <div>
                                            <p className="font-medium">{achievement.unlocked ? achievement.name : "???"}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {achievement.unlocked ? achievement.description : "Keep exploring..."}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <p className="text-center text-xs text-muted-foreground mt-4">
                                Press Ctrl+T to toggle this menu
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
