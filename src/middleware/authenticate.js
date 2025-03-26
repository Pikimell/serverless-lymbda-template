import createHttpError from 'http-errors';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { CLIENT_ID, USER_POOL_ID } from '../helpers/constants.js';
import { getUserByCognito } from '../services/userService.js';

const verifier = CognitoJwtVerifier.create({
  userPoolId: USER_POOL_ID,
  tokenUse: 'access',
  clientId: CLIENT_ID,
});

export const authenticate = async (event, context) => {
  const authHeader = event.headers['Authorization'];

  if (!authHeader) {
    throw createHttpError(401, 'Please provide Authorization header');
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    throw createHttpError(401, 'Auth header should be of type Bearer');
  }

  console.log(token);

  try {
    const payload = await verifier.verify(token);
    const user = await getUserByCognito(payload.sub);
    event.user = user;
    event.typeAccount = payload['cognito:groups'][0];
    console.log(user);
  } catch (err) {
    console.log(err);

    throw createHttpError(401, 'Invalid token');
  }
};
