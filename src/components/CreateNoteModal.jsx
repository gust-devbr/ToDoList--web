import { FaCheck } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { Input, TextArea } from "./ui/input";
import { Button } from "./ui/button";

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

                <Input
                    autoFocus
                    name="createInput"
                    label="Título:"
                    value={titleValue}
                    onChangeValue={setTitleValue}
                />

                <TextArea
                    label="Conteúdo:"
                    value={contentValue}
                    onChangeValue={setContentValue}
                />

                <div className="flex justify-end items-center -mt-8 gap-3">
                    <Button
                        style={{ color: theme.text }}
                        title="Criar"
                        onClick={onCreate}
                        icon={FaCheck}
                    />

                    <Button
                        style={{ color: theme.text }}
                        title="Cancelar"
                        onClick={onClose}
                        icon={MdCancel}
                    />
                </div>
            </div>
        </div>
    )
};