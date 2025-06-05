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
router.delete("/journal/:id", authenticatedUser, deleteJournal);
router.get("/user/journals", authenticatedUser, getUserJournals);

export default router;
