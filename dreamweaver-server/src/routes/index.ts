import { Router } from "express";
import dreamRoutes from "./dream.routes";
import authRoutes from "./auth.routes";
const router = Router();

router.use("/dream", dreamRoutes);
router.use("/auth", authRoutes);

export default router;
