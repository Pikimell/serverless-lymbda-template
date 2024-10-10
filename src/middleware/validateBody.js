import createHttpError from 'http-errors';

export const validateBody = (schema) => async (event) => {
  try {
    await schema.validateAsync(event.body, {
      abortEarly: false,
    });
  } catch (err) {
    const error = createHttpError(400, 'Bad Request', {
      errors: err.details,
    });
    throw error;
  }
};
