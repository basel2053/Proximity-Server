import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import hpp from 'hpp';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import intializeStrategies from '../auth/strategies';
import passport from 'passport';
import swaggerUI from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.1.0',
    info: {
      version: '1.0.0',
      title: 'Robust Chat API',
      description: 'This is a simple API for chat application made with Express and documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Schat',
        url: 'http://localhost:3000.com',
        email: 'test@test.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['../routes.ts'],
};

export default class ApplicationConfig {
  static init(app: express.Application): void {
    const { SESSION_SECRET, MONGO_URI } = process.env;
    const sessionStore = MongoStore.create({ mongoUrl: MONGO_URI, collectionName: 'sessions' });
    const specs = swaggerJsdoc(swaggerOptions);
    app.set('view engine', 'ejs');
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(morgan('dev'));
    app.use(helmet());
    app.use(hpp());
    app.use(express.static('public'));
    app.use('/api-docs', (req, res) => {
      res.send('heya');
    });
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

    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
  }
}
