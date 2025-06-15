import { IUser, User } from "../../models/user.model";
import logger from "../../utils/logger";
import { RegisterUserParams, UpdateUserParams } from "../../types";
import { generateJwt } from "../../utils/jwtGenerator";
import { RandomUserGenerator } from "../../utils/avatarGenerator";
import mongoose from "mongoose";
import { NotFoundError } from "../../errors/httpError";

export const processRegisterUser = async ({
  walletAddress,
}: RegisterUserParams) => {
  try {
    let user = await User.findOne({ walletAddress });

    if (!user) {
      const profile = RandomUserGenerator.generateUser();
      user = await User.create({
        walletAddress,
        username: profile.username,
        avatar: profile.avatarUrl,
      });
    }

    const jwt = generateJwt({
      data: {
        id: user.id.toString(),
        walletAddress: user.walletAddress,
      },
      sub: user.walletAddress,
    });

    return { jwt };
  } catch (error) {
    logger.error("User authentication failed:", error);
    throw new Error("Failed to authenticate user");
  }
};

export const getUserByWalletAddress = async (walletAddress: string) => {
  try {
    const user = await User.findOne({ walletAddress });

    console.log(user, "user1");

    return {
      user,
    };
  } catch (error) {
    logger.error("Error fetching user:", error);
    throw new Error("Failed to fetch user");
  }
};

export const processGetProfile = async (userId: string) => {
  try {
    const profile = await User.findById(userId).lean();
    return { profile };
  } catch (error) {
    logger.error("Error fetching profile:", error);
    throw new Error("Failed to fetch profile");
  }
};

export const processGetProfileById = async (id: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundError("Journal not found");
    }
    const profile = await User.findById(id).lean();
    return { profile };
  } catch (error) {
    logger.error("Error fetching profile:", error);
    throw new Error("Failed to fetch profile");
  }
};

export const updateUserData = async ({
  walletAddress,
  updateData,
}: UpdateUserParams) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { walletAddress },
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  } catch (error) {
    logger.error("User update failed:", error);
    throw new Error("Failed to update user");
  }
};

export const processUpdateProfile = async ({
  walletAddress,
  updateData,
}: {
  walletAddress: string;
  updateData: Partial<IUser>;
}) => {
  try {
    const existingProfile = await User.findOne({
      walletAddress,
    });

    if (!existingProfile) {
      throw new NotFoundError("Profile not found");
    }

    console.log(updateData.license?.registeredLicense, "mmm");

    if (updateData.license?.registeredLicense) {
      const newLicenses = Array.isArray(updateData.license.registeredLicense)
        ? updateData.license.registeredLicense
        : [updateData.license.registeredLicense];

      existingProfile.license.registeredLicense = [
        ...(existingProfile.license.registeredLicense ?? []),
        ...(newLicenses as typeof existingProfile.license.registeredLicense),
      ];

      delete updateData.license;
    }

    Object.assign(existingProfile, updateData);

    const updatedProduction = await existingProfile.save();

    return updatedProduction;
  } catch (error) {
    logger.error("Profile update failed:", error);
    throw new Error("Failed to update profile");
  }
};
