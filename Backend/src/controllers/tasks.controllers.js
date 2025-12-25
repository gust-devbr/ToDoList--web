import { db } from '../db.js'

//Pegar Tarefas
export const getTasks = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM table_tasks");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar tarefas" })
    }
};

//Criar Tarefa
export const createTasks = async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ erro: 'Título é obrigatório' })
    }

    try {
        await db.query(
            "INSERT INTO table_tasks (title, completed) VALUES (?, false)",
            [title]
        );
        res.status(200).json({ message: 'Tarefa criada com sucesso' })

    } catch (error) {
        res.status(500).json({ error: "Erro ao criar tarefa" })
    }
};

//Atualizar Tarefa --> ( marcar como concluída )
export const toggleTasks = async (req, res) => {
    const { id } = req.params;

    try {
        await db.query(
            "UPDATE table_tasks SET completed = NOT completed WHERE id = ?",
            [id]
        )
        res.status(200).json({ message: 'Tarefa marcada como concluída' })

    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar tarefa" })
    }
};

//Deletar Tarefa
export const deleteTasks = async (req, res) => {
    const { id } = req.params;

    try {
        await db.query(
            "DELETE FROM table_tasks WHERE id = ?",
            [id]
        )
        res.status(200).json({ message: 'Tarefa deletada com sucesso' })

    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar tarefa" })
    }
};

//Renomear Tarefa
export const renameTasks = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: "Título é obrigatório" })
    }

    try {
        await db.query(
            "UPDATE table_tasks SET title = ? WHERE id = ?",
            [title, id]
        )
        res.status(200).json({ message: 'Tarefa renomeada com sucesso' })

    } catch (error) {
        res.status(500).json({ error: "Erro ao renomear tarefa" })
    }
};