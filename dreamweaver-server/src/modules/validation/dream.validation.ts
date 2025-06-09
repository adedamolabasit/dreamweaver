import Joi from "joi";
// import { CreateJournalParams, UpdateJournalParams } from "../../types";

export interface CreateJournalParams {
  userId: string;
  transcript: string;
}

export interface UpdateJournalParams {
  transcript: string;
}

export const validateJournalEntry = (payload: unknown): CreateJournalParams => {
  const schema = Joi.object({
    transcript: Joi.string().min(10).max(10000).required().messages({
      "string.empty": "Transcript cannot be empty",
      "string.min": "Transcript must be at least 10 characters",
      "string.max": "Transcript cannot exceed 10,000 characters",
      "any.required": "Transcript is required",
    })
  });

  const { error, value } = schema.validate(payload, {
    stripUnknown: true,
    abortEarly: false,
  });

  if (error) throw new Error(`Validation failed: ${error.details.map(d => d.message).join(", ")}`);
  return value;
};

export const validateJournalUpdate = (payload: unknown): UpdateJournalParams => {
  const schema = Joi.object({
    transcript: Joi.string().min(10).max(10000).required().messages({
      "string.empty": "Transcript cannot be empty",
      "string.min": "Transcript must be at least 10 characters",
      "string.max": "Transcript cannot exceed 10,000 characters",
      "any.required": "Transcript is required",
    })
  });

  const { error, value } = schema.validate(payload, {
    stripUnknown: true,
    abortEarly: false,
  });

  if (error) throw new Error(`Validation failed: ${error.details.map(d => d.message).join(", ")}`);
  return value;
};