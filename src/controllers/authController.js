import { ONE_DAY, ONE_MONTH } from '../helpers/constants.js';
import { response } from '../helpers/response.js';

export const loginController = async (event, context) => {
  // const { login, password } = event.body;

  // const session = await loginUser(login, password);

  const cookies = [
    `refreshToken=${123};HttpOnly; Expires=${new Date(
      Date.now() + ONE_DAY,
    ).toUTCString()}`,
    `sessionId=${234}; HttpOnly; Expires=${new Date(
      Date.now() + ONE_MONTH,
    ).toUTCString()}`,
  ];

  const result = { accessToken: 234 };

  return response(200)(result, { 'Set-Cookie': cookies });
};

export const logoutController = async (event, context) => {
  const { id } = event.pathParameters;
  const {} = event.queryStringParameters;
  const {} = JSON.parse(event.body);

  const result = await templateService();
  return response(200)(result);
};

export const refreshController = async (event, context) => {
  const cookies = event.headers.Cookie || '';

  console.log('Cookies:', cookies);

  return response(200)(cookies);
};

export const requestResetEmailController = async (event, context) => {
  const { id } = event.pathParameters;
  const {} = event.queryStringParameters;
  const {} = JSON.parse(event.body);

  const result = await templateService();
  return response(200)(result);
};

export const resetPasswordController = async (event, context) => {
  const { id } = event.pathParameters;
  const {} = event.queryStringParameters;
  const {} = JSON.parse(event.body);

  const result = await templateService();
  return response(200)(result);
};
