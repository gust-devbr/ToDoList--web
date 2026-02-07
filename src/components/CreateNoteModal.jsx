import { FaCheck } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

export default function CreateNoteModal({
    isOpen,
    onClose,
    onCreate,
    titleValue,
    setTitleValue,
    contentValue,
    setContentValue
}) {
    const { theme } = useTheme();

    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === 'Escape') {
                onClose()
            }
            if (e.key === 'Enter') {
                e.preventDefault()

                onCreate()
                onClose()
            }
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);

    }, [isOpen, onClose, onCreate]);

    if (!isOpen) return null;

    return (
        <div className="flex justify-center items-center fixed top-0 -mt-6 left-0 w-full h-full bg-black/30">
            <div 
            style={{ backgroundColor: theme.background }} 
            className="p-5 rounded-xl w-90 min-h-20 shadow-white shadow-sm"
            >

                <h2 className="text-center mb-5 text-2xl font-bold">Criar Nota</h2>

                <input
                    autoFocus
                    className="border rounded-sm px-2 py-2 w-full placeholder:text-xl"
                    placeholder="Título:"
                    value={titleValue}
                    onChange={(e) => setTitleValue(e.target.value)}
                />

                <textarea
                    className="border rounded-sm pb-8 mt-2 pt-1 px-1 w-62 placeholder:text-xl"
                    placeholder="Conteúdo:"
                    value={contentValue}
                    onChange={(e) => setContentValue(e.target.value)}
                />

                <div className="flex justify-end items-center -mt-8 gap-3">
                    <button
                        className="border-none bg-transparent text-2xl cursor-pointer"
                        onClick={onCreate}
                    >
                        <FaCheck />
                    </button>

                    <button
                        className="border-none bg-transparent text-2xl cursor-pointer"
                        onClick={onClose}
                    >
                        <MdCancel />
                    </button>
                </div>
            </div>
        </div>
    )
};