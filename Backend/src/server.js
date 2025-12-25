import express from 'express'
import cors from 'cors'
import tasksRoutes from './routes/tasks.routes.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/tasks', tasksRoutes)

app.listen(3333, () => {
    console.log('Rodando em http://localhost:3333')
})