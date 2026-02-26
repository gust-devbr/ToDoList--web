'use client'

import { cn } from "@/lib/utils";
import { InputStyles } from "@/components";

export function Input({
    name,
    className,
    value,
    onChangeValue,
    type,
    label,
    checked,
    style,
    ...props
}) {
    return (
        <input
            name={name}
            type={type}
            placeholder={label}
            value={value}
            checked={checked}
            onChange={(e) => onChangeValue(e.target.value)}
            className={cn(`text-lg border ${InputStyles(name)} ${className}`)}
            style={style}
            {...props}
        />
    )
};

export function TextArea({
    className,
    value,
    onChangeValue,
    label,
    ...props
}) {
    return (
        <textarea
            placeholder={label}
            value={value}
            onChange={(e) => onChangeValue(e.target.value)}
            className={cn(`border rounded-sm text-lg px-2 py-2 mt-2 w-60 placeholder:text-xl ${className}`)}
            {...props}
        />
    )
};