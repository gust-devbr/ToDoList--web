import { taskService } from "@/services/api/taskService"
import { getToken } from "@/utils/auth"
import { Response } from "@/utils/response"
import { NextRequest } from "next/server"

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