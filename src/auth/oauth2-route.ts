import { Router } from 'express';
import passport from 'passport';

const router = Router();

// HERE  google
router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  }),
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  function (req, res) {
    console.log('im getting here google');
    // console.log(req.user);
    res.send({ accessToken: req.authInfo });
  },
);

// HERE  facebook

router.get(
  '/auth/facebook',

  passport.authenticate('facebook', {
    scope: ['email', 'public_profile'],
    session: false,
  }),
);
router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login', session: false }),
  function (req, res) {
    console.log('im getting here fb');
    res.send({ accessToken: req.authInfo });
  },
);

// HERE  github

router.get(
  '/auth/github',
  passport.authenticate('github', {
    scope: ['user:email'],
    session: false,
  }),
);
router.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login', session: false }),
  function (req, res) {
    console.log('im getting here github');
    res.send({ accessToken: req.authInfo });
  },
);

export default router;
