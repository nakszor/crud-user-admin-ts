import 'express-async-errors'
import express from 'express'
import router from './routes'
import handdleError from './errors/handleError'

const app = express()

app.use(express.json())
app.use('/',router)
app.use(handdleError)

export default app
