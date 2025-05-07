import mongoose from 'mongoose';
import { env } from '../utils/env.js';

let cachedDb = null;

export const initMongoDB = async () => {
  if (cachedDb && mongoose.connection.readyState === 1) {
    console.log('Already connected!');
    return;
  }

  try {
    const user = env('MONGODB_USER');
    const pwd = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL');
    const db = env('MONGODB_DB');

    const connection = await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority&ssl=true`,
    );

    console.log('Mongo connection successfully established!');
    cachedDb = connection;
  } catch (e) {
    console.log('Error while setting up mongo connection', e);
    throw e;
  }
};
