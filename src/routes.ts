import { Router } from 'express';
// import path from 'path';

import { NotFoundError } from './errors/notFound-error';
import oauth2Router from './auth/auth-route';
import Company from './companies/company-model';

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

router.get('/companies', async (req, res) => {
  const { long, lat } = req.query;
  // NOTE  HERE  getting companies within 260KM
  const maxDistanceInKm = 260;
  const companies = await Company.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [long, lat],
        },
        $maxDistance: maxDistanceInKm * 1000,
      },
    },
  });
  console.log(companies);

  res.send(companies);
});

router.all('*', (_req, _res) => {
  throw new NotFoundError('Route not found');
});

export default router;
