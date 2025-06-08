import { Router } from "express";
import {
  weaveDream,
  startProduction,
  getUserProductions,
  getProductionById,
  getAllProductions,
  updateDreamProduction
} from "../controllers/production.contoller";
import { authenticatedUser } from "../../middleware/auth.middleware";

const router = Router();

router.post("/weave/:id", authenticatedUser, weaveDream);
router.get("/storys", getAllProductions);
router.post("/initiate/:productionId", authenticatedUser, startProduction);
router.get("/user-storys", authenticatedUser, getUserProductions);
router.get("/story/:productionId", getProductionById);
router.patch("/story/:productionId", authenticatedUser, updateDreamProduction);


export default router;
