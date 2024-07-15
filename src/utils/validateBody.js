import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res) => {
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    const error = createHttpError(400, 'Bad Request', {
      errors: err.details,
    });
    throw error;
  }
};
