import { Profile, VerifyCallback } from 'passport-google-oauth20';
import FedCred from '../federatedCredentials-model';
import User from '../../users/users-model';

const verifyFunction = function (accessToken: string, refreshToken: string, profile: Profile, cb: VerifyCallback) {
  console.log(profile);
  console.log('------------------------');
  console.log(accessToken);
  console.log('------------------------');
  console.log(refreshToken);

  FedCred.findOne({ provider: profile.provider, profileId: profile.id })
    .then(async (credentials) => {
      if (!credentials) {
        const user = await User.build({ name: profile.displayName });
        const { provider, id } = profile;
        const fedCredentials = { profileId: id, provider, userId: user.id };
        await FedCred.build(fedCredentials);
        return cb(null, user);
      }
      const user = await User.findById(credentials.userId);
      if (user) {
        return cb(null, user);
      } else {
        return cb(null, false);
      }
    })
    .catch((err) => {
      cb(err);
    });
};

export default verifyFunction;
