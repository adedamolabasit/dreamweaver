import { RequestHandler } from "express";
import { responseHandler } from "../../helpers/response";
import {
  processWeaveDream,
  updateProduction,
  processGetUserProduction,
  processGetAllProduction,
} from "../services/production.service";
import {
  processStartProduction,
  processGetProductionById,
} from "../services/production.service";

export const weaveDream: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?.id as string;
    const id = req.params.id;

    const entry = await processWeaveDream({
      userId,
      id,
    });
    res.status(201).json(responseHandler("Dream weaved successfully", entry));
  } catch (error) {
    next(error);
  }
};

export const startProduction: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?.id as string;
    const productionId = req.params.productionId;

    console.log(productionId, "pp");

    processStartProduction({ userId, productionId });

    res.status(201).json(responseHandler("Production initiated!!!"));
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

    res
      .status(200)
      .json(
        responseHandler("Production updated successfully", updatedProduction)
      );
  } catch (error) {
    next(error);
  }
};

export const getUserProductions: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user?.id as string;
    const productions = await processGetUserProduction(userId);
    res.json(responseHandler("User production retrieved", productions));
  } catch (error) {
    next(error);
  }
};

export const getAllProductions: RequestHandler = async (req, res, next) => {
  try {
    const productions = await processGetAllProduction();
    res.json(responseHandler("User production retrieved", productions));
  } catch (error) {
    next(error);
  }
};

export const getProductionById: RequestHandler = async (req, res, next) => {
  try {
    const productionId = req.params.productionId;

    const production = await processGetProductionById(productionId);

    res.json(responseHandler("Story retrieved", production));
  } catch (error) {
    next(error);
  }
};
