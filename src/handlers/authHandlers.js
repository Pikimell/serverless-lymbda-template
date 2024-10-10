import { ctrlWrapper } from '../../utils/ctrlWrapper.js';

export const loginHandler = async (event, context) => {
  const ctrl = ctrlWrapper(template_1);
  return await ctrl(event, context);
};

export const logoutHandler = async (event, context) => {
  const ctrl = ctrlWrapper(template_1);
  return await ctrl(event, context);
};

export const refreshHandler = async (event, context) => {
  const ctrl = ctrlWrapper(template_1);
  return await ctrl(event, context);
};

export const requestResetEmailHandler = async (event, context) => {
  //   const ctrl = ctrlWrapper(template_1);
  return await ctrl(event, context);
};

export const resetPasswordHandler = async (event, context) => {
  //   const ctrl = ctrlWrapper(template_1);
  return await ctrl(event, context);
};
