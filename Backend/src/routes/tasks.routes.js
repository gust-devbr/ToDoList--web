import { Router } from 'express'
import {
    getTasks,
    createTasks,
    toggleTasks,
    deleteTasks,
    renameTasks
} from '../controllers/tasks.controllers.js'

const router = Router()

router.get('/', getTasks)
router.post('/', createTasks)
router.patch('/:id', toggleTasks)
router.delete('/:id', deleteTasks)
router.put('/:id', renameTasks)

export default router;