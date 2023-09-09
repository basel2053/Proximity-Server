import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  },
);

export default router;
