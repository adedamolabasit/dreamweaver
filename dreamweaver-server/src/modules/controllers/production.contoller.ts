import { RequestHandler } from "express";
import { responseHandler } from "../../helpers/response";
import { processWeaveDream, updateProduction } from "../services/production.service";

export const weaveDream: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?.id as string;
    const id = req.params.id;

    await processWeaveDream({
      userId,
      id,
    });
    res.status(201).json(responseHandler("Dream weaved successfully"));
  } catch (error) {
    next(error);
  }
};

export const updateDreamProduction: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?.id as string;
    const productionId = req.params.id;
    const updateData = req.body;

    const updatedProduction = await updateProduction({
      userId,
      productionId,
      updateData,
    });
    
    res.status(200).json(responseHandler("Production updated successfully", updatedProduction));
  } catch (error) {
    next(error);
  }
};