import 'dotenv/config'
import express from 'express';
import errorHandler from './middlewares/errorMiddleware';
import notFound from './middlewares/pageNotFound';
import noteRoutes from './routes/notes'
import morgan from 'morgan'


const app = express()
app.use(morgan('dev'))

app.use(express.json())

app.use('/api/notes', noteRoutes)

app.use(notFound)

app.use(errorHandler)

export default app