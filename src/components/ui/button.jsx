import { cn } from "@/lib/utils";

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
    const variants = {
        create: "text-xl w-full border-none rounded-[5px] py-2 px-8 bg-green-700 text-white hover:bg-green-600 mb-5",
        warning: "mb-1 w-full px-5 py-2 border-none rounded-sm cursor-pointer text-[1rem] text-white bg-red-600",
        change: "mt-2 border text-black font-semibold text-md bg-white px-2 py-1 rounded-md",
        default: "bg-transparent border-none cursor-pointer text-2xl"
    };

    const stylesButton = variants[name] || variants.default;

    return (
        <button
            style={style}
            title={title}
            onClick={onClick}
            name={name}
            type={type}
            className={cn(stylesButton, className)}
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
            {Icon && <Icon className="ml-23 -mb-6 mt-2 size-6" size={20} />}
            {children}
        </button>
    )
};