import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import User from '../users/users-model';

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

passport.use(
  new GoogleStrategy(
    {
      clientID: String(GOOGLE_CLIENT_ID),
      clientSecret: String(GOOGLE_CLIENT_SECRET),
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      console.log('------------------------');
      console.log(accessToken);
      console.log('------------------------');
      console.log(refreshToken);

      User.findOrCreate({ googleId: profile.id }, { email: 'test@test.com', name: 'test', password: '000000' })
        .then((user) => {
          return cb(null, user);
        })
        .catch((err) => {
          return cb(err);
        });
    },
  ),
);
