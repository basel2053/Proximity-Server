import { Router } from 'express';
import passport from 'passport';

const router = Router();

// HERE  google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  function (req, res) {
    console.log('im getting here google');

    // Successful authentication, redirect home.
    res.redirect('/');
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

    // Successful authentication, redirect home.
    res.redirect('/');
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

    // Successful authentication, redirect home.
    res.redirect('/');
  },
);

export default router;
