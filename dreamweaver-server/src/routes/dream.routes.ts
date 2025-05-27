import { Router } from "express";
import { 
  createDreamJournal,
  getAllJournals,
  getJournalById,
  updateJournal,
  deleteJournal,
  getUserJournals
} from "../controllers/dream.controller";

const router = Router();

router.post("/journal", createDreamJournal);
router.get("/journals", getAllJournals);
router.get("/journal/:id", getJournalById);
router.put("/journal/:id", updateJournal);
router.delete("/journal/:id", deleteJournal);
router.get("/user/:userId/journals", getUserJournals);

export default router;