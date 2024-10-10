import { response } from '../helpers/response.js';

export const loginController = async (event, context) => {
  const { id } = event.pathParameters;
  const {} = event.queryStringParameters;
  const {} = JSON.parse(event.body);

  const result = await templateService();
  return response(200)(result);
};

export const logoutController = async (event, context) => {
  const { id } = event.pathParameters;
  const {} = event.queryStringParameters;
  const {} = JSON.parse(event.body);

  const result = await templateService();
  return response(200)(result);
};

export const refreshController = async (event, context) => {
  const { id } = event.pathParameters;
  const {} = event.queryStringParameters;
  const {} = JSON.parse(event.body);

  const result = await templateService();
  return response(200)(result);
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
