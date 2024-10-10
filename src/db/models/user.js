import { model, Schema } from 'mongoose';
const userSchema = new Schema(
  {
    nickname: {
      type: String,
      required: true,
      unique: true,
    },
    password: {},
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female'],
    },
  },
  {
    versionKey: false,
  },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UserCollection = model('users', userSchema);
