'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const ThemeContext = createContext();

const lightTheme = {
    background: "#FFF",
    text: "#000",
    card: "#F2F2F2",
    icon: "#da0000",
    checkIcon: "#0127bd",
};

const darkTheme = {
    background: "#121212",
    text: "#FFF",
    card: "#1E1E1E",
    icon: "#ff1a1a",
    checkIcon: "#224eff",
};

export function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (saved === 'dark') setDarkMode(true);
    }, []);

    useEffect(() => {
        localStorage.setItem("theme", darkMode ? 'dark' : 'light');
    }, [darkMode]);

    const theme = darkMode ? darkTheme : lightTheme;

    useEffect(() => {
        if (user) {
            document.body.style.backgroundColor = theme.background;
            document.body.style.transition = "background-color 0.3s ease";
        } else {
            document.body.style.backgroundColor = "#FFF";
        }
    }, [theme, user])

    function toggleTheme() {
        setDarkMode(prev => !prev);
    };

    return (
        <ThemeContext.Provider value={{ theme, darkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
};

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme fora do provider");
    return context;
};

export { ThemeContext };