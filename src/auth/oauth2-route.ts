import { Router } from 'express';
import { V3 as paseto } from 'paseto';
import passport from 'passport';

const router = Router();

router.get('/auth/:provider', (req, res, next) => {
  console.log(`my custom provider link ${req.params.provider}`);

  passport.authenticate(req.params.provider, {
    session: true,
  })(req, res, next);
});

// HERE  github

router.get(
  '/auth/:provider/callback',
  (req, res, next) => {
    passport.authenticate(req.params.provider, { failureRedirect: '/', session: true })(req, res, next);
  },
  (req, res) => {
    res.status(302).redirect('/');
  },
);

router.get('/test', async (req, res) => {
  const key = await paseto.generateKey('public');
  const secret = paseto.keyObjectToBytes(key).toString('hex');
  const token = await paseto.sign({ name: 'bassel' }, Buffer.from(secret, 'hex'));
  console.log(token);
  console.log('------------------');

  console.log(req.user);
  console.log(req.session);

  res.send('helo');
});
export default router;
