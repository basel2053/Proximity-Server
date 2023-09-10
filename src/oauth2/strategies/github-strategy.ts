import passport from 'passport';
import dotenv from 'dotenv';
import { Strategy as GithubStrategy } from 'passport-github2';
import { VerifyCallback } from 'passport-google-oauth20';
import { Profile } from 'passport-facebook';

import User from '../../users/users-model';

dotenv.config();

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_CB } = process.env;

const githubStrategy = passport.use(
  new GithubStrategy(
    {
      clientID: String(GITHUB_CLIENT_ID),
      clientSecret: String(GITHUB_CLIENT_SECRET),
      callbackURL: String(GITHUB_CB),
    },
    function (accessToken: string, refreshToken: string, profile: Profile, cb: VerifyCallback) {
      console.log(profile);
      console.log('------------------------');
      console.log(accessToken);
      console.log('------------------------');
      console.log(refreshToken);

      const { email, name } = profile._json;
      User.findOrCreate({ email }, { email, name, password: '000000' })
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

export default githubStrategy;
