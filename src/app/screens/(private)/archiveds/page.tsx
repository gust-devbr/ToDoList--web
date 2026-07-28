import { ArchivedsTaskList } from "@/modules/tasks/components/ArchivedsTaskList";

export default function ArchivedsTasksPage() {
    return (
        <div className="px-5">
            <header className="my-8">
                <h1 className="text-2xl font-semibold">
                    Tarefas Arquivadas
                </h1>
                <p className="text-zinc-500">Estas são tarefas não aparecerão na lista principal</p>
            </header>

            <div>
                <ArchivedsTaskList />
            </div>
        </div>
    )
}