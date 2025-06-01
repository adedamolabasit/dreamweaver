import { Router } from "express";
import dreamRoutes from "./dream.routes";
import authRoutes from "./auth.routes";
import productionRoutes from "./production.routes";
const router = Router();
import { getAllProductions } from "../controllers/production.contoller";

router.use("/dream", dreamRoutes);
router.use("/auth", authRoutes);
router.use("/production", productionRoutes);
router.get("/public/storys", getAllProductions);

export default router;
