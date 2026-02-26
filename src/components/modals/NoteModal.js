'use client'

import { useEffect } from "react";
import { useTheme } from "@/context";
import { FaCheck, MdCancel } from '@/components/icons'
import { Input, TextArea, Button } from "@/components";

export function NoteModal({
    isOpen,
    onClose,
    onSubmit,
    titleValue,
    setTitleValue,
    contentValue,
    setContentValue,
    mode
}) {
    const { theme } = useTheme();
    const isCreate = mode === "create";

    useEffect(() => {
        function handleKeyDown(e) {
            switch (e.key) {
                case "Escape":
                    onClose();
                    break;
                case "Enter":
                    e.preventDefault();
                    onSubmit();
                    break;
            }
        };

        if (isOpen) window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);

    }, [isOpen, onClose, onSubmit]);

    if (!isOpen) return null;

    return (
        <div className="flex justify-center items-center fixed top-0 -mt-6 left-0 w-full h-full bg-black/30">
            <div
                style={{ backgroundColor: theme.background }}
                className="p-5 rounded-xl w-90 min-h-20 shadow-white shadow-sm"
            >
                <h2 className="text-center mb-5 text-2xl font-bold">
                    {isCreate ? "Criar Nota" : "Editar Nota"}
                </h2>

                <Input
                    autoFocus
                    name="noteTitle"
                    label="Título:"
                    value={titleValue ?? ""}
                    onChangeValue={setTitleValue}
                />

                <TextArea
                    label="Conteúdo:"
                    value={contentValue ?? ""}
                    onChangeValue={setContentValue}
                />

                <div className="flex justify-end items-center -mt-8 gap-3">
                    <Button
                        style={{ color: theme.text }}
                        title={isCreate ? "Criar" : "Salvar"}
                        onClick={onSubmit}
                        icon={FaCheck}
                    />

                    <Button
                        style={{ color: theme.text }}
                        title="Cancelar"
                        onClick={onClose}
                        icon={MdCancel}
                    />
                </div>
            </div>
        </div>
    )
};