import axios from "axios";

export function getErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.message ?? "Erro inesperado.";
    }

    if (error instanceof Error) {
        return error.message;
    }

    return "Erro inesperado.";
}