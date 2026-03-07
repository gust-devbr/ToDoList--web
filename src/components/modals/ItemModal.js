'use client'

import { useEffect } from 'react'
import { FaCheck, MdCancel } from '@/components/icons'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { modalConfig } from '@/components'

export function ItemModal({
    isOpen,
    mode,
    itemType,
    formData,
    setFormData,
    onClose,
    onSubmit
}) {
    const safeMode = mode === 'edit' ? 'edit' : 'create'
    const config = modalConfig[itemType]

    useEffect(() => {
        if (!isOpen) return

        function handleKeyDown(e) {
            if (e.key === 'Escape') {
                onClose()
            }

            if (e.key === 'Enter') {
                e.preventDefault()
                onSubmit()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, onClose, onSubmit])

    if (!config) return null

    function handleChange(field, value) {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        {config.title[safeMode]}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {config.fields.map((field) => {
                        if (field.type === 'textarea') {
                            return (
                                <Textarea
                                    key={field.name}
                                    autoFocus={field.autoFocus}
                                    placeholder={typeof field.placeholder === 'object' ? field.placeholder[safeMode] : field.placeholder}
                                    value={formData[field.name] ?? ''}
                                    onChange={(e) => handleChange(field.name, e.target.value)}
                                />
                            )
                        }

                        return (
                            <Input
                                key={field.name}
                                autoFocus={field.autoFocus}
                                placeholder={field.placeholder}
                                value={formData[field.name] ?? ''}
                                onChange={(e) => handleChange(field.name, e.target.value)}
                            />
                        )
                    })}
                </div>

                <DialogFooter>
                    <Button onClick={onSubmit}>
                        <FaCheck className="mr-1 h-4 w-4" />
                        {config.submit[safeMode]}
                    </Button>

                    <Button variant="outline" onClick={onClose}>
                        <MdCancel className="mr-1 h-4 w-4" />
                        Cancelar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}