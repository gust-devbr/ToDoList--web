import { prisma } from "@/lib/prisma"

import { RegisterSchemaType } from "../schemas/register-user.schema"

export class AuthRepository {

    findById = async (id: string) => {
        return await prisma.user.findFirst({ where: { id } })
    }

    findByEmail = async (email: string) => {
        return await prisma.user.findUnique({ where: { email } })
    }

    create = async (data: RegisterSchemaType) => {
        return await prisma.user.create({ data })
    }
}