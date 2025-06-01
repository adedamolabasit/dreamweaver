import { Router } from "express";
import {
  weaveDream,
  startProduction,
  getUserProductions,
  getProductionById,
  getAllProductions,
} from "../controllers/production.contoller";
import { authenticatedUser } from "../../middleware/auth.middleware";

const router = Router();

router.post("/weave/:id", authenticatedUser, weaveDream);
router.get("/storys", getAllProductions);
router.post("/initiate/:productionId", authenticatedUser, startProduction);
router.get("/storys/:productId", authenticatedUser, getUserProductions);
router.get("/story/:productionId", authenticatedUser, getProductionById);

export default router;
