import { Router } from "express";
import { weaveDream } from "../controllers/production.contoller";
import { authenticatedUser } from "../../middleware/auth.middleware";

const router = Router();

router.get("/weave/:id", weaveDream);

export default router;
