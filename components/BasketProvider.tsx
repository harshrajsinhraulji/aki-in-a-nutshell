"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAudio } from "@/components/audio-provider";

type Plushie = {
    id: string;
    name: string;
    image?: string;
};

type BasketContextType = {
    basket: Plushie[];
    addToBasket: (plushie: Plushie) => void;
    removeFromBasket: (id: string) => void;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
};

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export function BasketProvider({ children }: { children: React.ReactNode }) {
    const [basket, setBasket] = useState<Plushie[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const { playClickSound } = useAudio();

    // Persist basket
    useEffect(() => {
        const saved = localStorage.getItem("aki-basket");
        if (saved) setBasket(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("aki-basket", JSON.stringify(basket));
    }, [basket]);

    const addToBasket = (plushie: Plushie) => {
        if (!basket.find(p => p.id === plushie.id)) {
            setBasket([...basket, plushie]);
            playClickSound();
            setIsOpen(true);
        }
    };

    const removeFromBasket = (id: string) => {
        setBasket(basket.filter(p => p.id !== id));
    };

    return (
        <BasketContext.Provider value={{ basket, addToBasket, removeFromBasket, isOpen, setIsOpen }}>
            {children}
        </BasketContext.Provider>
    );
}

export const useBasket = () => {
    const context = useContext(BasketContext);
    if (!context) throw new Error("useBasket must be used within BasketProvider");
    return context;
};
