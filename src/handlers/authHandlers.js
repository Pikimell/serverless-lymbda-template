import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import * as authControllers from '../controllers/authController.js';

export const registerUserHandler = async (event, context) => {
  const ctrl = ctrlWrapper(authControllers.registerUserController);
  return await ctrl(event, context);
};

export const loginHandler = async (event, context) => {
  const ctrl = ctrlWrapper(authControllers.loginController);
  return await ctrl(event, context);
};

export const logoutHandler = async (event, context) => {
  const ctrl = ctrlWrapper(authControllers.logoutController);
  return await ctrl(event, context);
};

export const refreshHandler = async (event, context) => {
  const ctrl = ctrlWrapper(authControllers.refreshController);
  return await ctrl(event, context);
};

export const requestResetEmailHandler = async (event, context) => {
  const ctrl = ctrlWrapper(authControllers.requestResetEmailController);
  return await ctrl(event, context);
};

export const resetPasswordHandler = async (event, context) => {
  const ctrl = ctrlWrapper(authControllers.resetPasswordController);
  return await ctrl(event, context);
};
