import { Response } from "@/utils/response";
import { taskService } from "@/services/taskService";
import { getToken } from "@/utils/auth";
import { getSearchParams } from "@/utils/searchParams";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { status } = getSearchParams(req)

        const user = await getToken(req)
        if (!user) return Response.error("Não autorizado", null, 401)

        const tasks = await taskService.getAll(status)
        if (!tasks) return Response.error("Tarefas não encontradas", null, 404)

        return Response.success({ tasks })
    } catch (error) {
        return Response.error("Erro ao buscar tarefas", error)
    }
}

export async function POST(req: NextRequest) {
    try {
        const { title, categoryId } = await req.json()

        const user = await getToken(req)
        if (!user) return Response.error("Não autorizado", null, 401)

        const task = await taskService.create(title, user.id, categoryId)

        return Response.success({ task })
    } catch (error) {
        return Response.error("Erro ao criar tarefa", error)
    }
}