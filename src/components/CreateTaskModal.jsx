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

        <div style={{...styles.modalOverlay}}>
            <div style={{...styles.modal, backgroundColor: theme.background}}>
                <h2>Criar Tarefa</h2>

                <input
                    autoFocus
                    placeholder='Nova Tarefa:'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />

                <div style={{...styles.modalActions, backgroundColor: theme.card}}>
                    <button style={{...styles.button}} title='Criar' onClick={onCreate}> <FaCheck /> </button>
                    <button style={{...styles.button}} title='Cancelar' onClick={onClose}> <MdCancel /> </button>
                </div>

            </div>
        </div>
    )
};

const styles = {
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        heigth: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        padding: '20px',
        borderRadius: '8px',
        width: '250px',
        heigth: '100px',
    },
    modalActions: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '-22px',
        gap: '5px',
    },
    button: {
        border: 'none',
        background: 'transparent',
        fontSize: '16px',
        cursor: 'pointer',
    },
};