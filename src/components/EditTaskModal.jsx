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
        <div style={{ ...styles.modalOverlay }}>
            <div style={{ ...styles.modal, background: theme.background }}>
                <h2>Editar Tarefa</h2>

                <input
                    autoFocus
                    placeholder='Editar Tarefa:'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />

                <div style={{ ...styles.modalActions }}>
                    <button style={{ ...styles.button, color: theme.text }} title='Salvar' onClick={onRename}> <FaSave /> </button>
                    <button style={{ ...styles.button, color: theme.text }} title='Cancelar' onClick={onClose}> <MdCancel /> </button>
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
        height: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        padding: '20px',
        borderRadius: '8px',
        width: '250px',
        height: '100px',
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