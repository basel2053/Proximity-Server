import passport from 'passport';
import dotenv from 'dotenv';
import { Strategy as FacebookStrategy, VerifyFunction } from 'passport-facebook';
import verifyFunction from './verify-function';

dotenv.config();

const { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, FACEBOOK_CB } = process.env;

const facebookStrategy = passport.use(
  new FacebookStrategy(
    {
      clientID: String(FACEBOOK_APP_ID),
      clientSecret: String(FACEBOOK_APP_SECRET),
      callbackURL: String(FACEBOOK_CB),
    },
    verifyFunction as VerifyFunction,
  ),
);

export default facebookStrategy;
