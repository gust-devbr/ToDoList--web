import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "@/services/query/task-service";

type Props = {
    title: string,
    categoryId: string
}

export function useCreateTask() {
    const queryClient =
        useQueryClient();

    return useMutation({
        mutationFn: ({ title, categoryId }: Props) => createTask(title, categoryId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks']
            })
        }
    })
}
