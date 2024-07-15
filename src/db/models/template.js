import { model, Schema } from 'mongoose';
const templateSchema = new Schema(
  {
    templateName: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

templateSchema.index({ templateName: 1 }, { unique: true });

export const TemplatesCollection = model('templates', templateSchema);
