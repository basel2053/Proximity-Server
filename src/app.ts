import express from 'express'
import 'express-async-errors'
import dotenv from 'dotenv'

import ApplicationConfig from './config/app-conf'
import connectDB from './config/db-conf'
import errorHandler from './middlewares/errorHandler'

dotenv.config()
// import routes from './routes';

export const app = express()

connectDB()

ApplicationConfig.init(app)

// app.use(routes);
app.use(errorHandler)
