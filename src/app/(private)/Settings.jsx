import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { FaArrowLeft } from "react-icons/fa";

export default function Settings() {
    const navigate = useNavigate();

    const { user, logout, deleteAccount } = useAuth();
    const { darkMode, toggleTheme, theme } = useTheme();

    return (
        <div className="border border-solid px-10 py-8 rounded-xl max-w-119 min-w-110" style={{ backgroundColor: theme.card, color: theme.text }}>

            <div className="flex items-center justify-between mb-5">
                <button
                    className="bg-transparent border-none text-xl"
                    style={{ color: theme.text }}
                    title="Voltar"
                    onClick={() => navigate("/tasks")}
                >
                    <FaArrowLeft />
                </button>
                <h2 className="text-[18px]">Configurações</h2>
            </div>

            <hr />

            <div className="flex flex-row justify-between mt-2 rounded-xl p-3 items-center" style={{ backgroundColor: theme.background }}>
                <label>
                    {darkMode ? "Tema claro" : "Tema escuro"}
                </label>
                <input
                    className="accent-indigo-600 w-5 h-5"
                    type="checkbox"
                    checked={darkMode}
                    onChange={toggleTheme}
                />
            </div>

            <div className="p-2 mb-3 mt-3 rounded-xl" style={{ backgroundColor: theme.background }}>
                <p className="text-md text-center">
                    <strong>Usuário:</strong> {user?.nome}
                    <br />
                    <strong>Email:</strong> {user?.email}
                </p>
            </div>

            <div className="p-2 mb-3 rounded-sm mt-10" style={{ backgroundColor: theme.card }}>
                <button
                    className="mb-1 w-full px-5 py-2 border-none rounded-sm cursor-pointer text-[1rem] text-white bg-red-600"
                    onClick={logout}
                >
                    Sair
                </button>

                <button
                    className="w-full px-5 py-2 border-none rounded-sm cursor-pointer text-[1rem] text-white bg-red-800"
                    onClick={deleteAccount}
                >
                    Apagar Conta
                </button>
            </div>
        </div>
    );
};