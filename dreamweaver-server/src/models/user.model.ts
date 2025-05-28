import mongoose, { Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IUser extends Document {
  username: string;
  walletAddress: string;
  url?: string;
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
      default:'watcher'
    },
    walletAddress: {
      type: String,
      required: true,
      unique: true,
    },
    url: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
