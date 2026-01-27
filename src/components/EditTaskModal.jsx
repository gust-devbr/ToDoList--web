import { FaSave } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

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
                className='p-5 rounded-xl w-80 min-h-20 shadow-white shadow-sm'
                style={{ background: theme.background }}
            >
                <h2 className='text-center mb-5 text-xl'>Editar Tarefa</h2>

                <input
                    autoFocus
                    className='border rounded-sm px-2'
                    placeholder='Editar Tarefa:'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />

                <div className='flex justify-end -mt-6 gap-2'>
                    <button
                        className='border-none bg-transparent text-xl cursor-pointer'
                        style={{ color: theme.text }}
                        title='Salvar'
                        onClick={onRename}
                    >
                        <FaSave />
                    </button>

                    <button
                        className='border-none bg-transparent text-xl cursor-pointer'
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