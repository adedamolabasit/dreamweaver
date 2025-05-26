import Joi from "joi";

export const validateJournalEntry = (
  payload: unknown
): {
  transcript: string;
  audio?: {
    data: string;
    mimetype: string;
  };
} => {
  const schema = Joi.object({
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
      `Validation failed: ${error.details.map((d) => d.message).join(", ")}`
    );
  }

  return value;
};
