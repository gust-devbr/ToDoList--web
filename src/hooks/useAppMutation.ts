import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export function useAppMutation<TData, TVariables>(
    mutationFn: (variables: TVariables) => Promise<TData>,
    options?: Omit<
        UseMutationOptions<TData, Error, TVariables>,
        "mutationFn"
    >
) {
    return useMutation({
        mutationFn,
        ...options,
    })
}