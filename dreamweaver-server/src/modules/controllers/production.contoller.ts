import { RequestHandler } from "express";
import {
  validateJournalEntry,
  validateJournalUpdate,
} from "../validation/dream.validation";
import { responseHandler } from "../../helpers/response";
import {
  processCreateDreamJournal,
  processGetAllJournals,
  processGetJournalById,
  processUpdateJournal,
  processDeleteJournal,
  processGetUserJournals,
} from "../services/dream.service";

export const weaveDream: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?.id as string;

     const id = req.params.id;

    const result = await processWeaveDream({
      userId,
      id,
    });
    res
      .status(201)
      .json(
        responseHandler("Dream weaved successfully", )
      );
  } catch (error) {
    next(error);
  }
};