import { RequestHandler } from "express";
import { validateJournalEntry } from "../validation/dream.validation";
import { responseHandler } from "../helpers/response";
import { processCreateDreamJournal } from "../services/dream.service";

export const createDreamJournal: RequestHandler = async (req, res, next) => {
  try {
    await validateJournalEntry(req.body);

    await processCreateDreamJournal();

    res.json(responseHandler("User data retrieved successfully"));
  } catch (error) {
    next(error);
  }
};
