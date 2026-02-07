import { useTheme } from "../context/ThemeContext"
import { AiOutlineClose } from "react-icons/ai";

export function Header({ title, onButtonClick, buttonLabel, searchValue, onSearchChange }) {
    const { theme } = useTheme();

    return (
        <header className="flex flex-col gap-5 mb-2">
            <p className="text-3xl text-center mb-4 font-bold mt-5">
                {title}
            </p>

            <button
                className='text-xl w-full border-none rounded-[5px] py-2 px-8 bg-green-700 text-white hover:bg-green-600 mb-5'
                onClick={onButtonClick}
            >
                {buttonLabel}
            </button>

            <div className="relative inline-block">
                <input
                    type="text"
                    placeholder="Buscar por título ou conteúdo..."
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full mb-5 px-3 py-2 rounded border outline-none"
                    style={{
                        backgroundColor: theme.background,
                        color: theme.text,
                        borderColor: theme.text
                    }}
                />
                <button onClick={() => onSearchChange("")}>
                    <AiOutlineClose
                        color="red"
                        size={25}
                        className="absolute right-0 -translate-y-4 mr-1"
                    />
                </button>
            </div>
        </header>
    )
};