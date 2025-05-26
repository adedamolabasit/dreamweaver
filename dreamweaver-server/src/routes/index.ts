import { Router } from "express";
import dreamRoutes from "./dream.routes";
const router = Router();

router.use("/dream", dreamRoutes);

export default router;
