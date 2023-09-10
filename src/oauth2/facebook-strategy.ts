import passport from 'passport';
import dotenv from 'dotenv';
import { Strategy as FacebookStrategy } from 'passport-facebook';

// import User from '../users/users-model';

dotenv.config();

const { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, FACEBOOK_CB } = process.env;

const facebookStrategy = passport.use(
  new FacebookStrategy(
    {
      clientID: String(FACEBOOK_APP_ID),
      clientSecret: String(FACEBOOK_APP_SECRET),
      callbackURL: String(FACEBOOK_CB),
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      console.log('------------------------');
      console.log(accessToken);
      console.log('------------------------');
      console.log(refreshToken);
      console.log('------------------------');
      console.log(profile);
      console.log('------------------------');
      console.log(cb);

      // const { email, given_name } = profile._json;
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

export default facebookStrategy;
