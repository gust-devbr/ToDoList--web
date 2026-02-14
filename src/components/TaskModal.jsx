import { FaCheck } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import { useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { TextArea } from './ui/input';
import { Button } from './ui/button';

export function TaskModal({
    isOpen,
    onClose,
    onSubmit,
    value,
    setValue,
    mode
}) {
    const { theme } = useTheme();

    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === 'Escape') {
                onClose();
            }

            if (e.key === 'Enter') {
                e.preventDefault();
                onSubmit();
                onClose();
            }
        }

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };

    }, [isOpen, onClose, onSubmit]);

    if (!isOpen) return null;

    const isCreate = mode === "create";

    return (
        <div className='flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black/30'>
            <div
                className='p-5 rounded-xl w-90 min-h-33 shadow-white shadow-sm'
                style={{ backgroundColor: theme.background }}
            >
                <h2 className='text-center mb-5 text-2xl font-bold'>
                    {isCreate ? "Criar Tarefa" : "Editar Tarefa"}
                </h2>

                <TextArea
                    autoFocus
                    label={isCreate ? "Nova Tarefa:" : "Editar Tarefa:"}
                    value={value}
                    onChangeValue={setValue}
                />

                <div className='flex justify-end -mt-8 gap-4'>
                    <Button
                        style={{ color: theme.text }}
                        title={isCreate ? "Criar" : "Salvar"}
                        onClick={onSubmit}
                        icon={FaCheck}
                    />

                    <Button
                        style={{ color: theme.text }}
                        title='Cancelar'
                        onClick={onClose}
                        icon={MdCancel}
                    />
                </div>
            </div>
        </div>
    )
};