import { Router } from 'express'
import {
    listTasks,
    createTasks,
    toggleTasks,
    deleteTasks,
    renameTasks
} from '../controllers/tasks.controllers.js';

const router = Router();

router.get('/', listTasks)
router.post('/', createTasks)
router.patch('/:id', toggleTasks)
router.delete('/:id', deleteTasks)
router.put('/:id', renameTasks)

export default router;