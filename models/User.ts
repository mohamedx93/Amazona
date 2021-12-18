import mongoose from 'mongoose';
import { UserDoc, UserModel } from '../utils/Interfaces';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const User: UserModel =
  mongoose.models.User ||
  mongoose.model<UserDoc, UserModel>('User', userSchema);

export default User;
