import { Response } from "@/utils/response";
import { getToken } from "@/utils/auth";
import { NextRequest } from "next/server";
import { categoryService } from "@/services/categoryService";

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        if (!id) return Response.error("ID não fornecido", null, 400)

        const user = await getToken(req)
        if (!user) return Response.error("Não autorizado", null, 401)

        await categoryService.delete(id)

        return Response.success(null, "Categoria excluída")
    } catch (error) {
        return Response.error("Erro ao excluir categoria", error)
    }
}