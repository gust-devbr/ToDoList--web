import { Response } from "@/utils/response";
import { userService } from "@/services/api/userServices";
import { getToken } from "@/utils/auth";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function DELETE(req: NextRequest) {
    try {
        const { password } = await req.json()

        const user = await getToken(req)
        if (!user) return Response.error("Não autorizado", null, 401)

        const findUser = await userService.findById(user.id)
        if (!findUser) return Response.error("Usuário não encontrado", null, 404)

        const valid = await bcrypt.compare(password, findUser.password)
        if (!valid) return Response.error("Senha incorreta", null, 400)

        await userService.delete(user.id)

        return Response.success(null, "Conta excluída com sucesso")
    } catch (error) {
        return Response.error("Erro ao excluir conta", error)
    }
}
