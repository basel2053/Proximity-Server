import facebookStrategy from './strategies/facebook-strategy';
import githubStrategy from './strategies/github-strategy';
import googleStrategy from './strategies/google-strategy';

const intializeStrategies = () => {
  googleStrategy;
  facebookStrategy;
  githubStrategy;
};

export default intializeStrategies;
