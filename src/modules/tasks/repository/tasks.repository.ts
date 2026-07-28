import { Task } from "@prisma/client";
import { prisma } from "@/lib/prisma";

import type { CreateTaskSchema } from "../schemas/create-task.schema";
import type { UpdateTaskSchema } from "../schemas/update-task.schema";

export class TaskRepository {

    findById = async (id: string) => {
        return await prisma.task.findFirst({ where: { id } })
    }

    deleteById = async (id: string) => {
        await prisma.task.delete({ where: { id } })
    }

    getAll = async (status: string, userId: string) => {
        return await prisma.task.findMany({
            where: {
                userId,

                archived: status === "archived" ? true : false,

                completed:
                    status === "completed"
                        ? true
                        : status === "pending"
                            ? false
                            : undefined
            },

            orderBy: [
                { completed: "desc" },
                status === "archived"
                    ? { archivedAt: "desc" }
                    : { createdAt: "desc" },
            ],
            include: {
                category: true
            }
        });
    }

    create = async (userId: string, body: CreateTaskSchema) => {
        return await prisma.task.create({
            data: {
                userId,
                ...body
            }
        })
    }

    update = async (body: UpdateTaskSchema) => {
        const { id, title, description, categoryId } = body

        return await prisma.task.update({
            where: { id },
            data: {
                ...(title && { title }),
                ...(description && { description }),
                ...(categoryId && { categoryId }),
            }
        })
    }

    complete = async (task: Task) => {
        await prisma.task.update({
            where: { id: task.id },
            data: { completed: !task.completed }
        })
    }

    archive = async (task: Task) => {
        const archived = !task.archived

        await prisma.task.update({
            where: { id: task.id },
            data: {
                archived,
                ...(archived
                    ? { archivedAt: new Date() }
                    : { archivedAt: null })
            }
        })
    }

}
