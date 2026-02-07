import { FaCheck } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function CreateTaskModal({ isOpen, onClose, onCreate, value, setValue }) {
    const { theme } = useTheme();

    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === 'Escape') {
                onClose()
            };

            if (e.key === 'Enter') {
                e.preventDefault()
                onCreate()
                onClose()
            };
        }
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        };

    }, [isOpen, onClose, onCreate]);

    if (!isOpen) return null;

    return (

        <div className='flex justify-center items-center fixed top-0 left-0 w-full h-full bg-black/30'>
            <div
                className='p-5 rounded-xl w-90 min-h-33 shadow-white shadow-sm'
                style={{ backgroundColor: theme.background }}
            >
                <h2 className='text-center mb-5 text-2xl font-bold'>
                    Criar Tarefa
                </h2>

                <textarea
                    autoFocus
                    className='border rounded-sm pb-15 px-2 py-1 w-60 placeholder:text-xl'
                    placeholder='Nova Tarefa:'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />

                <div className='flex justify-end -mt-8 gap-4'>
                    <button
                        className='border-none bg-transparent text-2xl cursor-pointer'
                        style={{ color: theme.text }}
                        title='Criar'
                        onClick={onCreate}
                    >
                        <FaCheck />
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