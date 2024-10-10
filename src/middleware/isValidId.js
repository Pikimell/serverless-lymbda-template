import { isValidObjectId } from 'mongoose';

import createHttpError from 'http-errors';

export const isValidId = (event) => {
  const { id } = event.pathParameters;
  if (!isValidObjectId(id)) {
    throw createHttpError(404, 'Invalid contact ID format!');
  }
};
