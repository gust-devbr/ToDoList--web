import { taskService } from "@/services/taskService"
import { getToken } from "@/utils/auth"
import { Response } from "@/utils/response"
import { NextRequest } from "next/server"

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { title, categoryId } = await req.json()
        console.log("CATEGORY ID: ", categoryId)

        const { id } = await params
        if (!id) return Response.error("ID não fornecido", null, 400)

        const user = await getToken(req)
        if (!user) return Response.error("Não autorizado", null, 401)

        await taskService.update(id, title, categoryId)

        return Response.success(null, "Tarefa editada")
    } catch (error) {
        return Response.error("Erro ao editar tarefa", error)
    }
}