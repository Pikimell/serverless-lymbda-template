export function response(status) {
  return (data, headers = {}, options = {}) => {
    return {
      statusCode: status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        ...headers,
      },
      body: JSON.stringify(data),
      ...options,
    };
  };
}
