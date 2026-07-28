import { NextRequest } from "next/server";

import { CategoriesService } from "../services/categories-services";

import { Response } from "@/utils/class/Response";
import { getUserId } from "@/utils/auth";

export class CategoriesController {

    constructor(
        private service = new CategoriesService()
    ) { }

    getHandler = async (req: NextRequest) => {
        try {
            const userId = getUserId(req)
            if (!userId)
                return Response.error("Não autorizado", 401)

            const categories = await this.service.findAll(userId)

            return Response.success({ categories })
        } catch (error) {
            return Response.error(
                (error as Error).message ?? "Erro interno"
            )
        }
    }

    postHandler = async (req: NextRequest) => {
        try {
            const userId = getUserId(req)
            if (!userId)
                return Response.error("Não autorizado", 401)

            const body = await req.json()

            const category = await this.service.create(userId, body)

            return Response.success({ category }, "Categoria criada", 201)
        } catch (error) {
            return Response.error(
                (error as Error).message ?? "Erro interno"
            )
        }
    }

    putHandler = async (req: NextRequest, params: { id: string }) => {
        try {
            const userId = getUserId(req)
            if (!userId)
                return Response.error("Não autorizado", 401)

            const { id } = params
            if (!id)
                return Response.error("ID não fornecido", 400)

            const category = await this.service.update(id, await req.json())

            return Response.success({ category }, "Categoria editada")
        } catch (error) {
            return Response.error(
                (error as Error).message ?? "Erro interno"
            )
        }
    }

    deleteHandler = async (req: NextRequest, params: { id: string }) => {
        try {
            const userId = getUserId(req)
            if (!userId)
                return Response.error("Não autorizado", 401)

            if (!params.id)
                return Response.error("ID não fornecido", 400)

            await this.service.delete(params.id)

            return Response.success(null, "Categoria excluída")
        } catch (error) {
            return Response.error(
                (error as Error).message ?? "Erro interno"
            )
        }
    }

}