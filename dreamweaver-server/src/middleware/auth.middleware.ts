import { RequestHandler } from "express";
import { verifyMessage } from "ethers";
import { User, IUser } from "../models/user.model";
import logger from "../utils/logger";

export const authenticatedUser: RequestHandler = async (
  req,
  res,
  next
): Promise<any> => {
  try {
    const signature = req.headers["x-signature"] as string;

    if (!signature || signature.includes("[object Promise]")) {
      return res.status(401).json({
        success: false,
        message: "Valid signature required",
      });
    }
    const issuer = "dreamweaver";

    let recoveredAddress: string;
    try {
      recoveredAddress = verifyMessage(issuer, signature);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid signature format",
      });
    }

    const user = (await User.findOne({
      walletAddress: recoveredAddress.toLowerCase(),
    })) as IUser;

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "User not registered",
      });
    }

    console.log(user);

    // req.user = {
    //   walletAddress: recoveredAddress,
    //   id: user.id,
    //   isAuthenticated: true,
    // };

    next();
  } catch (error) {
    logger.error("Authentication error:", error);
    res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
};
