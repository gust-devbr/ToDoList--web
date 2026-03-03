import { List } from "lucide-react";
import { Button } from "../ui/button";
import { Field } from "../ui/field";
import { filterConfig } from "../utils/filters-config";

export function TableFilter({ setFilter, selectedPage }) {
    const config = filterConfig[selectedPage];

    return (
        <Field orientation="horizontal" className="gap-4 py-4">
            <Button
                onClick={() => setFilter("all")}
                className="w-22! h-6! bg-foreground"
            >
                <List /> Todas
            </Button>

            <Button
                onClick={() => setFilter(config.secondary.value)}
                className="w-30! h-6! bg-foreground"
            >
                <config.secondary.Icon /> {config.secondary.label}
            </Button>

            <Button
                onClick={() => setFilter(config.tertiary.value)}
                className="w-27! h-6! bg-foreground"
            >
                <config.tertiary.Icon /> {config.tertiary.label}
            </Button>
        </Field>
    )
};