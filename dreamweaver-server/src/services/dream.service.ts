import { DreamJournalEntry } from "../models/dream.journal.model";
import { User } from "../models/user.model";
import { CreateJournalParams } from "../types";
import logger from "../utils/logger";

export const processCreateDreamJournal = async ({
  userId,
  transcript,
  audio,
}: CreateJournalParams) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const entry = await DreamJournalEntry.create({
      user: userId,
      transcript,
      ...(audio && {
        audio: {
          data: Buffer.from(audio.data, "base64"),
          mimetype: audio.mimetype,
        },
      }),
    });

    await User.findByIdAndUpdate(userId, {
      $push: { journalEntries: entry._id },
    });

    return {
      _id: entry._id,
      user: {
        _id: user._id,
        username: user.username,
      },
      transcript: entry.transcript,
      audio: entry.audio ? { mimetype: entry.audio.mimetype } : undefined,
      createdAt: entry.createdAt,
    };
  } catch (error) {
    logger.error("DreamJournal creation failed:", error);
    throw new Error("Failed to create dream journal");
  }
};
