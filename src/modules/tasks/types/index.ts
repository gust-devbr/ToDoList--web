import type { Task, Category } from "@prisma/client";

export interface TaskResponse extends Task {
    category: Category
}

export interface TaskParams {
    page: number
    limit: number
    search?: string
    priority?: string
}

export type StatusType = 'all' | 'pending' | 'completed' | 'archived'