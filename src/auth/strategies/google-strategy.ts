import passport from 'passport';
import dotenv from 'dotenv';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import verifyFunction from './verify-function';

dotenv.config();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CB } = process.env;

const googleStrategy = passport.use(
  new GoogleStrategy(
    {
      clientID: String(GOOGLE_CLIENT_ID),
      clientSecret: String(GOOGLE_CLIENT_SECRET),
      callbackURL: String(GOOGLE_CB),
    },
    verifyFunction,
  ),
);

export default googleStrategy;
