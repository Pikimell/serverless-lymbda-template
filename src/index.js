import { initMongoDB } from './db/initMongoDb.js';

export async function initConnection(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;

  await initMongoDB();

  return {
    statusCode: 200,
    body: 'Connection Successful',
  };
}
