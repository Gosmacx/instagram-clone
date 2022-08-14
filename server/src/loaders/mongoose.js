import mongoose from 'mongoose';

export default async () => {
  await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) {
      console.error(err)
      throw err;
    }
    console.log('Mongodb connected...')
  });
};