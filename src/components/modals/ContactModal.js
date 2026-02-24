'use client'

import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { FaCheck, MdCancel } from '@/components/icons';
import { Input, Button } from '@/components';

export function ContactModal({
    isOpen,
    mode,
    contact,
    onClose,
    onSave
}) {
    const { theme } = useTheme();
    const isCreate = mode === "create";

    const [form, setForm] = useState({
        name: "",
        email: "",
        tel: "",
        category: ""
    });

    useEffect(() => {
        if (mode === "edit" && contact) {
            setForm({
                id: contact.id ?? null,
                name: contact.name ?? "",
                email: contact.email ?? "",
                tel: contact.tel ?? "",
                category: contact.category ?? ""
            });
        } else {
            setForm({
                id: null,
                name: "",
                email: "",
                tel: "",
                category: ""
            });
        }
    }, [mode, contact]);

    function handleChange(field, value) {
        setForm(prev => ({
            ...prev,
            [field]: value
        }));
    }

    function onSubmit() {
        if (!form.name.trim()) return;
        onSave(form, contact?.id);
        onClose();
    }

    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === "Escape") onClose();

            if (e.key === "Enter" && e.ctrlKey) {
                e.preventDefault();
                onSubmit();
            }
        }

        if (isOpen) window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, onClose, form]);

    if (!isOpen) return null;

    const fields = [
        { name: "name", label: "Nome" },
        { name: "email", label: "Email" },
        { name: "tel", label: "Telefone" },
        { name: "category", label: "Categoria" }
    ];

    return (
        <div className="flex justify-center items-center fixed inset-0 bg-black/30">
            <div
                style={{ backgroundColor: theme.background }}
                className="p-6 rounded-xl w-96 shadow-md"
            >
                <h2 className="text-center mb-5 text-2xl font-bold">
                    {isCreate ? "Adicionar Contato" : "Editar Contato"}
                </h2>

                <div className="space-y-4">
                    {fields.map(field => (
                        <Input
                            key={field.name}
                            label={field.label}
                            value={form[field.name]}
                            onChangeValue={(value) =>
                                handleChange(field.name, value)
                            }
                        />
                    ))}
                </div>

                <div className="flex justify-end items-center mt-6 gap-3">
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