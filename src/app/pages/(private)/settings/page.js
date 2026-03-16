'use client'

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ChangePassModal, ConfirmDialog, DeleteAccountModal } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Field } from "@/components/ui/field";
import { ThemeToggle } from "@/context/ThemeToggle";
import { Label } from "@/components/ui/label";

export default function Settings() {
    const { user, logout } = useAuth();
    const [modal, setModal] = useState({
        isChangeOpen: false,
        isDeleteOpen: false
    });

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
                    onClick={() => setModal(prev => ({ ...prev, isChangeOpen: true }))}
                >
                    ALTERAR SENHA
                </Button>
            </CardContent>

            <ChangePassModal
                isOpen={modal.isChangeOpen}
                onClose={() => setModal(prev => ({ ...prev, isChangeOpen: false }))}
            />

            <DeleteAccountModal
                isOpen={modal.isDeleteOpen}
                onClose={() => setModal(prev => ({ ...prev, isDeleteOpen: false }))}
            />

            <CardFooter className="flex flex-col gap-2 mt-auto md:mb-0">
                <ConfirmDialog
                    trigger={<Button className="w-full py-6">SAIR DA CONTA</Button>}
                    title="Sair da conta"
                    description="Tem certeza que deseja sair da conta?"
                    onConfirm={logout}
                    confirmText="Sair"
                />

                <ConfirmDialog
                    trigger={<Button className="w-full py-6" variant="destructive">APAGAR CONTA</Button>}
                    title="Apagar conta"
                    description="Deseja realmente deletar sua conta? Esta ação não pode ser desfeita."
                    onConfirm={() => setModal(prev => ({ ...prev, isDeleteOpen: true }))}
                    confirmText="Apagar"
                    cancelText="Cancelar"
                />
            </CardFooter>
        </Card>
    );
};