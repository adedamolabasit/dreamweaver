import { Router } from "express";
import {
  registerUser,
  getUser,
  updateUser,
  getProfile,
  updateProfile,
} from "../controllers/auth.controller";
import { authenticatedUser } from "../../middleware/auth.middleware";

const router = Router();

router.post("/register", registerUser);
router.get("/:walletAddress", getUser);
router.get("/profile", authenticatedUser, getProfile);
router.patch("/:walletAddress", updateUser);
router.patch("/profile", authenticatedUser, updateProfile);

export default router;
