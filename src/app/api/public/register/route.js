import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from 'bcrypt';


export async function POST(req) {
    try {
        const { nome, email, senha } = await req.json();

        if (!nome || !email || !senha) return NextResponse.json({ error: "Campos obrigatórios" }, { status: 400 });

        const userExist = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                name: true,
                email: true,
                password: true
            }
        });
        if (userExist) return NextResponse.json({ error: "Usuário já cadastrado" }, { status: 400 });

        const hashedPassword = await bcrypt.hash(senha, 10);

        const user = await prisma.user.create({
            data: {
                name: nome,
                email,
                password: hashedPassword
            }
        });

        return NextResponse.json(
            { message: "Usuário cadastrado com sucesso", userId: user.id },
            { status: 201 }
        );

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao cadastrar usuário" }, { status: 500 });
    }
};