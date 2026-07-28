import { NextRequest } from "next/server";

import { getUserId } from "@/utils/auth";
import { Response } from "@/utils/class/Response";

import { TaskService } from "../service/task-service";
import { getSearchParams } from "@/utils/searchParams";

export class TaskController {

    constructor(
        private service = new TaskService()
    ) { }

    getHandler = async (req: NextRequest) => {
        try {
            const userId = getUserId(req)
            if (!userId)
                return Response.error("Não autorizado", 401)

            const { status } = getSearchParams(req)

            const tasks = await this.service.getAll(status, userId)

            return Response.success({ tasks })
        } catch (error) {
            return Response.error((error as Error).message ?? "Erro interno")
        }
    }

    postHandler = async (req: NextRequest) => {
        try {
            const userId = getUserId(req)
            if (!userId)
                return Response.error("Não autorizado", 401)

            const task = await this.service.create(userId, await req.json())

            return Response.success({ task }, "Tarefa adicionada", 201)
        } catch (error) {
            return Response.error((error as Error).message ?? "Erro interno")
        }
    }

    deleteHandler = async (req: NextRequest, params: { id: string }) => {
        try {
            if (!getUserId(req))
                return Response.error("Não autorizado", 401)

            if (!params.id)
                return Response.error("ID não forncecido", 400)

            await this.service.delete(params.id)

            return Response.success(null, "Tarefa removida")
        } catch (error) {
            return Response.error((error as Error).message ?? "Erro internos")
        }
    }

    patchCompleteHandler = async (req: NextRequest, params: { id: string }) => {
        try {
            if (!getUserId(req))
                return Response.error("Não autorizado", 401)

            if (!params.id)
                return Response.error("ID não forncecido", 400)

            await this.service.complete(params.id)

            return Response.success(null, "Tarefa atualizada")
        } catch (error) {
            return Response.error((error as Error).message ?? "Erro interno")
        }
    }

    patchArchiveHandler = async (req: NextRequest, params: { id: string }) => {
        try {
            if (!getUserId(req))
                return Response.error("Não autorizado", 401)

            if (!params.id)
                return Response.error("ID não forncecido", 400)

            await this.service.archive(params.id)

            return Response.success(null, "Tarefa arquivada")
        } catch (error) {
            return Response.error((error as Error).message ?? "Erro interno")
        }
    }

    putHandler = async (req: NextRequest, params: { id: string }) => {
        try {
            if (!getUserId(req))
                return Response.error("Não autorizado", 401)

            if (!params.id)
                return Response.error("ID não forncecido", 400)

            const task = await this.service.update({
                id: params.id,
                ...await req.json()
            })

            return Response.success({ task }, "Tarefa editada")
        } catch (error) {
            return Response.error((error as Error).message ?? "Erro internos")
        }
    }

}