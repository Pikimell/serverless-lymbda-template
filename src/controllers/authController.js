import { ONE_DAY, ONE_MONTH } from '../helpers/constants.js';
import { response } from '../helpers/response.js';
import * as authServices from '../services/authService.js';

export const registerUserController = async (event, context) => {
  try {
    const { email, password, group } = event.body;
    const result = await authServices.registerUserService({
      email,
      password,
      group,
    });
    return response(201)(result);
  } catch (error) {
    return response(400)({ message: error.message });
  }
};

export const loginController = async (event, context) => {
  try {
    console.log('Login Controller');
    const { email, password } = event.body;

    const session = await authServices.loginService({ email, password });

    const cookies = [
      `refreshToken=${session.refreshToken}; HttpOnly; Expires=${new Date(
        Date.now() + ONE_MONTH,
      ).toUTCString()}; Secure; SameSite=Strict`,
      `sessionId=${session.idToken}; HttpOnly; Expires=${new Date(
        Date.now() + ONE_DAY,
      ).toUTCString()}; Secure; SameSite=Strict;`,
    ];

    const result = { accessToken: session.accessToken };

    const controllerResponse = response(200)(result, { 'Set-Cookie': cookies });

    console.log('Controller result', controllerResponse);
    return controllerResponse;
  } catch (error) {
    return response(400)({ message: error.message });
  }
};

export const logoutController = async (event, context) => {
  try {
    await authServices.logoutService();
    return response(200)({ message: 'Logged out successfully!' });
  } catch (error) {
    return response(400)({ message: error.message });
  }
};

export const refreshController = async (event, context) => {
  try {
    const session = await authServices.refreshService();

    const cookies = [
      `refreshToken=${session.refreshToken}; HttpOnly; Expires=${new Date(
        Date.now() + ONE_MONTH,
      ).toUTCString()}; Secure; SameSite=Strict`,
      `sessionId=${session.idToken}; HttpOnly; Expires=${new Date(
        Date.now() + ONE_DAY,
      ).toUTCString()}; Secure; SameSite=Strict`,
    ];

    return response(200)(
      { accessToken: session.accessToken },
      { 'Set-Cookie': cookies },
    );
  } catch (error) {
    return response(400)({ message: error.message });
  }
};

export const requestResetEmailController = async (event, context) => {
  try {
    const { email } = event.body;
    await authServices.requestResetEmailService(email);
    return response(200)({ message: 'Password reset email sent' });
  } catch (error) {
    return response(400)({ message: error.message });
  }
};

export const resetPasswordController = async (event, context) => {
  try {
    const { email, code, newPassword } = event.body;
    await authServices.resetPasswordService({ email, code, newPassword });
    return response(200)({ message: 'Password successfully reset' });
  } catch (error) {
    return response(400)({ message: error.message });
  }
};

export const confirmEmailController = async (event, context) => {
  try {
    const { email, code } = event.body;
    await authServices.confirmEmailService({ email, code });
    return response(200)({ message: 'Email confirmed successfully!' });
  } catch (error) {
    return response(400)({ message: error.message });
  }
};
