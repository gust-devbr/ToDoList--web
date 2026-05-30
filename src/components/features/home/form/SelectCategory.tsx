"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useCategories } from "@/hooks/react-query/category/useCategories"

type SelectProps = {
    value: string | null
    onChange: (value: string | null) => void
}

export function SelectCategory({ value, onChange }: SelectProps) {
    const {
        data: categories,
        isLoading
    } = useCategories()

    const EMPTY_VALUE = "null"

    return (
        <div>
            <Select
                value={value ?? EMPTY_VALUE}
                onValueChange={(val) =>
                    onChange(val === EMPTY_VALUE ? null : val)
                }
                disabled={isLoading}
            >
                <SelectTrigger>
                    <SelectValue placeholder={isLoading ? "Carrengando..." : "Escolha a cor"} />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value={EMPTY_VALUE}>
                        Sem categoria
                    </SelectItem>

                    {categories?.map((cat) => (
                        <SelectItem
                            value={cat.id}
                            key={cat.id}
                            className="flex items-center gap-2"
                        >
                            <span
                                className="rounded-full w-3 h-3"
                                style={{ backgroundColor: cat.color }}
                            />
                            {cat.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}