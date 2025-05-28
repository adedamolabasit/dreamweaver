import { IUser } from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: {
        walletAddress: string;
        id: string;
        isAuthenticated: boolean;
      };
    }
  }
}
