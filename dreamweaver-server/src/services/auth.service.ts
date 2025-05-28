import { User } from "../models/user.model";
import logger from "../utils/logger";
import { RegisterUserParams, UpdateUserParams } from "../types";

export const processRegisterUser = async ({
  walletAddress,
}: RegisterUserParams) => {
  try {
    let user = await User.findOne({ walletAddress });

    if (user) return;

    const userEntry = await User.create({ walletAddress });

    return {
      _id: userEntry._id,
    };
  } catch (error) {
    logger.error("User creation failed:", error);
    throw new Error("Failed to create user");
  }
};

export const getUserByWalletAddress = async (walletAddress: string) => {
  try {
    const user = User.findOne({ walletAddress });

    return {
      user,
    };
  } catch (error) {
    logger.error("Error fetching user:", error);
    throw new Error("Failed to fetch user");
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
