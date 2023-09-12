import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import User from '../../users/users-model';

const localStrategy = passport.use(
  new LocalStrategy(function (email, password, done) {
    User.findOne({ email })
      .then(async (user) => {
        if (!user) {
          return done(null, false);
        } else {
          if (await user.passwordMatches(password)) {
            return done(null, user);
          }
          return done(null, false);
        }
      })
      .catch((err) => done(err));
  }),
);

export default localStrategy;
