"use client";

import * as React from "react";

type Theme = "dark" | "light";

const ThemeContext = React.createContext<{
    theme: Theme;
    toggleTheme: () => void;
}>({
    theme: "dark",
    toggleTheme: () => { },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = React.useState<Theme>("dark");

    React.useEffect(() => {
        const saved = localStorage.getItem("aki-theme") as Theme;
        if (saved) {
            setTheme(saved);
        } else {
            // Default to dark
            setTheme("dark");
        }
    }, []);

    React.useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("aki-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => React.useContext(ThemeContext);
