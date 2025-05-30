import {
  UnauthorizedError,
  NotFoundError,
  ForbiddenError,
} from "../../errors/httpError";
import { DreamJournalEntry } from "../../models/dream.journal.model";

import { User } from "../../models/user.model";
import { CreateJournalParams, UpdateJournalParams } from "../../types";
import logger from "../../utils/logger";
import mongoose from "mongoose";

export const processWeaveDream = async ({
  userId,
  id,
}: {
  userId: string;
  id: string;
}) => {
  try {
    const userIdObj = mongoose.Types.ObjectId.isValid(userId)
      ? new mongoose.Types.ObjectId(userId)
      : new mongoose.Types.ObjectId();

    const journal = DreamJournalEntry.find({ id: id, user: userId })
      .populate("user", "username")
      .sort({ createdAt: -1 });

    if (!journal) {
      throw new NotFoundError("journal not found");
    }



    await User.findByIdAndUpdate(userId, {
      $addToSet: { journalEntries: entry._id },
    });

    return {
      _id: entry._id,
      user: { _id: user._id, username: user.username },
      transcript: entry.transcript,
      createdAt: entry.createdAt,
    };
  } catch (error) {
    logger.error("DreamJournal creation failed:", error);
    throw new Error("Failed to create dream journal");
  }
};
