import passport from 'passport';
import dotenv from 'dotenv';
import { Strategy as GithubStrategy, Profile } from 'passport-github2';

// import User from '../users/users-model';

dotenv.config();

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_CB } = process.env;
console.log(GITHUB_CLIENT_ID);
console.log(GITHUB_CLIENT_SECRET);

const githubStrategy = passport.use(
  new GithubStrategy(
    {
      clientID: String(GITHUB_CLIENT_ID),
      clientSecret: String(GITHUB_CLIENT_SECRET),
      callbackURL: String(GITHUB_CB),
    },
    function (accessToken: string, refreshToken: string, profile: Profile, cb: unknown) {
      console.log(profile);
      console.log('------------------------');
      console.log(accessToken);
      console.log('------------------------');
      console.log(refreshToken);
      console.log('------------------------');
      console.log(profile);
      console.log('------------------------');
      console.log(cb);
      // const { email, given_name } = profile;
      // User.findOrCreate({ email }, { email: String(email), name: String(given_name), password: '000000' })
      //   .then((user) => {
      //     return cb(null, user);
      //   })
      //   .catch((err) => {
      //     console.log(err);

      //     return cb(err);
      //   });
    },
  ),
);

export default githubStrategy;
