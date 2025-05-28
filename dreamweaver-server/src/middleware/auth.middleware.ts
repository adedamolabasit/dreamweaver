import { RequestHandler } from "express";
import { User, IUser } from "../models/user.model";
import logger from "../utils/logger";
import { UnauthorizedError } from "../errors/httpError";
import { verifyJwt } from "../utils/jwtGenerator";

export const authenticatedUser: RequestHandler = async (
  req,
  res,
  next
): Promise<any> => {
  try {
    let userPayload;
    const { authorization } = req.headers;

    if (!authorization || typeof authorization !== "string") {
      throw new UnauthorizedError("Authorization token is required");
    }

    const [authType, authToken] = req.headers.authorization?.split(" ") || [];

    if (authType !== "Bearer") {
      throw new UnauthorizedError("Invalid authorization token");
    }

    try {
      const payload = verifyJwt(authToken);
      userPayload = payload;

      console.log(payload, "po");

      if (!payload.sub) {
        throw new UnauthorizedError("Invalid authorization token");
      }

      const user = (await User.findOne({
        walletAddress: payload.sub,
      })) as IUser;

      if (!user) {
        throw new UnauthorizedError("Invalid authorization token");
      }

      req.user = {
        walletAddress: user.walletAddress,
        id: user.id,
        isAuthenticated: true,
      };
    } catch (error) {
      throw new UnauthorizedError("Invalid authorization token");
    }

    next();
  } catch (error) {
    logger.error("Authentication error:", error);
    res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
};
