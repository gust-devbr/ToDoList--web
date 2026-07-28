import { useQuery } from "@tanstack/react-query";
import { useAppMutation } from "@/hooks/useAppMutation";

import * as api from "../api/index"
import { StatusType } from "@/modules/tasks/types";

import { QUERY_KEYS } from "@/lib/query-keys";
import { queryClient } from "@/lib/query-client";

const onSuccess = () =>
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.tasks] })

export function useTasks(status: StatusType) {
    return useQuery({
        queryKey: [QUERY_KEYS.tasks, status],
        queryFn: () => api.getTasks(status)
    })
}

export function useCreateTask() {
    return useAppMutation(api.createTask, { onSuccess })
}

export function useUpdateTask() {
    return useAppMutation(api.udpdateTask, { onSuccess })
}

export function useDeleteTask() {
    return useAppMutation(api.deleteTask, { onSuccess })
}

export function useCompleteTask() {
    return useAppMutation(api.completeTask, { onSuccess })
}

export function useArchiveTask() {
    return useAppMutation(api.archiveTask, { onSuccess })
}
