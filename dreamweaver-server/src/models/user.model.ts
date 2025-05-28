import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  walletAddress: string;
  avatar?: string;
  createdAt: Date;
  lastSeen: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: false,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
      default:'weaver'
    },
    walletAddress: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
