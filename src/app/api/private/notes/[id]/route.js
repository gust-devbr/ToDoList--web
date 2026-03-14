import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/components/utils/requireAuth";

export async function DELETE(req, { params }) {
    try {
        const { id } = await params;

        const user = await requireAuth(req);
        if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 403 });

        const note = await prisma.note.findFirst({
            where: { id, userId: user.id }
        });
        if (!note) return NextResponse.json({ error: "Nota não encontrada" }, { status: 404 });

        const deleted = await prisma.note.delete({
            where: { id }
        });

        return NextResponse.json(deleted, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao deletar nota" }, { status: 500 });
    }
};

export async function PUT(req, { params }) {
    try {
        const { id } = await params;

        const { title, content } = await req.json();
        if (!title || !content) return NextResponse.json({ error: "Dados incompletoso" }, { status: 400 });

        const user = await requireAuth(req);
        if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 403 });

        const note = await prisma.note.findFirst({
            where: { id, userId: user.id }
        });
        if (!note) return NextResponse.json({ error: "Nota não encontrada" }, { status: 404 });

        const renamed = await prisma.note.update({
            where: { id },
            data: { title, content }
        });

        return NextResponse.json(renamed, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao editar nota" }, { status: 500 });
    }
};

export async function PATCH(req, { params }) {
    try {
        const { id } = await params;

        const user = await requireAuth(req);
        if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 403 });

        const note = await prisma.note.findFirst({
            where: { id, userId: user.id }
        });
        if (!note) return NextResponse.json({ error: "Nota não encontrada" }, { status: 404 });

        const updated = await prisma.note.update({
            where: { id },
            data: { pinned: !note.pinned }
        });

        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao fixar nota" }, { status: 500 });
    }
};