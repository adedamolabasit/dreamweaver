import { Router } from "express";
import {
  registerUser,
  getUser,
  updateUser,
} from "../controllers/auth.controller";

const router = Router();

router.post("/register", registerUser);
router.get("/:walletAddress", getUser);
router.patch("/:walletAddress", updateUser);

export default router;
