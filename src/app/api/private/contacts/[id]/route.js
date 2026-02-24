import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromToken } from "@/lib/auth";

export async function DELETE(req, context) {
    try {
        const user = await getUserFromToken();
        const { id } = await context.params;

        const contact = await prisma.contact.findFirst({
            where: { id, userId: user.id }
        });
        if (!contact) return NextResponse.json({ error: "Não autorizado" }, { status: 403 })

        const deleted = await prisma.contact.delete({
            where: { id }
        });

        if (deleted.count === 0) return NextResponse.json({ message: "Contato não encontrado" }, { status: 404 });

        return NextResponse.json(deleted, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao deletar contato" }, { status: 500 });
    }
};

export async function PUT(req, context) {
    try {
        const { name, email, tel, category } = await req.json();
        const user = await getUserFromToken();
        const { id } = await context.params;

        const contact = await prisma.contact.findFirst({
            where: { id, userId: user.id }
        });
        if (!contact) return NextResponse.json({ error: "Não autorizado" }, { status: 403 });

        if (!name
            || !email
            || !tel
            || !category
        ) return NextResponse.json({ error: "Campos obrigatórios" }, { status: 400 });

        const renamed = await prisma.contact.update({
            where: { id },
            data: {
                ...(name && { name }),
                ...(email && { email }),
                ...(tel && { tel }),
                ...(category && { category }),
            }
        });

        if (renamed.count === 0) return NextResponse.json({ message: "Contato não encontrado" }, { status: 404 });

        return NextResponse.json(renamed, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao editar contato" }, { status: 500 });
    }
};

export async function PATCH(req, context) {
    try {
        const user = await getUserFromToken();
        const { id } = await context.params;

        const contact = await prisma.contact.findFirst({
            where: { id, userId: user.id }
        });
        if (!contact) return NextResponse.json({ error: "Não autorizado" }, { status: 403 });

        const updated = await prisma.contact.update({
            where: { id },
            data: { favorite: !contact.favorite }
        });

        if (updated.count === 0) return NextResponse.json({ message: "Contato não encontrado" }, { status: 404 });

        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao atualizar contato" }, { status: 500 });
    }
};