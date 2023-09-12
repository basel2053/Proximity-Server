import { Schema, model } from 'mongoose';

interface ICompany {
  name: string;
  location: {
    type: 'Point';
    coordinates: number[];
  };
}

const companySchema = new Schema<ICompany>({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    // index: '2dsphere',
  },
});

companySchema.index({ location: '2dsphere' });

const Company = model('Company', companySchema);

export default Company;
