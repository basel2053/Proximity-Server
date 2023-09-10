import passport from 'passport';
import dotenv from 'dotenv';
import { Strategy as GithubStrategy } from 'passport-github2';

import verifyFunction from './verify-function';

dotenv.config();

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_CB } = process.env;

const githubStrategy = passport.use(
  new GithubStrategy(
    {
      clientID: String(GITHUB_CLIENT_ID),
      clientSecret: String(GITHUB_CLIENT_SECRET),
      callbackURL: String(GITHUB_CB),
    },
    verifyFunction,
  ),
);

export default githubStrategy;
