import { Router } from "express";
import {
  registerUser,
  getUser,
  updateUser,
  getProfile,
  updateProfile,
  getProfileById,
} from "../controllers/auth.controller";
import { authenticatedUser } from "../../middleware/auth.middleware";

const router = Router();

router.post("/register", registerUser);
router.get("/:walletAddress", getUser);
router.get("/profile", authenticatedUser, getProfile);
router.get("/user/:id", getProfileById);
router.patch("/:walletAddress", updateUser);
router.patch("/profile/:walletAddress", authenticatedUser, updateProfile);

export default router;
