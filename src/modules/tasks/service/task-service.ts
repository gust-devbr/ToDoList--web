import { TaskRepository } from "../repository/tasks.repository";

import type { CreateTaskSchema } from "../schemas/create-task.schema";
import type { UpdateTaskSchema } from "../schemas/update-task.schema";

export class TaskService {

    constructor(
        private repository = new TaskRepository()
    ) { }

    getAll = async (status: string, userId: string) => {
        return await this.repository.getAll(status, userId)
    }

    create = async (userId: string, body: CreateTaskSchema) => {
        return await this.repository.create(userId, body)
    }

    update = async (body: UpdateTaskSchema) => {
        const { id, ...rest } = body

        const task = await this.repository.findById(id)

        if (!task)
            throw new Error("Tarefa não encontrada")

        return await this.repository.update({
            id: task.id,
            ...rest
        })
    }

    delete = async (id: string) => {
        const task = await this.repository.findById(id)

        if (!task)
            throw new Error("Tarefa não encontrada")

        await this.repository.deleteById(task.id)
    }

    complete = async (id: string) => {
        const task = await this.repository.findById(id)

        if (!task)
            throw new Error("Tarefa não encontrada")

        await this.repository.complete(task)
    }

    archive = async (id: string) => {
        const task = await this.repository.findById(id)

        if (!task)
            throw new Error("Tarefa não encontrada")

        await this.repository.archive(task)
    }

}
