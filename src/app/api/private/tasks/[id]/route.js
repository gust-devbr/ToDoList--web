import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromToken } from "@/lib/auth";

export async function DELETE(req, context) {
    try {
        const { id } = await context.params;

        const user = await getUserFromToken();
        if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 403 });

        const task = await prisma.task.findFirst({
            where: { id, userId: user.id }
        });
        if (!task) return NextResponse.json({ error: "Tarefa não encontrada" }, { status: 404 });

        const deleted = await prisma.task.delete({
            where: { id }
        });

        return NextResponse.json(deleted, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao deletar tarefa" }, { status: 500 });
    }
};

export async function PUT(req, context) {
    try {
        const { id } = await context.params;

        const { title } = await req.json();
        if (!title) return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });

        const user = await getUserFromToken();
        if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 403 });

        const task = await prisma.task.findFirst({
            where: { id, userId: user.id }
        });
        if (!task) return NextResponse.json({ error: "Não autorizado" }, { status: 403 });

        const renamed = await prisma.task.update({
            where: { id },
            data: { ...(title && { title }) }
        });

        return NextResponse.json(renamed, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao renomear tarefa" }, { status: 500 });
    }
};

export async function PATCH(req, context) {
    try {
        const { id } = await context.params;

        const user = await getUserFromToken();
        if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 403 });

        const task = await prisma.task.findFirst({
            where: { id, userId: user.id }
        });
        if (!task) return NextResponse.json({ error: "Tarefa não encontrada" }, { status: 404 });

        const updated = await prisma.task.update({
            where: { id },
            data: { completed: !task.completed }
        });

        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao atualizar tarefa" }, { status: 500 });
    }
};