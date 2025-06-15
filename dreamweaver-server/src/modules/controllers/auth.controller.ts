import { RequestHandler } from "express";
import { responseHandler } from "../../helpers/response";
import {
  validateUser,
  validateUpdateUser,
} from "../validation/user.validation";
import {
  processRegisterUser,
  getUserByWalletAddress,
  updateUserData,
  processGetProfile,
  processUpdateProfile,
} from "../services/auth.service";

export const registerUser: RequestHandler = async (req, res, next) => {
  try {
    const { walletAddress } = validateUser(req.body);
    const userEntry = await processRegisterUser({ walletAddress });
    res
      .status(201)
      .json(responseHandler("User authenticated successfully", userEntry));
  } catch (error) {
    next(error);
  }
};

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const { walletAddress } = req.params;
    const user = await getUserByWalletAddress(walletAddress);

    res.status(200).json(responseHandler("User retrieved successfully", user));
  } catch (error) {
    next(error);
  }
};

export const getProfile: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?.id as string;
    const { profile } = await processGetProfile(userId);

    res
      .status(200)
      .json(responseHandler("Profile retrieved successfully", { profile }));
  } catch (error) {
    next(error);
  }
};

export const getProfileById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { profile } = await processGetProfile(id);

    res
      .status(200)
      .json(responseHandler("Profile retrieved successfully", { profile }));
  } catch (error) {
    next(error);
  }
};

export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const { walletAddress } = req.params;
    const updateData = validateUpdateUser(req.body);

    const updatedUser = await updateUserData({
      walletAddress,
      updateData,
    });

    res
      .status(200)
      .json(responseHandler("User updated successfully", updatedUser));
  } catch (error) {
    next(error);
  }
};

export const updateProfile: RequestHandler = async (req, res, next) => {
  try {
    const { walletAddress } = req.params;
    const updateData = req.body;

    const updatedProfile = await processUpdateProfile({
      walletAddress,
      updateData,
    });

    res
      .status(200)
      .json(responseHandler("Profile updated successfully", updatedProfile));
  } catch (error) {
    next(error);
  }
};
