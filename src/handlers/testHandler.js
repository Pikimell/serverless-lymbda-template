import { testController } from '../controllers/testController.js';
import { authenticate } from '../middleware/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

export const testHandler = async (event, context) => {
  const ctrl = ctrlWrapper(testController, authenticate);
  return await ctrl(event, context);
};
