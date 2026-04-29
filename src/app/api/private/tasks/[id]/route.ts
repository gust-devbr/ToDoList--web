import { Response } from "@/utils/response";
import { taskService } from "@/services/taskService";
import { getToken } from "@/utils/auth";
import { NextRequest } from "next/server";

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        if (!id) return Response.error("ID não fornecido", null, 400)

        const user = await getToken(req)
        if (!user) return Response.error("Não autorizado", null, 401)

        await taskService.done(id)

        return Response.success(null, "Tarefa completa")
    } catch (error) {
        return Response.error("Erro ao completar tarefa", error)
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { title } = await req.json()

        const { id } = await params
        if (!id) return Response.error("ID não fornecido", null, 400)

        const user = await getToken(req)
        if (!user) return Response.error("Não autorizado", null, 401)

        await taskService.update(id, title)

        return Response.success(null, "Tarefa editada")
    } catch (error) {
        return Response.error("Erro ao editar tarefa", error)
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        if (!id) return Response.error("ID não fornecido", null, 400)

        const user = await getToken(req)
        if (!user) return Response.error("Não autorizado", null, 401)

        await taskService.delete(id)

        return Response.success(null, "Tarefa excluída")
    } catch (error) {
        return Response.error("Erro ao excluir tarefa", error)
    }
}