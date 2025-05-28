import { RequestHandler } from "express";
import { validateJournalEntry, validateJournalUpdate } from "../../modules/validation/dream.validation";
import { responseHandler } from "../../helpers/response";
import { 
  processCreateDreamJournal,
  processGetAllJournals,
  processGetJournalById,
  processUpdateJournal,
  processDeleteJournal,
  processGetUserJournals
} from "../../services/dream.service";

export const createDreamJournal: RequestHandler = async (req, res, next) => {
  try {
    const { userId, transcript } = validateJournalEntry(req.body);
    const journalEntry = await processCreateDreamJournal({ userId, transcript });
    res.status(201).json(responseHandler("Dream journal created successfully", journalEntry));
  } catch (error) {
    next(error);
  }
};

export const getAllJournals: RequestHandler = async (req, res, next) => {
  try {
    const journals = await processGetAllJournals();
    res.json(responseHandler("All journals retrieved", journals));
  } catch (error) {
    next(error);
  }
};

export const getJournalById: RequestHandler = async (req, res, next) => {
  try {
    const journal = await processGetJournalById(req.params.id);
    res.json(responseHandler("Journal retrieved", journal));
  } catch (error) {
    next(error);
  }
};

export const updateJournal: RequestHandler = async (req, res, next) => {
  try {
    const { transcript } = validateJournalUpdate(req.body);
    const updatedJournal = await processUpdateJournal(req.params.id, transcript);
    res.json(responseHandler("Journal updated", updatedJournal));
  } catch (error) {
    next(error);
  }
};

export const deleteJournal: RequestHandler = async (req, res, next) => {
  try {
    await processDeleteJournal(req.params.id);
    res.json(responseHandler("Journal deleted successfully"));
  } catch (error) {
    next(error);
  }
};

export const getUserJournals: RequestHandler = async (req, res, next) => {
  try {
    const journals = await processGetUserJournals(req.params.userId);
    res.json(responseHandler("User journals retrieved", journals));
  } catch (error) {
    next(error);
  }
};