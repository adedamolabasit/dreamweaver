// routes/dream.routes.ts
import { Router } from "express";
import { 
  createDreamJournal,
  getAllJournals,
  getJournalById,
  updateJournal,
  deleteJournal,
  getUserJournals,
} from "../controllers/dream.controller";
import { authenticatedUser } from "../middleware/auth.middleware";

const router = Router();

// Apply middleware to specific routes
router.post("/journal", authenticatedUser, createDreamJournal);
router.get("/journals", authenticatedUser, getAllJournals); 
router.get("/journal/:id", authenticatedUser, getJournalById);
router.put("/journal/:id", authenticatedUser, updateJournal);
router.delete("/journal/:id", authenticatedUser, deleteJournal);
router.get("/user/:userId/journals", authenticatedUser, getUserJournals);

export default router;