import { Response } from "@/utils/response";
import { userService } from "@/services/userServices";
import { getToken } from "@/utils/auth";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
    try {
        const { name, email } = await req.json()

        const user = await getToken(req)
        if (!user) return Response.error("Não autorizado", null, 401)

        await userService.update(user.id, name, email)

        return Response.success(null, "Dados atualizados. Fazendo logout...")
    } catch (error) {
        return Response.error("Erro ao atualizar dados", error)
    }
}