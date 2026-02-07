import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import ChangeModalPass from "../../components/ChangePassModal";

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
        <div className="flex-1 p-6 min-h-screen min-w-screen ml-0 -mt-3" style={{ backgroundColor: theme.card, color: theme.text }}>

            <div className="flex flex-row justify-between mt-10 rounded-xl p-3 items-center" style={{ backgroundColor: theme.background }}>
                <label>Tema escuro</label>
                <input
                    className="accent-indigo-600 w-5 h-5"
                    type="checkbox"
                    checked={darkMode}
                    onChange={toggleTheme}
                />
            </div>

            <div className="p-3 mb-3 mt-3 rounded-xl" style={{ backgroundColor: theme.background }}>
                <p className="text-md text-left">
                    <strong>Usuário:</strong> {user?.nome}
                    <br />
                    <strong>Email:</strong> {user?.email}
                </p>
                <button
                    className="mt-2 border text-black font-semibold text-md bg-white px-2 py-1 rounded-md"
                    onClick={() => setIsModalChangePassOpen(true)}
                >
                    Alterar senha
                </button>
            </div>

            <ChangeModalPass
                isOpen={isModalChangePassOpen}
                onClose={() => setIsModalChangePassOpen(false)}
            />

            <div className="p-2 rounded-sm mt-auto mb-8 lg:mb-0" style={{ backgroundColor: theme.card }}>
                <button
                    className="mb-1 w-full px-5 py-2 border-none rounded-sm cursor-pointer text-[1rem] text-white bg-red-600"
                    onClick={handleLogout}
                >
                    Sair
                </button>

                <button
                    className="w-full px-5 py-2 border-none rounded-sm cursor-pointer text-[1rem] text-white bg-red-800"
                    onClick={handleDelete}
                >
                    Apagar Conta
                </button>
            </div>
        </div>
    );
};