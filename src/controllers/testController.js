import { testService } from '../services/testService.js';
import { response } from '../helpers/response.js';

export const testController = async (event, context) => {
  try {
    const result = await testService();
    return response(200)(result);
  } catch (error) {
    return response(500)({ message: error.message });
  }
};
