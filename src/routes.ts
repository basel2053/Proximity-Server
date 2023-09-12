import { Router } from 'express';
// import path from 'path';

import { NotFoundError } from './errors/notFound-error';
import oauth2Router from './auth/auth-route';

const router = Router();

// NOTE  place created routers here at the top
router.use(oauth2Router);

router.get('/', (req, res) => {
  res.render('index', {
    isLoggedIn: req.isAuthenticated(),
  });
});

// HERE Temporary login/signup pages

router.get('/login', (_req, res) => {
  res.render('login');
});

router.get('/signup', (_req, res) => {
  res.render('signup');
});

router.all('*', (_req, _res) => {
  throw new NotFoundError('Route not found');
});

export default router;
