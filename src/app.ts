import 'dotenv/config'
import express from 'express';
import errorHandler from './middlewares/errorMiddleware';
import notFound from './middlewares/pageNotFound';
import noteRoutes from './routes/notes'
import userRoute from "./routes/users"
import morgan from 'morgan'
import cors from 'cors'
import session from 'express-session';
import env from "./utils/validateEnvs"
import MongoStore from 'connect-mongo';
import { RequireAuth } from './middlewares/auth';


const app = express()
app.use(morgan('dev'))

app.use(express.json())
app.use(
    cors({
      origin: ["http://localhost:3000",],
      credentials: true,
    })
  );

  app.use(session({
    secret: env.SESSION_SECRET,
    resave:false,
    saveUninitialized: false,
    cookie: {
        maxAge:60*60*1000
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl:env.MONGO_URI
    })
  }))

app.use('/api/users', userRoute)
app.use('/api/notes', RequireAuth, noteRoutes)

app.use(notFound)

app.use(errorHandler) 

export default app