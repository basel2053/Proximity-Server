import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';

import ApplicationConfig from './config/app-conf';
import connectDB from './config/db-conf';
import errorHandler from './middlewares/error-handler';
import routes from './routes';

dotenv.config();

export const app = express();

connectDB();

ApplicationConfig.init(app);

app.use(routes);
app.use(errorHandler);
