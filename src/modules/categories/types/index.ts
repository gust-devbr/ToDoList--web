export interface CategoriesResponse {
    id: string
    name: string;
    color: string
    userId: string
    createdAt: Date
    _count: {
        tasks: number
    }
}