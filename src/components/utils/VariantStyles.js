//Button
const ButtonVariants = {
    create: "text-xl w-full border-none rounded-[5px] py-2 px-8 bg-green-700 text-white hover:bg-green-600 mb-5",
    warning: "mb-1 w-full px-5 py-2 border-none rounded-sm cursor-pointer text-[1rem] text-white bg-red-600",
    change: "mt-2 border text-black font-semibold text-md bg-white px-2 py-1 rounded-md",
    default: "bg-transparent border-none cursor-pointer text-2xl"
};
export const ButtonStyles = (name) => ButtonVariants[name] || ButtonVariants.default;

//Input
const InputVariants = {
    check: "accent-indigo-600 w-5 h-5",
    auth: "mt-0.5 mb-0.5 py-3 px-4 border-solid rounded-md",
    search: "w-full mb-5 px-3 py-2 rounded border outline-none",
    default: "border rounded-sm px-2 py-2 w-full placeholder:text-xl"
};
export const InputStyles = (name) => InputVariants[name] || InputVariants.default;