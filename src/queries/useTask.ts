import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/services/client/task-service";
import { StatusType } from "@/types/task";

export function useTasks(status: StatusType) {
    return useQuery({
        queryKey: ['tasks', status],
        queryFn: async () => {
            return await getTasks(status)
        }
    })
}
