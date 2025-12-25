import { FaCheck } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'
import { useEffect } from 'react'

function CreateTaskModal({ isOpen, onClose, onCreate, value, setValue }) {

    useEffect(() => {

        function handleKeyDown(e) {
            if (e.key === 'Escape') {
                onClose()
            }

            if (e.key === 'Enter') {
                e.preventDefault()
                onCreate()
            }
        }
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }

    }, [isOpen, onClose, onCreate])

    if(!isOpen) return null;

    return (

        <div className='modal-overlay'>
            <div className='modal'>
                <h2>Criar Tarefa</h2>

                <input
                    autoFocus
                    placeholder='Nova Tarefa:'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />

                <div className='modal-actions'>
                    <button title='Criar' onClick={onCreate}> <FaCheck /> </button>
                    <button title='Cancelar' onClick={onClose}> <MdCancel /> </button>
                </div>

            </div>
        </div>
    )
}

export default CreateTaskModal