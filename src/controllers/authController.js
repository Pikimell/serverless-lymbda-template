import { ONE_DAY, ONE_MONTH } from '../helpers/constants.js';
import { response } from '../helpers/response.js';
import * as authServices from '../services/authService.js';

export const registerUserController = async (event, context) => {
  const { email, password, group } = event.body;
  const result = await authServices.registerUserService({
    email,
    password,
    group,
  });
  return response(201)(result);
};

export const loginController = async (event, context) => {
  const { email, password } = event.body;

  const session = await authServices.loginService({ email, password });

  const cookies = [
    getCookie('refreshToken', session.refreshToken, ONE_MONTH),
    getCookie('sessionId', session.idToken, ONE_DAY),
  ];

  const headers = { 'Set-Cookie': cookies };

  const result = { accessToken: session.accessToken };

  return response(200)(result, headers);
};

export const logoutController = async (event, context) => {
  await authServices.logoutService();

  const cookies = [
    getCookie('refreshToken', 1, 0),
    getCookie('sessionId', 1, 0),
  ];

  const headers = { 'Set-Cookie': cookies };

  const result = { message: 'Logged out successfully!' };

  return response(200)(result, headers);
};

export const refreshController = async (event, context) => {
  const session = await authServices.refreshService();

  const cookies = [
    getCookie('refreshToken', session.refreshToken, ONE_MONTH),
    getCookie('sessionId', session.idToken, ONE_DAY),
  ];

  const headers = { 'Set-Cookie': cookies };

  const result = { accessToken: session.accessToken };

  return response(200)(result, headers);
};

export const requestResetEmailController = async (event, context) => {
  const { email } = event.body;
  await authServices.requestResetEmailService(email);
  return response(200)({ message: 'Password reset email sent' });
};

export const resetPasswordController = async (event, context) => {
  const { email, code, newPassword } = event.body;
  await authServices.resetPasswordService({ email, code, newPassword });
  return response(200)({ message: 'Password successfully reset' });
};

export const confirmEmailController = async (event, context) => {
  const { email, code } = event.body;
  await authServices.confirmEmailService({ email, code });
  return response(200)({ message: 'Email confirmed successfully!' });
};
