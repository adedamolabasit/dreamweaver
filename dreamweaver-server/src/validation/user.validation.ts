import Joi from "joi";
// import { RegisterUserParams } from "../../types";

export interface RegisterUserParams {
  walletAddress: string;
}


export const validateUser = (payload: unknown): RegisterUserParams => {
  const schema = Joi.object({
    walletAddress: Joi.string().required(),
  });

  const { value } = schema.validate(payload, {
    stripUnknown: true,
    abortEarly: false,
  });

  return value;
};

export const validateUpdateUser = (payload: unknown) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30),
    url: Joi.string().uri(),
    lastSeen: Joi.date(),
  });

  const { error, value } = schema.validate(payload, {
    stripUnknown: true,
    abortEarly: false,
  });

  if (error) {
    throw new Error(
      `User validation failed: ${error.details
        .map((d) => d.message)
        .join(", ")}`
    );
  }

  return value;
};
