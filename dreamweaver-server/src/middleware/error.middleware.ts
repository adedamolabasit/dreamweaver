import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/httpError';
import logger from '../utils/logger';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpError) {
    logger.warn(`Handled error: ${err.message}`);
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
        ...(err.details && { details: err.details })
      }
    });
  }

  logger.error(`Unhandled error: ${err.message}`, { stack: err.stack });
  
  res.status(500).json({
    error: {
      message: 'Internal Server Error'
    }
  });
  
};