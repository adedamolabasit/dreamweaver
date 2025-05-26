import Joi from 'joi';

export const validateUser = (
  payload: unknown
): {
  username: string;
  name: string;
  walletId?: string;
} => {
  const schema = Joi.object({
    username: Joi.string()
      .min(3)
      .max(30)
      .required()
      .pattern(/^[a-zA-Z0-9_]+$/)
      .messages({
        'string.empty': 'Username cannot be empty',
        'string.min': 'Username must be at least 3 characters',
        'string.max': 'Username cannot exceed 30 characters',
        'string.pattern.base': 'Username can only contain letters, numbers and underscores',
        'any.required': 'Username is required'
      }),

    name: Joi.string()
      .max(100)
      .required()
      .messages({
        'string.empty': 'Name cannot be empty',
        'string.max': 'Name cannot exceed 100 characters',
        'any.required': 'Name is required'
      }),

    walletId: Joi.string()
      .uuid()
      .optional()
  });

  const { error, value } = schema.validate(payload, {
    stripUnknown: true,
    abortEarly: false
  });

  if (error) {
    throw new Error(
      `User validation failed: ${error.details.map(d => d.message).join(', ')}`
    );
  }

  return value;
};