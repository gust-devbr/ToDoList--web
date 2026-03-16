'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Spinner,
    ValidateUsername,
    ValidateEmail,
    ValidatePassword
} from "@/components";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { api } from "@/components/utils/api";

export default function RegisterPage() {
    const router = useRouter();

    const [state, setState] = useState({
        nome: "",
        email: "",
        senha: "",
        loading: false,
    });
    const [errors, setErrors] = useState({
        nome: "",
        email: "",
        senha: ""
    });

    useEffect(() => {
        setErrors(prev => ({ ...prev, nome: ValidateUsername(state.nome) }));
    }, [state.nome]);

    useEffect(() => {
        setErrors(prev => ({ ...prev, email: ValidateEmail(state.email) }));
    }, [state.email]);

    useEffect(() => {
        setErrors(prev => ({ ...prev, senha: ValidatePassword(state.senha) }));
    }, [state.senha]);

    async function handleCadastro(e) {
        e.preventDefault();

        if (errors.nome || errors.email || errors.senha) return;

        try {
            setState(prev => (({ ...prev, loading: true })));

            await api("/public/register", {
                method: "POST",
                body: JSON.stringify({
                    nome: state.nome,
                    email: state.email,
                    senha: state.senha
                })
            });
            toast.success("Cadastro realizado!");
            setTimeout(() => router.replace("/"), 800);
        } catch (err) {
            console.error(err);
            toast.error("Erro ao cadastrar");
            setState(prev => (({ ...prev, loading: false })));
        } finally {
            setState(prev => (({ ...prev, loading: false })));
        }
    };

    const isDisabled =
        !state.nome ||
        !state.email ||
        !state.senha ||
        errors.nome ||
        errors.email ||
        errors.senha;

    return (
        <form onSubmit={handleCadastro}>
            <div className="flex min-h-screen items-center justify-center flex-col gap-1">
                <Card className="bg-gray-100 rounded-3xl p-3.5 shadow-md shadow-gray-800 w-100">
                    <CardTitle className="text-center text-3xl mb-5 mt-2">Cadastro</CardTitle>

                    <CardContent className="flex flex-col items-center gap-4">
                        <Input
                            autoFocus
                            placeholder="Nome"
                            value={state.nome}
                            onChange={(e) => setState(prev => ({ ...prev, nome: e.target.value }))}
                            className="py-6 text-xl md:text-lg w-90"
                        />
                        {errors.nome && (
                            <span className="text-sm text-red-500">
                                {errors.nome}
                            </span>
                        )}
                        <Input
                            placeholder="Email"
                            value={state.email}
                            onChange={(e) => setState(prev => ({ ...prev, email: e.target.value }))}
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
                            value={state.senha}
                            onChange={(e) => setState(prev => ({ ...prev, senha: e.target.value }))}
                            className="py-6 text-xl md:text-lg w-90"
                        />
                        {errors.senha && (
                            <span className="text-sm text-red-500">
                                {errors.senha}
                            </span>
                        )}
                    </CardContent>

                    <span className="flex flex-row justify-between text-md py-1 px-2 rounded-xl">
                        <span>Já tem conta?</span>

                        <Link href={"/"}>
                            <p className="text-blue-600 hover:underline text-md">Login</p>
                        </Link>
                    </span>

                    <Button disabled={isDisabled}>
                        {state.loading ? <Spinner /> : "Cadastrar"}
                    </Button>
                </Card>

                <p className="text-center text-2xs text-red-600 mt-2">*Não utilize dados reais</p>
            </div>
        </form>
    )
};