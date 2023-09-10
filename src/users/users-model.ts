import { Schema, Document, Model, model } from 'mongoose';
import argon2 from 'argon2';

import { NotFoundError } from '../errors/notFound-error';
import { BadRequestError } from '../errors/badRequest-error';

interface ILocation {
  lat: number;
  lng: number;
}

interface IUser {
  email?: string;
  name: string;
  password?: string;
  location?: ILocation;
  role?: 'customer' | 'owner';
}

interface IUserDoc extends Document {
  email: string;
  password: string;
  name: string;
  passwordMatches(password: string): Promise<boolean>;
}

interface IUserModel extends Model<IUserDoc> {
  build(user: IUser): Promise<IUserDoc>;
  getUser(id: string): Promise<IUserDoc | never>;
  isDuplicateEmail(email: string): Promise<void | never>;
  findOrCreate: (cond: object, newUser: IUser) => Promise<IUserDoc>;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      minlength: 6,
      maxlength: 16,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
      },
    },
  },
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashedPassword = await argon2.hash(String(this.get('password')));
    this.set('password', hashedPassword);
  }
  done();
});

userSchema.pre('findOneAndUpdate', async function (done) {
  // HERE  remember to solve this one
  // @ts-ignore: unreachable code to add _update
  const password = this._update.password;
  if (password) {
    const hashedPassword = await argon2.hash(password);
    this.findOneAndUpdate({}, { password: hashedPassword });
  }
  done();
});

userSchema.methods.passwordMatches = async function passwordMatches(password: string) {
  return argon2.verify(this.password, password);
};

userSchema.statics = {
  async build(u: IUser) {
    const user = new User(u);
    await user.save();
    return user;
  },

  async getUser(id: string) {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundError("User doesn't exist");
    }

    return user;
  },

  async isDuplicateEmail(email: string) {
    const user = await this.findOne({ email });

    if (user) {
      throw new BadRequestError(`Email: ${email} is already used`);
    }
  },
  async findOrCreate(cond, newUser: IUser) {
    const user = await this.findOne(cond);
    if (user) {
      return user;
    }
    const createdUser = await User.build(newUser);
    return createdUser;
  },
};

const User = model<IUserDoc, IUserModel>('User', userSchema);

export default User;
