'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from '@/context';
import {
    Spinner,
    Input,
    AuthButton,
    ValidatePassword,
    ValidateEmail
} from "@/components";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        email: "",
        senha: ""
    });

    useEffect(() => {
        setErrors(prev => ({ ...prev, email: ValidateEmail(email) }));
    }, [email]);

    useEffect(() => {
        setErrors(prev => ({ ...prev, senha: ValidatePassword(senha) }));
    }, [senha]);

    async function handleLogin(e) {
        e.preventDefault();

        if (errors.email || errors.senha) return;

        try {
            setLoading(true);
            
            await login({ email, senha });
            setTimeout(() => router.replace("/pages/tasks"), 800);
        } catch (err) {
            console.error(err);
            alert("Email ou senha inválidos");
        } finally {
            setLoading(false);
        }
    };

    const isDisabled =
        !email ||
        !senha ||
        errors.email ||
        errors.senha;

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
                {errors.email && (
                    <span className="text-sm text-red-500">
                        {errors.email}
                    </span>
                )}
                <Input
                    name="auth"
                    className="border"
                    label="Senha"
                    value={senha}
                    onChangeValue={setSenha}
                />
                {errors.senha && (
                    <span className="text-sm text-red-500">
                        {errors.senha}
                    </span>
                )}
                <span className="flex flex-row justify-between mt-3 mb-3 text-md py-1 px-2 rounded-xl">
                    <span>Não tem conta?</span>

                    <Link href={"/pages/register"}>
                        <span className="text-blue-600 hover:underline">Cadastre-se</span>
                    </Link>
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