import { prisma } from "@/lib/prisma";

export const categoryService = {
    getAll: async () => {
        return await prisma.category.findMany()
    },

    findById: async (id: string) => {
        return await prisma.category.findFirst({ where: { id } })
    },

    findExisting: async (name: string, color: string) => {
        return await prisma.category.findFirst({ where: { name, color } })
    },

    create: async (name: string, color: string, userId: string) => {
        return await prisma.category.create({
            data: { name, color, userId }
        })
    },

    delete: async (id: string) => {
        await prisma.category.delete({ where: { id } })
    },

}