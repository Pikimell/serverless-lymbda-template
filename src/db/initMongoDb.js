import mongoose from 'mongoose';

import { env } from '../utils/env.js';

export const initMongoDB = async () => {
  if (dbInfo.connected) {
    console.log('Already connected!');
    return;
  }

  try {
    const user = env('MONGODB_USER');
    const pwd = env('MONGODB_PASSWORD');
    const url = env('MONGODB_URL');
    const db = env('MONGODB_DB');

    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority&ssl=true`,
    );

    console.log('Mongo connection successfully established!');
    dbInfo.connected = true;
  } catch (e) {
    console.log('Error while setting up mongo connection', e);
    throw e;
  }
};

export const dbInfo = {
  connected: false,
};
