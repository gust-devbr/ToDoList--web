import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleTask } from "@/services/client/task-service";

export function useToggleTask() {
    const queryClient =
        useQueryClient()

    return useMutation({
        mutationFn: (id: string) => toggleTask(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks']
            })
        }
    })
}
