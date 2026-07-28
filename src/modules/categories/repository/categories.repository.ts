import { prisma } from "@/lib/prisma";

import type { CreateCategorySchema } from "../schemas/create-category.schema";
import type { UpdateCategorySchema } from "../schemas/update-category.schema";

export class CategoriesRepository {

    findById = async (id: string) => {
        return await prisma.category.findFirst({ where: { id } })
    }

    findAll = async (userId: string) => {
        return await prisma.category.findMany({
            where: { userId },
            include: {
                _count: { select: { tasks: true } },
            }
        })
    }

    deleteById = async (id: string) => {
        await prisma.category.delete({ where: { id } })
    }

    existsByNameAndColor = async (name: string, color: string) => {
        return await prisma.category.findFirst({
            where: {
                OR: [{ name }, { color }]
            }
        })
    }

    create = async (userId: string, data: CreateCategorySchema) => {
        return await prisma.category.create({
            data: {
                userId,
                ...data
            }
        })
    }

    update = async (data: UpdateCategorySchema & { id: string }) => {
        const { id, name, color } = data

        return await prisma.category.update({
            where: { id },
            data: {
                ...(name && { name }),
                ...(color && { color })
            }
        })
    }

}
