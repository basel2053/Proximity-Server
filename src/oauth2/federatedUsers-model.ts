import { Document, Model, Schema, model } from 'mongoose';

interface IFederatedUser {
  userId: string;
  provider: string;
  profileId: string;
}

interface IFedUserDoc extends Document {
  userId: string;
  provider: string;
  profileId: string;
}

interface IFedUserModel extends Model<IFedUserDoc> {
  build(user: IFederatedUser): Promise<IFedUserDoc>;
}

const fedUserSchema = new Schema<IFederatedUser>({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  provider: {
    type: String,
    required: true,
  },
  profileId: {
    type: String,
    required: true,
  },
});

fedUserSchema.statics.build = async (u: IFederatedUser) => {
  const user = new FedUser(u);
  await user.save();
  return user;
};

const FedUser = model<IFedUserDoc, IFedUserModel>('FederatedUser', fedUserSchema);

export default FedUser;
