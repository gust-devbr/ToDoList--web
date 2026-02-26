'use client'

import { cn } from "@/lib/utils";
import { ButtonStyles } from "@/components";

export function Button({
    name,
    className,
    type,
    children,
    icon: Icon,
    style,
    onClick,
    title,
    label,
    ...props
}) {
    return (
        <button
            style={style}
            title={title}
            onClick={onClick}
            name={name}
            type={type}
            className={cn(ButtonStyles(name), className)}
            {...props}
        >
            {Icon && <Icon />}
            {children && children}
            {label && label}
        </button>
    )
};

export function AuthButton({
    children,
    className,
    icon: Icon,
    condition,
    isDisabled,
}) {
    return (
        <button
            disabled={isDisabled}
            className={cn(`
                text-white py-2 px-3 text-xl rounded-xl hover:shadow-md hover:shadow-gray-600
                ${className}
                ${condition
                    ? "bg-gray-400 cursor-not-allowed pointer-events-none"
                    : "bg-green-700 hover:bg-green-600 hover:shadow-md hover:shadow-gray-600"}
                `)}
        >
            {Icon && <Icon className="ml-21 -mb-6 mt-2 size-6" size={20} />}
            {children}
        </button>
    )
};