import { Category } from "./task"


export type TaskProps = {
    task: {
        id: string
        title: string
        category: Category
    }
}

export type UpdateTaskProps = {
    id: string
    title: string
}