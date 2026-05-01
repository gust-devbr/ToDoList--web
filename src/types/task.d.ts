export type Category = {
    id: string
    name: string
    color: string
}

export type Task = {
    id: string
    title: string
    completed: boolean
    archived?: boolean
    archivedAt?: Date | null
    status: "pending" | "completed" | "archive"
    category: Category
}
