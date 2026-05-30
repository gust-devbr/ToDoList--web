import { create } from "zustand"

import { StatusType } from "@/types/task"

type FilterStore = {
    filter: StatusType
    setFilter: (value: StatusType) => void
}

export const useFilterStore = create<FilterStore>((set) => ({
    filter: "all",
    setFilter: (value) => set({ filter: value })
}))
