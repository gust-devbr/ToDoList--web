import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const res = await api.post('/auth/login', { email, senha });

            console.log(res.data)

            await login({
                token: res.data.token,
                user: { nome: res.data.nome, email: res.data.email }
            });

            navigate("/tasks");
        } catch (err) {
            alert(err.response?.data?.error || "Email ou senha inválidos")
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div className="flex flex-col bg-gray-100 border-none rounded-3xl p-3.5 shadow-md shadow-gray-800 min-w-100 max-w-120">
                <h1 className="text-center text-3xl mb-5 mt-2">Login</h1>

                <input
                    autoFocus
                    className="border border-solid rounded-md mt-0.5 mb-0.5 py-3 px-4 text-md"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="border border-solid rounded-md mt-0.5 mb-0.5 py-3 px-4 text-md"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />

                <span className="flex flex-row justify-between mt-3 mb-3 text-md py-1 px-2 rounded-xl">
                    <span>Não tem conta?</span>
                    <span className="text-blue-600 hover:underline" onClick={() => navigate("/cadastro")}>Cadastre-se</span>
                </span>

                <button className="bg-green-700 text-white py-2 px-3 text-xl rounded-xl hover:bg-green-600 hover:shadow-md hover:shadow-gray-600">
                    Login
                </button>
            </div>
        </form>
    )
};