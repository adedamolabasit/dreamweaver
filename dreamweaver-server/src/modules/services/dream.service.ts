import { UnauthorizedError, NotFoundError } from "../../errors/httpError";
import { DreamJournalEntry } from "../../models/dream.journal.model";
import { User } from "../../models/user.model";
import { CreateJournalParams, UpdateJournalParams } from "../../types";
import logger from "../../utils/logger";
import mongoose from "mongoose";

export const processCreateDreamJournal = async ({
  userId,
  transcript,
}: CreateJournalParams) => {
  try {
    const userIdObj = mongoose.Types.ObjectId.isValid(userId)
      ? new mongoose.Types.ObjectId(userId)
      : new mongoose.Types.ObjectId();

    let user = await User.findById(userIdObj);
    if (!user) throw new UnauthorizedError("Unauthorized user");

    const entry = await DreamJournalEntry.create({ user: userId, transcript });

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

export const processGetAllJournals = async () => {
  try {
    return await DreamJournalEntry.find()
      .populate("user", "username")
      .sort({ createdAt: -1 });
  } catch (error) {
    logger.error("Failed to get all journals:", error);
    throw new Error("Failed to retrieve journals");
  }
};

export const processGetJournalById = async (id: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundError("Journal not found");
    }

    const journal = await DreamJournalEntry.findById(id).populate(
      "user",
      "username"
    );
    if (!journal) throw new NotFoundError("Journal not found");

    return journal;
  } catch (error) {
    logger.error("Failed to get journal:", error);
    throw error;
  }
};

export const processUpdateJournal = async (id: string, transcript: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundError("Journal not found");
    }

    const updatedJournal = await DreamJournalEntry.findByIdAndUpdate(
      id,
      { transcript },
      { new: true, runValidators: true }
    ).populate("user", "username");

    if (!updatedJournal) throw new NotFoundError("Journal not found");
    return updatedJournal;
  } catch (error) {
    logger.error("Failed to update journal:", error);
    throw new Error("Failed to update journal");
  }
};

export const processDeleteJournal = async (id: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new NotFoundError("Journal not found");
    }

    const journal = await DreamJournalEntry.findByIdAndDelete(id);
    if (!journal) throw new NotFoundError("Journal not found");

    // Remove reference from user
    await User.findByIdAndUpdate(journal.user, {
      $pull: { journalEntries: journal._id },
    });
  } catch (error) {
    logger.error("Failed to delete journal:", error);
    throw new Error("Failed to delete journal");
  }
};

export const processGetUserJournals = async (userId: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new NotFoundError("User not found");
    }

    return await DreamJournalEntry.find({ user: userId })
      .populate("user", "username")
      .sort({ createdAt: -1 });
  } catch (error) {
    logger.error("Failed to get user journals:", error);
    throw new Error("Failed to retrieve user journals");
  }
};
