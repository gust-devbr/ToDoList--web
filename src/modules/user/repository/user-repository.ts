import { prisma } from "@/lib/prisma";

import type { UpdateUserSchema } from "../schemas/update-user.schema";

export class UserRepository {

    findById = async (id: string) => {
        return await prisma.user.findFirst({ where: { id } })
    }

    findByEmail = async (email: string) => {
        return await prisma.user.findUnique({ where: { email } })
    }

    update = async (body: UpdateUserSchema & { id: string }) => {
        const { id, name, email } = body

        return await prisma.user.update({
            where: { id },
            data: {
                ...(name && { name }),
                ...(email && { email })
            }
        })
    }

    deleteById = async (id: string) => {
        await prisma.user.delete({ where: { id } })
    }

}