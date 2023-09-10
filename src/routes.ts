import { Router } from 'express';

import { NotFoundError } from './errors/notFound-error';
import oauth2Router from './oauth2/oauth2-route';

const router = Router();

router.use(oauth2Router);

router.get('/', (req, res) => {
  res.send(`<h2>Hello There.</h2>
  <p>To see all available endpoints: </p>
  <a href="/api-docs">Here</a>`);
});

router.all('*', (_req, _res) => {
  throw new NotFoundError('Route not found');
});

export default router;
