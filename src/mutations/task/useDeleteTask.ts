import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "@/services/client/task-service";

export function useDeleteTask() {
    const queryClient =
        useQueryClient()

    return useMutation({
        mutationFn: (id: string) => deleteTask(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks']
            })
        }

    })
}
