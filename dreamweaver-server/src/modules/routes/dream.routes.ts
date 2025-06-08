import { Router } from "express";
import {
  createDreamJournal,
  getAllJournals,
  getJournalById,
  updateJournal,
  deleteJournal,
  getUserJournals,
} from "../controllers/dream.controller";
import { authenticatedUser } from "../../middleware/auth.middleware";

const router = Router();

router.post("/journal", authenticatedUser, createDreamJournal);
router.get("/journals", getAllJournals);
router.get("/journal/:id", getJournalById);
router.put("/journal/:id", authenticatedUser, updateJournal);
router.get("/user-journal", authenticatedUser, getUserJournals);
router.delete("/journal/:id", authenticatedUser, deleteJournal);

export default router;
