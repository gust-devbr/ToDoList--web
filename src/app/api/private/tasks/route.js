import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromToken } from "@/lib/auth";

export async function GET(req) {
    try {
        const url = new URL(req.url);
        const search = url.searchParams.get("search") || "";

        const user = await getUserFromToken();

        const tasks = await prisma.task.findMany({
            where: { userId: user.id, title: { contains: search, mode: "insensitive" } },
            orderBy: [
                { completed: "desc" },
                { createdAt: "desc" }
            ]
        });

        return NextResponse.json(tasks, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao buscar tarefas" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const user = await getUserFromToken();
        const { title } = await req.json();

        if (!title) return NextResponse.json({ error: "Campo obrigátorio" }, { status: 400 });

        const created = await prisma.task.create({
            data: { userId: user.id, title }
        });
        return NextResponse.json(created, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao criar tarefa" }, { status: 500 });
    }
};