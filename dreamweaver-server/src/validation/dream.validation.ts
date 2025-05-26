import Joi from "joi";
import { CreateJournalParams } from "../types";

export const validateJournalEntry = (payload: unknown): CreateJournalParams => {
  const schema = Joi.object({
    userId: Joi.string().hex().length(24).required().messages({
      "string.hex": "User ID must be a valid MongoDB ID",
      "string.length": "User ID must be 24 characters",
      "any.required": "User ID is required",
    }),

    transcript: Joi.string().min(10).max(10000).required().messages({
      "string.empty": "Transcript cannot be empty",
      "string.min": "Transcript must be at least 10 characters",
      "string.max": "Transcript cannot exceed 10,000 characters",
      "any.required": "Transcript is required",
    }),

    audio: Joi.object({
      data: Joi.string().base64().required(),
      mimetype: Joi.string()
        .valid("audio/wav", "audio/mpeg", "audio/webm")
        .required(),
    }).optional(),
  });

  const { error, value } = schema.validate(payload, {
    stripUnknown: true,
    abortEarly: false,
  });

  if (error) {
    throw new Error(
      `Journal validation failed: ${error.details
        .map((d) => d.message)
        .join(", ")}`
    );
  }

  return value;
};
