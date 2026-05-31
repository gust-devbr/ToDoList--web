import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editTask } from "@/services/client/task-service"

export function useUpdateTask() {
    const queryClient =
        useQueryClient()

    type EditTaskVariables = {
        id: string
        title: string
        categoryId: string
    }

    return useMutation({
        mutationFn: ({ id, title, categoryId }: EditTaskVariables) =>
            editTask(id, title, categoryId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks']
            })
        }
    })
}
