import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  walletAddress: string;
  avatar?: string;
  license: {
    registeredLicense: {
      licenseType: string;
      productionId: string;
      licenseTermId: string;
      transactionHash: string;
      isAvailable: boolean;
    }[];
    mintedLicense: {
      productionId: string;
      licenseTokenId: string;
      transactionHash: string;
      isAvailable: boolean;
    }[];
  };
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
      default: "weaver",
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
    license: {
      registeredLicense: [
        {
          licenseType: {
            type: String,
            required: false,
          },
          licenseTermsId: {
            type: String,
            required: false,
          },
          transactionHash: {
            type: String,
            required: false,
          },
          isAvailable: {
            type: Boolean,
            required: false,
          },
        },
      ],
      mintedLicense: [
        {
          licenseTokenId: {
            type: String,
            required: false,
          },
          transactionHash: {
            type: String,
            required: false,
          },
          isAvailable: {
            type: Boolean,
            required: false,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
