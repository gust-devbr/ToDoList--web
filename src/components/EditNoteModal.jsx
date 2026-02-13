import { FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { Input, TextArea } from "./ui/input";

export default function EditNoteModal({
    isOpen,
    onClose,
    onEdit,
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

                onEdit()
                onClose()
            }
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);

    }, [isOpen, onClose, onEdit]);

    if (!isOpen) return null;

    return (
        <div className="flex justify-center items-center fixed top-0 -mt-5 left-0 w-full h-full bg-black/30">
            <div 
            style={{ backgroundColor: theme.background }} 
            className="p-5 rounded-xl w-90 min-h-20 shadow-white shadow-sm"
            >

                <h2 className="text-center mb-5 text-2xl font-bold">Editar Nota</h2>

                <Input
                    autoFocus
                    label="Título:"
                    value={titleValue}
                    onChange={setTitleValue}
                />

                <TextArea
                    label="Conteúdo:"
                    value={contentValue}
                    onChangeValue={setContentValue}
                />

                <div className="flex justify-end -mt-8 gap-3">
                    <button
                        className="border-none bg-transparent text-2xl cursor-pointer"
                        onClick={onEdit}
                    >
                        <FaSave />
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