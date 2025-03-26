import { UserCollection } from '../db/models/user.js';

export const createUser = (userData) => {
  return UserCollection.create(userData);
};

export const getUserByCognito = async (cognitoSub) => {
  const user = await UserCollection.findOne({ cognitoSub });

  if (!user) {
    throw new Error('User not found!');
  }

  return user;
};
