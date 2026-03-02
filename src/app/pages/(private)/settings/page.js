'use client'

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ChangePassModal } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Field } from "@/components/ui/field";
import { ThemeToggle } from "@/context/ThemeToggle";
import { Label } from "@/components/ui/label";

export default function Settings() {
    const { user, logout, deleteAccount } = useAuth();
    const [isModalChangePassOpen, setIsModalChangePassOpen] = useState(false);

    function handleLogout() {
        const confirmed = window.confirm("Realmente deseja sair?")
        if (confirmed) logout();
    };

    function handleDelete() {
        const confirmed = window.confirm("Deseja realmente deletar conta?")
        if (confirmed) deleteAccount();
    };

    return (
        <Card className="h-screen px-4 -mt-14 md:-mt-4 rounded-none border-zinc-600 bg-background text-foreground">
            <Field orientation="horizontal" className="flex justify-between bg-card text p-3 mt-5 rounded-xl">
                <Label className="text-md">
                    Mudar tema
                </Label>
                <ThemeToggle />
            </Field>

            <CardContent className="p-3 mb-3 mt-3 rounded-xl bg-card">
                <p className="text-md text-left">
                    <strong>Usuário:</strong> {user?.name}
                    <br />
                    <strong>Email:</strong> {user?.email}
                </p>
                <Button
                    className="mt-3 bg-background text-foreground"
                    name="change"
                    onClick={() => setIsModalChangePassOpen(true)}
                >
                    ALTERAR SENHA
                </Button>
            </CardContent>

            <ChangePassModal
                isOpen={isModalChangePassOpen}
                onClose={() => setIsModalChangePassOpen(false)}
            />

            <CardFooter className="flex flex-col gap-2 mt-auto md:mb-0">
                <Button className="w-full py-6" onClick={handleLogout}>
                    SAIR DA CONTA
                </Button>

                <Button className="w-full py-6" variant="destructive" onClick={handleDelete}>
                    APAGAR CONTA
                </Button>
            </CardFooter>
        </Card>
    );
};