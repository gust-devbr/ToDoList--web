import { Response } from "@/utils/response";
import { categoryService } from "@/services/api/categoryService";
import { getToken } from "@/utils/auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const user = await getToken(req)
        if (!user) return Response.error("Não autorizado", null, 401)

        const categories = await categoryService.getAll(user.id)
        if (!categories) return Response.error("Nenhuma categoria foi encontrada", null, 404)

        return Response.success({ categories })
    } catch (error) {
        return Response.error("Erro ao buscar categorias", error)
    }
}

export async function POST(req: NextRequest) {
    try {
        const { name, color } = await req.json()

        const user = await getToken(req)
        if (!user) return Response.error("Não autorizado", null, 401)

        const exist = await categoryService.findExisting(name, color)
        if (exist) return Response.error("Categoria já existente", null, 409)

        const category = await categoryService.create(name, color, user.id)

        return Response.success({ category })
    } catch (error) {
        return Response.error("Erro ao criar categoria", error)
    }
}