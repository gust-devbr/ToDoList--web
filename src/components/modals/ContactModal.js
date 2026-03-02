/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState } from "react";
import { FaCheck, MdCancel } from '@/components/icons';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function ContactModal({
    isOpen,
    mode,
    contact,
    onClose,
    onSave
}) {
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
    };

    function onSubmit() {
        if (!form.name.trim()) return;
        onSave(form, contact?.id);
        onClose();
    };

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
    }, [isOpen, onClose, form]);

    const fields = [
        { name: "name", label: "Nome" },
        { name: "email", label: "Email" },
        { name: "tel", label: "Telefone" },
        { name: "category", label: "Categoria" }
    ];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        {isCreate ? "Adicionar Contato" : "Editar Contato"}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {fields.map(field => (
                        <Input
                            key={field.name}
                            placeholder={field.label}
                            value={form[field.name]}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                        />
                    ))}
                </div>

                <DialogFooter>
                    <Button onClick={onSubmit}>
                        <FaCheck className="mr-1 h-4 w-4" />
                        {isCreate ? "Criar" : "Salvar"}
                    </Button>
                    <Button variant="outline" onClick={onClose}>
                        <MdCancel className="mr-1 h-4 w-4" />
                        Cancelar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
};