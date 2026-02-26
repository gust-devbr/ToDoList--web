/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { lightTheme, darkTheme } from "@/components/utils/Themes";
import { useAuth } from "./AuthContext";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        const saved = localStorage.getItem("theme");
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

    const toggleTheme = () => setDarkMode(prev => !prev);

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