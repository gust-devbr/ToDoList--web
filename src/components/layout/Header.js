'use client'

import { AiOutlineClose } from "@/components/icons";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function Header({ title, onButtonClick, buttonLabel, searchValue, onSearchChange }) {
    return (
        <header className="flex flex-col gap-5 mb-2">
            <p className="text-3xl text-center mb-4 font-bold mt-5">
                {title}
            </p>

            <Button onClick={onButtonClick} className="text-lg">
                {buttonLabel}
            </Button>

            <div className="relative inline-block">
                <Input
                    type="text"
                    placeholder="Buscar por título ou conteúdo..."
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                <Button
                    variant="ghost"
                    onClick={() => onSearchChange("")}
                    className="absolute right-0 mr-1"
                >
                    <AiOutlineClose className="w-5! h-5! text-red-500" />
                </Button>
            </div>
        </header>
    )
};