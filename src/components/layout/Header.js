'use client'

import { useTheme } from "@/context/ThemeContext"
import { AiOutlineClose } from "@/components/icons";
import { Input, Button } from "@/components";

export function Header({ title, onButtonClick, buttonLabel, searchValue, onSearchChange }) {
    const { theme } = useTheme();

    return (
        <header className="flex flex-col gap-5 mb-2">
            <p className="text-3xl text-center mb-4 font-bold mt-5">
                {title}
            </p>

            <Button name="create" onClick={onButtonClick}>
                {buttonLabel}
            </Button>

            <div className="relative inline-block">
                <Input
                    type="text"
                    name="search"
                    label="Buscar por título ou conteúdo..."
                    value={searchValue}
                    onChangeValue={onSearchChange}
                    style={{
                        backgroundColor: theme.background,
                        color: theme.text,
                        borderColor: theme.text
                    }}
                />
                <button onClick={() => onSearchChange("")}>
                    <AiOutlineClose
                        color="red"
                        size={25}
                        className="absolute right-0 -translate-y-5 mr-1"
                    />
                </button>
            </div>
        </header>
    )
};