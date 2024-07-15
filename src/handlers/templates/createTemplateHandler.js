import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import { template_1 } from '../../controllers/templateController.js';

export const createTemplateHandler = async (event, context) => {
  const ctrl = ctrlWrapper(template_1);
  return await ctrl(event, context);
};
