import { RequestHandler } from "express";
import { responseHandler } from "../../helpers/response";
import {
  validateUser,
  validateUpdateUser,
} from "../../modules/validation/user.validation";
import {
  processRegisterUser,
  getUserByWalletAddress,
  updateUserData,
} from "../../services/auth.service";

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
