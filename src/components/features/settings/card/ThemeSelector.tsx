"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { useEffect, useState } from "react";

const options = [
    { value: "light", label: "Claro", icon: Sun },
    { value: "dark", label: "Escuro", icon: Moon },
    { value: "system", label: "Sistema", icon: Monitor },
];

export function ThemeSelector() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <div className="space-y-2">
            <h3 className="text-lg font-medium">Tema</h3>

            <div className="grid grid-cols-3 gap-3">
                {options.map(({ value, label, icon: Icon }) => {
                    const active = theme === value;

                    return (
                        <button
                            key={value}
                            onClick={() => setTheme(value)}
                            className={`
                                flex items-center gap-2 rounded-xl border p-4
                                transition-all
                                ${active
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                                    : "border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"}
                                `}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="text-sm">{label}</span>

                            <div className="ml-auto">
                                <div
                                    className={`
                                        w-4 h-4 rounded-full border
                                        ${active
                                            ? "bg-blue-500 border-blue-500"
                                            : "border-gray-400"}
                                    `}
                                />
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}