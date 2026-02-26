import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from 'bcrypt';
import { getUserFromToken } from "@/lib/auth";

export async function PUT(req) {
    try {
        const { atualSenha, novaSenha } = await req.json();
        if (!atualSenha || !novaSenha) return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });

        const user = await getUserFromToken();
        if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 403 });

        const findUser = await prisma.user.findFirst({ where: { id: user.id } });
        if (!findUser) return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });

        const validPassword = await bcrypt.compare(atualSenha, findUser.password);
        if (!validPassword) return NextResponse.json({ error: "Senha atual incorreta" }, { status: 400 });

        const hashedPassword = await bcrypt.hash(novaSenha, 10);

        await prisma.user.update({
            where: { id: user.id },
            data: { password: hashedPassword }
        });

        return NextResponse.json({ message: "Senha alterada com sucesso" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao altera senha" }, { status: 500 });
    }
};

export async function DELETE() {
    try {
        const user = await getUserFromToken();
        if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 403 });

        await prisma.user.delete({
            where: { id: user.id }
        });

        return NextResponse.json({ message: "Usuário deletado" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao deletar usuário" }, { status: 500 });
    }
};