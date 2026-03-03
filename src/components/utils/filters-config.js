import { Check, X } from "lucide-react";

export const filterConfig = {
    tasks: {
        secondary: { value: "pending", label: "Pendentes", Icon: X },
        tertiary: { value: "completed", label: "Concluídas", Icon: Check },
    },
    notes: {
        secondary: { value: "unpinned", label: "Não fixadas", Icon: X },
        tertiary: { value: "pinned", label: "Fixadas", Icon: Check },
    },
    contacts: {
        secondary: { value: "unfavorite", label: "Não favoritos", Icon: X },
        tertiary: { value: "favorite", label: "Favoritos", Icon: Check },
    },
};