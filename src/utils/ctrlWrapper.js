import { HttpError } from 'http-errors';
import { initMongoDB } from '../db/initMongoDb.js';

export const ctrlWrapper = (controller) => {
  return async (event, context) => {
    try {
      initMongoDB();
      return await controller(event, context);
    } catch (err) {
      return errorHandler(err);
    }
  };
};

export const errorHandler = (err) => {
  if (err instanceof HttpError) {
    return {
      statusCode: err.status,
      headers: {
        'Access-Control-Allow-Origin': '*', // Разрешить запросы с любых источников
        'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Разрешить необходимые заголовки
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // Разрешить необходимые методы
      },
      body: JSON.stringify({
        status: err.status,
        message: err.name,
        data: err,
      }),
    };
  }

  return {
    statusCode: 500,
    headers: {
      'Access-Control-Allow-Origin': '*', // Разрешить запросы с любых источников
      'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Разрешить необходимые заголовки
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // Разрешить необходимые методы
    },
    body: JSON.stringify({
      status: 500,
      message: 'Something went wrong',
      data: err.message,
    }),
  };
};
