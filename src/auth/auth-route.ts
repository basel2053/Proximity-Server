import { Router } from 'express';
import { V3 as paseto } from 'paseto';
import passport from 'passport';

import User from '../users/users-model';
import { BadRequestError } from '../errors/badRequest-error';
import { validateRequest } from '../middlewares/validate-request';
import { signupSchema } from '../users/user-validation';

const router = Router();

// HERE  OAuth2

router.get('/auth/:provider', (req, res, next) => {
  console.log(`my custom provider link ${req.params.provider}`);

  passport.authenticate(req.params.provider, {
    session: true,
  })(req, res, next);
});

router.get(
  '/auth/:provider/callback',
  (req, res, next) => {
    passport.authenticate(req.params.provider, { failureRedirect: '/', session: true })(req, res, next);
  },
  (req, res) => {
    res.status(302).redirect('/');
  },
);

// HERE  Local

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function (req, res) {
  res.redirect('/');
});

router.post('/signup', validateRequest(signupSchema), async (req, res) => {
  const { email, password } = req.body;
  User.isDuplicateEmail(email);
  const user = await User.build({ email, password, name: 'test' });
  await user.save();
  req.login(user, (err) => {
    if (err) {
      throw new BadRequestError("Couldn't authenticate user after signup");
    }
    res.redirect('/');
  });
});

// HERE  paseto

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
