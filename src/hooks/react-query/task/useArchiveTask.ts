import { useMutation, useQueryClient } from "@tanstack/react-query";
import { archiveTask } from "@/services/query/task-service";

export function useArchiveTask() {
    const queryClient =
        useQueryClient()

    return useMutation({
        mutationFn: (id: string) => archiveTask(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks']
            })
        }
    })
}