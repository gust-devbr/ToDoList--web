'use client'

import { cn } from "@/lib/utils";

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

    //NAME
    const variants = {
        check: "accent-indigo-600 w-5 h-5",
        auth: "mt-0.5 mb-0.5 py-3 px-4 border-solid rounded-md",
        search: "w-full mb-5 px-3 py-2 rounded border outline-none",
        default: "border rounded-sm px-2 py-2 w-full placeholder:text-xl"
    };

    const inputStyles = variants[name] || variants.default

    return (
        <input
            name={name}
            type={type}
            placeholder={label}
            value={value}
            checked={checked}
            onChange={(e) => onChangeValue(e.target.value)}
            className={cn(`text-lg border ${inputStyles} ${className}`)}
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