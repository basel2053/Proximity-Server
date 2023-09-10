import passport from 'passport';
import dotenv from 'dotenv';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import User from '../users/users-model';

dotenv.config();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CB } = process.env;

const googleStrategy = passport.use(
  new GoogleStrategy(
    {
      clientID: String(GOOGLE_CLIENT_ID),
      clientSecret: String(GOOGLE_CLIENT_SECRET),
      callbackURL: String(GOOGLE_CB),
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      console.log('------------------------');
      console.log(accessToken);
      console.log('------------------------');
      console.log(refreshToken);
      const { email, given_name } = profile._json;
      User.findOrCreate({ email }, { email: String(email), name: String(given_name), password: '000000' })
        .then((user) => {
          return cb(null, user);
        })
        .catch((err) => {
          console.log(err);

          return cb(err);
        });
    },
  ),
);

export default googleStrategy;
