import { useState } from "react";
import { useAuth, useTheme } from "@/context";
import { Button, Input, ChangePassModal } from "@/components";

export default function Settings() {
    const { user, logout, deleteAccount } = useAuth();
    const { darkMode, toggleTheme, theme } = useTheme();
    const [isModalChangePassOpen, setIsModalChangePassOpen] = useState(false);

    function handleLogout() {
        const confirmed = window.confirm("Realmente deseja sair?")
        if (confirmed) {
            logout()
        }
    };

    function handleDelete() {
        const confirmed = window.confirm("Deseja realmente deletar conta?")
        if (confirmed) {
            deleteAccount()
        }
    };

    return (
        <div className="flex flex-col flex-1 min-h-screen px-2" style={{ backgroundColor: theme.card, color: theme.text }}>
            <div
                className="flex flex-row justify-between md:mt-4 py-5 px-4 mt-15 md:pt-6 rounded-xl items-center"
                style={{ backgroundColor: theme.background }}
            >
                <label>Tema escuro</label>
                <Input
                    name="check"
                    type="checkbox"
                    checked={darkMode}
                    onChangeValue={toggleTheme}
                />
            </div>

            <div className="p-3 mb-3 mt-3 rounded-xl" style={{ backgroundColor: theme.background }}>
                <p className="text-md text-left">
                    <strong>Usuário:</strong> {user?.nome}
                    <br />
                    <strong>Email:</strong> {user?.email}
                </p>
                <Button
                    name="change"
                    onClick={() => setIsModalChangePassOpen(true)}
                    label="Alterar senha"
                />
            </div>

            <ChangePassModal
                isOpen={isModalChangePassOpen}
                onClose={() => setIsModalChangePassOpen(false)}
            />

            <div className="p-2 rounded-sm mt-auto mb-8 md:mb-0" style={{ backgroundColor: theme.card }}>
                <Button
                    name="warning"
                    onClick={handleLogout}
                    label="Sair da conta"
                />

                <Button
                    name="warning"
                    className="bg-red-900"
                    onClick={handleDelete}
                    label="Apagar conta"
                />
            </div>
        </div>
    );
};