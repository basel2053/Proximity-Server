import { Document, Model, Schema, model } from 'mongoose';

interface IFederatedCredentials {
  userId: string;
  provider: string;
  profileId: string;
}

interface IFedCredDoc extends Document {
  userId: string;
  provider: string;
  profileId: string;
}

interface IFedCredModel extends Model<IFedCredDoc> {
  build(cred: IFederatedCredentials): Promise<IFedCredDoc>;
}

const fedCredSchema = new Schema<IFederatedCredentials>({
  userId: {
    type: String,
    required: true,
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

fedCredSchema.statics.build = async (c: IFederatedCredentials) => {
  const credentials = new FedCred(c);
  await credentials.save();
  return credentials;
};

const FedCred = model<IFedCredDoc, IFedCredModel>('FederatedUser', fedCredSchema);

export default FedCred;
