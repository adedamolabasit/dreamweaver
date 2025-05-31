import { NotFoundError } from "../../errors/httpError";
import { DreamJournalEntry } from "../../models/dream.journal.model";
import { Production, IProduction } from "../../models/production.scence.model";
import logger from "../../utils/logger";
import mongoose from "mongoose";
import { aiProduction } from "../../aiSystem/orchestrator";

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

    const journal = await DreamJournalEntry.findOne({
      _id: id,
      user: userIdObj,
    })
      .populate("user", "username")
      .sort({ createdAt: -1 });

    if (!journal) {
      throw new NotFoundError("Journal not found");
    }

    const entry = await Production.create({
      userId: userIdObj,
      dreamId: journal._id,
      originalDream: journal.transcript,
      status: "unpublished",
    });

    return entry;
  } catch (error) {
    logger.error("Dream production creation failed:", error);
    throw new Error("Failed to create dream production");
  }
};

export const updateProduction = async ({
  userId,
  productionId,
  updateData,
}: {
  userId: string;
  productionId: string;
  updateData: Partial<IProduction>;
}) => {
  try {
    const userIdObj = new mongoose.Types.ObjectId(userId);
    const productionObjId = new mongoose.Types.ObjectId(productionId);

    const existingProduction = await Production.findOne({
      _id: productionObjId,
      userId: userIdObj,
    });

    if (!existingProduction) {
      throw new NotFoundError("Production not found");
    }

    if (updateData.analysis) {
      existingProduction.analysis = {
        ...existingProduction.analysis,
        ...updateData.analysis,
      };
      delete updateData.analysis;
    }

    if (updateData.story) {
      existingProduction.story = {
        ...existingProduction.story,
        ...updateData.story,
      };
      delete updateData.story;
    }

    if (updateData.play) {
      existingProduction.play = {
        ...existingProduction.play,
        ...updateData.play,
      };
      delete updateData.play;
    }

    Object.assign(existingProduction, updateData);

    const updatedProduction = await existingProduction.save();

    return updatedProduction;
  } catch (error) {
    logger.error("Production update failed:", error);
    throw new Error("Failed to update production");
  }
};

export const processStartProduction = async ({
  userId,
  productionId,
}: {
  userId: string;
  productionId: string;
}) => {
  const userIdObj = new mongoose.Types.ObjectId(userId);
  const productionObjId = new mongoose.Types.ObjectId(productionId);

  const existingProduction = await Production.findOne({
    _id: productionObjId,
    userId: userIdObj,
  });

  if (!existingProduction) {
    throw new NotFoundError("Production not found");
  }

  aiProduction({
    productionId,
    dreamContent: existingProduction.originalDream as string,
  });
};
