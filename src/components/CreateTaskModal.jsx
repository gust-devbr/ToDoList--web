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
                className='p-5 rounded-xl w-80 min-h-20 shadow-white shadow-sm'
                style={{ backgroundColor: theme.background }}
            >
                <h2 className='text-center mb-5 text-xl'>Criar Tarefa</h2>

                <input
                    autoFocus
                    className='border rounded-sm px-2'
                    placeholder='Nova Tarefa:'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />

                <div className='flex justify-end -mt-6 gap-2'>
                    <button
                        className='border-none bg-transparent text-xl cursor-pointer'
                        style={{ color: theme.text }}
                        title='Criar'
                        onClick={onCreate}
                    >
                        <FaCheck />
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