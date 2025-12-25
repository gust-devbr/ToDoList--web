import { db } from '../db.js'

export const listTasks = async (req, res) => {
    const [rows] = await db.query("SELECT * FROM tasks");
    res.json(rows);
};

export const createTasks = async (req, res) => {
    const { title } = req.body;
    await db.query(
        "INSERT INTO tasks (title, completed) VALUES (?, false)",
        [title]
    );

    res.sendStatus(201);
};

export const toggleTasks = async (req, res) => {
    const { id } = req.params;
    await db.query(
        "UPDATE tasks SET completed = NOT completed WHERE id = ?",
        [id]
    );

    res.sendStatus(204);
};

export const deleteTasks = async (req, res) => {
    const { id } = req.params;
    await db.query(
        "DELETE FROM tasks WHERE id = ?",
        [id]
    );

    res.sendStatus(204);
};

export const renameTasks = async(req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    await db.query(
        "UPDATE tasks SET title = ? WHERE id = ?",
        [title, id]
    );
    
    res.sendStatus(204);
};