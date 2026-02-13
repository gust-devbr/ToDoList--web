import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { AuthButton } from "@/components/ui/button";

export default function Login() {
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [aviso, setAviso] = useState('');
    const [senhaAlert, setSenhaAlert] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (senha.length === 0) {
            setAviso('')
            setSenhaAlert(false)
        } else if (senha.length <= 6) {
            setAviso('Senha maior que 6 caracteres')
            setSenhaAlert(true)
        } else {
            setAviso('')
            setSenhaAlert(false)
        }
    }, [senha])

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    async function handleLogin(e) {
        e.preventDefault();

        if (!validateEmail(email)) {
            alert("Digite um Email válido");
            return;
        };

        try {
            setLoading(true)

            const res = await api.post('/auth/login', { email, senha });

            console.log(res.data)

            await login({
                token: res.data.token,
                user: { nome: res.data.nome, email: res.data.email }
            });

            setTimeout(() => {
                navigate("/tasks");
            }, 800);

        } catch (err) {
            console.log(err);
            alert("Email ou senha inválidos");
        } finally {
            setLoading(false);
        }
    };

    const isDisabled = !email || !senha || senha.length <= 6;

    return (
        <form onSubmit={handleLogin}>
            <div className="flex flex-col bg-gray-100 border-none rounded-3xl p-3.5 shadow-md shadow-gray-800 min-w-100 max-w-120">
                <h1 className="text-center text-3xl mb-5 mt-2">Login</h1>

                <Input
                    name="auth"
                    autoFocus
                    label="Email"
                    value={email}
                    onChangeValue={setEmail}
                />

                <Input
                    name="auth"
                    className={`${senhaAlert ? "border-red-500 border-2" : "border"}`}
                    label="Senha"
                    value={senha}
                    onChangeValue={setSenha}
                />
                <span className={`text-sm ${senhaAlert && "text-red-500"}`}>
                    {aviso}
                </span>

                <span className="flex flex-row justify-between mt-3 mb-3 text-md py-1 px-2 rounded-xl">
                    <span>Não tem conta?</span>
                    <span className="text-blue-600 hover:underline" onClick={() => navigate("/cadastro")}>Cadastre-se</span>
                </span>

                <AuthButton
                    disabled={isDisabled}
                    condition={isDisabled || loading}
                    icon={loading && Spinner}
                >
                    {loading ? "Entrando..." : "Login"}
                </AuthButton>
            </div>
        </form>
    )
};