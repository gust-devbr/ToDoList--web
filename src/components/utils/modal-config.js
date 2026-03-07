export const modalConfig = {
    task: {
        title: { create: 'Criar Tarefa', edit: 'Editar Tarefa' },
        submit: { create: 'Criar', edit: 'Salvar' },
        fields: [
            { name: 'title', type: 'textarea', placeholder: { create: 'Nova tarefa...', edit: 'Editar tarefa...' }, autoFocus: true }
        ]
    },
    note: {
        title: { create: 'Criar Nota', edit: 'Editar Nota' },
        submit: { create: 'Criar', edit: 'Salvar' },
        fields: [
            { name: 'title', type: 'input', placeholder: 'Título:', autoFocus: true },
            { name: 'content', type: 'textarea', placeholder: 'Conteúdo:' }
        ]
    },
    contact: {
        title: { create: 'Adicionar Contato', edit: 'Editar Contato' },
        submit: { create: 'Criar', edit: 'Salvar' },
        fields: [
            { name: 'name', type: 'input', placeholder: 'Nome', autoFocus: true },
            { name: 'email', type: 'input', placeholder: 'Email' },
            { name: 'tel', type: 'input', placeholder: 'Telefone' },
            { name: 'category', type: 'input', placeholder: 'Categoria' }
        ]
    }
}