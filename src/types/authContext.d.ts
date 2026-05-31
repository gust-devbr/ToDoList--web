import { User } from "./user";

type AuthResponse = {
    success: boolean,
    message: string
    data: unknown
}

export type AuthContextType = {
    user: User | null
    loading: boolean
    loadUser: () => Promise<void>
    login: (email: string, password: string) => Promise<AuthResponse>
    register: (name: string, email: string, password: string) => Promise<AuthResponse>
    logout: () => Promise<void>
}