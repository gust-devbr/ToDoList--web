import { CategoriesRepository } from "../repository/categories.repository";

import type { CreateCategorySchema } from "../schemas/create-category.schema";
import type { UpdateCategorySchema } from "../schemas/update-category.schema";

export class CategoriesService {

    constructor(
        private repository = new CategoriesRepository()
    ) { }

    findAll = async (userId: string) => {
        return this.repository.findAll(userId)
    }

    create = async (userId: string, body: CreateCategorySchema) => {
        const exists =
            await this.repository.existsByNameAndColor(body.name, body.color)

        if (exists)
            throw new Error("Categoria já existente")

        return await this.repository.create(userId, body)
    }

    update = async (id: string, body: UpdateCategorySchema) => {
        const category =
            await this.repository.findById(id)

        if (!category)
            throw new Error("Categoria não encontrada")

        return await this.repository.update({
            id: category.id,
            ...body
        })
    }

    delete = async (id: string) => {
        const category =
            await this.repository.findById(id)

        if (!category)
            throw new Error("Categoria não encontrada")

        await this.repository.deleteById(category.id)
    }
}
