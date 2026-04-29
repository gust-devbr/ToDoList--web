import { Response } from "@/utils/response";
import { getToken } from "@/utils/auth";
import { userService } from "@/services/userServices";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const user = await getToken(req)
        if (!user) return Response.error("Não autorizado", null, 401)

        const find = await userService.findById(user.id)
        if (!find) return Response.error("Usuário não encontrado", null, 404)

        return Response.success({ user: find })
    } catch (error) {
        return Response.error("Erro ao buscar dados", error)
    }
}