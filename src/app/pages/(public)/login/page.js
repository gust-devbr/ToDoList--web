'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from '@/context/AuthContext';
import { Spinner, ValidatePassword, ValidateEmail } from "@/components";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

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
            toast.error("Email e/ou senha inválidos");
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
            <div className="flex min-h-screen items-center justify-center">
                <Card className="flex flex-col bg-gray-100 border-none rounded-3xl p-3.5 shadow-md shadow-gray-800 w-100">
                    <CardTitle className="text-center text-3xl mb-5 mt-2">Login</CardTitle>

                    <CardContent className="flex flex-col items-center gap-4">
                        <Input
                            autoFocus
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="py-6 text-xl md:text-lg w-90"
                            autoCapitalize="none"
                        />
                        {errors.email && (
                            <span className="text-sm text-red-500">
                                {errors.email}
                            </span>
                        )}
                        <Input
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className="py-6 text-xl md:text-lg w-90"
                        />
                        {errors.senha && (
                            <span className="text-sm text-red-500">
                                {errors.senha}
                            </span>
                        )}
                    </CardContent>

                    <span className="flex flex-row justify-between text-md py-1 px-2 rounded-xl">
                        <span>Não tem conta?</span>

                        <Link href={"/pages/register"}>
                            <span className="text-blue-600 hover:underline">Cadastre-se</span>
                        </Link>
                    </span>

                    <Button disabled={isDisabled}>
                        {loading ? <Spinner /> : "Login"}
                    </Button>
                </Card>
            </div>
        </form>
    )
};