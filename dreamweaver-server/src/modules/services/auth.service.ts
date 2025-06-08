import { User } from "../../models/user.model";
import logger from "../../utils/logger";
import { RegisterUserParams, UpdateUserParams } from "../../types";
import { generateJwt } from "../../utils/jwtGenerator";
import { RandomUserGenerator } from "../../utils/avatarGenerator";
import mongoose from "mongoose";

export const processRegisterUser = async ({
  walletAddress,
}: RegisterUserParams) => {
  try {
    let user = await User.findOne({ walletAddress });

    if (!user) {
      const profile = RandomUserGenerator.generateUser();
      console.log(profile, "profile");
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

    console.log(user,'user1')

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
    const profile = await User.findById(userId).lean(); // returns plain object
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
