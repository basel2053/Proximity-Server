import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import hpp from 'hpp';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import intializeStrategies from '../auth/strategies';
import passport from 'passport';
// import swaggerUI from 'swagger-ui-express'

// import swaggerDocument from '../../swagger.json';

export default class ApplicationConfig {
  static init(app: express.Application): void {
    const { SESSION_SECRET, MONGO_URI } = process.env;
    const sessionStore = MongoStore.create({ mongoUrl: MONGO_URI, collectionName: 'sessions' });
    app.set('view engine', 'ejs');
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(morgan('dev'));
    app.use(helmet());
    app.use(hpp());
    app.use(express.static('public'));
    app.use(
      session({
        secret: String(SESSION_SECRET),
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
      }),
    );
    app.use(passport.initialize());
    app.use(passport.session());
    intializeStrategies();
    // app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
  }
}
