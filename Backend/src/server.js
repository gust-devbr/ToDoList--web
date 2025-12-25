import express from 'express'
import cors from 'cors'

import routesTasks from './routes/tasks.routes.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/tasks', routesTasks)

app.listen(3003, () => {
    console.log('Rodando em http://localhost:3003')
});