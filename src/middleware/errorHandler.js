import { HttpError } from 'http-errors';

export const errorHandler = (err) => {
  if (err instanceof HttpError) {
    return {
      statusCode: err.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
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
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    },
    body: JSON.stringify({
      status: 500,
      message: 'Something went wrong',
      data: err.message,
    }),
  };
};
