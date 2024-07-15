export const Responses = {
  $200: (data) => {
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  },

  $400: (err) => {
    return {
      statusCode: 400,
      body: JSON.stringify(err),
    };
  },
  $404: (err) => {
    return {
      statusCode: 404,
      body: JSON.stringify(err),
    };
  },
  $500: (err) => {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  },
};

export function response(status) {
  return (data) => {
    return {
      statusCode: status,
      headers: {
        'Access-Control-Allow-Origin': '*', // Разрешить запросы с любых источников
        'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Разрешить необходимые заголовки
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // Разрешить необходимые методы
      },
      body: JSON.stringify(data),
    };
  };
}
