import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { ChevronRight, Trash2 } from "lucide-react"
import { DeleteFormModal } from "./DeleteForm"

export function DeleteAccountModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex flex-row justify-between items-center active:opacity-80">
                    <p className="flex flex-row gap-2 items-center text-red-600">
                        <Trash2 />
                        Deletar Conta
                    </p>
                    <ChevronRight />
                </div>
            </DialogTrigger>

            <DialogContent>
                <DialogTitle className="text-red-500">Deseja realmente deletar sua conta?</DialogTitle>
                <DialogDescription>Essa ação não poderá ser desfeita</DialogDescription>

                <DialogFooter>
                    <DialogClose>Cancelar</DialogClose>
                    <DeleteFormModal />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
