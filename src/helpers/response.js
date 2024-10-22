export function response(status) {
  return (data, headers = {}, options = {}) => {
    return {
      statusCode: status,
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5173',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Credentials': 'true',
        ...headers,
      },
      body: JSON.stringify(data),
      multiValueHeaders: { 'Set-Cookie': options.cookies || [] },
    };
  };
}
