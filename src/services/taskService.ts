import { prisma } from "@/lib/prisma";

export const taskService = {
    getAll: async (status: string) => {
        return await prisma.task.findMany({
            where: {
                ...(status === "completed" && { completed: true }),
                ...(status === "pending" && { completed: false }),
            },
            orderBy: [
                { completed: "desc" },
                { createdAt: "asc" }
            ]
        });
    },

    create: async (title: string, userId: string) => {
        return await prisma.task.create({
            data: { title, userId }
        })
    },

    findById: async (id: string) => {
        return await prisma.task.findFirst({ where: { id } });
    },

    update: async (id: string, title: string) => {
        await prisma.task.update({
            where: { id },
            data: { title }
        })
    },

    done: async (id: string) => {
        const task = await prisma.task.findFirst({ where: { id } })
        if (!task) return

        await prisma.task.update({
            where: { id },
            data: { completed: !task.completed }
        })
    },

    delete: async (id: string) => {
        await prisma.task.delete({ where: { id } });
    },

}