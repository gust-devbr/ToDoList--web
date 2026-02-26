'use client'

import { useEffect } from 'react';
import { useTheme } from '@/context';
import { FaCheck, MdCancel } from '@/components/icons';
import { TextArea, Button } from '@/components';

export function TaskModal({
    isOpen,
    onClose,
    onSubmit,
    value,
    setValue,
    mode
}) {
    const { theme } = useTheme();
    const isCreate = mode === "create";

    useEffect(() => {
        function handleKeyDown(e) {
            switch (e.key) {
                case "Escape":
                    onClose();
                    break;
                case "Enter":
                    e.preventDefault();
                    onSubmit();
                    break
            }
        };

        if (isOpen) window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);

    }, [isOpen, onClose, onSubmit]);

    if (!isOpen) return null;

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