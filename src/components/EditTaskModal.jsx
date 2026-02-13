import { FaSave } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { TextArea } from './ui/input';

export default function EditTaskModal({ isOpen, onClose, onRename, value, setValue }) {
    const { theme } = useTheme();

    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === 'Escape') {
                onClose()
            };

            if (e.key === 'Enter') {
                e.preventDefault()
                onRename()
            };
        }
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        };

    }, [isOpen, onClose, onRename]);

    if (!isOpen) return null;

    return (
        <div className='flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black/30'>
            <div
                className='p-5 rounded-xl w-90 min-h-20 shadow-white shadow-sm'
                style={{ background: theme.background }}
            >
                <h2 className='text-center mb-5 text-2xl font-bold'>
                    Editar Tarefa
                </h2>

                <TextArea
                    autoFocus
                    label='Editar Tarefa:'
                    value={value}
                    onChangeValue={setValue}
                />

                <div className='flex justify-end -mt-8 gap-3'>
                    <button
                        className='border-none bg-transparent text-2xl cursor-pointer'
                        style={{ color: theme.text }}
                        title='Salvar'
                        onClick={onRename}
                    >
                        <FaSave />
                    </button>

                    <button
                        className='border-none bg-transparent text-2xl cursor-pointer'
                        style={{ color: theme.text }}
                        title='Cancelar'
                        onClick={onClose}
                    >
                        <MdCancel />
                    </button>
                </div>
            </div>
        </div>
    )
};