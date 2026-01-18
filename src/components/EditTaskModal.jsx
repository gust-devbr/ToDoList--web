import { FaSave } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import { useEffect } from 'react';

export default function EditTaskModal({ isOpen, onClose, onRename, value, setValue }) {

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
        <div className='modal-overlay'>
            <div className='modal'>
                <h2>Editar Tarefa</h2>

                <input
                    autoFocus
                    placeholder='Editar Tarefa:'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />

                <div className='modal-actions'>
                    <button title='Salvar' onClick={onRename}> <FaSave /> </button>
                    <button title='Cancelar' onClick={onClose}> <MdCancel /> </button>
                </div>
            </div>
        </div>
    )
};