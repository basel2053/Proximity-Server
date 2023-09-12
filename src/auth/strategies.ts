import passport from 'passport';
import facebookStrategy from './strategies/facebook-strategy';
import githubStrategy from './strategies/github-strategy';
import googleStrategy from './strategies/google-strategy';
import localStrategy from './strategies/local-strategy';

const intializeStrategies = () => {
  googleStrategy;
  facebookStrategy;
  githubStrategy;
  localStrategy;

  passport.serializeUser((user, done) => {
    // NOTE  its not good idea to store data that could be updated in the session
    done(null, user);
  });
  passport.deserializeUser((user: { _id: string; name: string }, done) => {
    done(null, user);
  });
};

export default intializeStrategies;
