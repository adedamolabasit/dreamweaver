export class HttpError extends Error {
  public readonly statusCode: number;
  public readonly details?: any;

  constructor(statusCode: number, message: string, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    
    // Maintain proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }
    
    this.name = this.constructor.name;
  }
}

// Common error types
export class BadRequestError extends HttpError {
  constructor(message = "Bad Request", details?: any) {
    super(400, message, details);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = "Unauthorized", details?: any) {
    super(401, message, details);
  }
}

export class NotFoundError extends HttpError {
  constructor(message = "Not Found", details?: any) {
    super(404, message, details);
  }
}

export class InternalServerError extends HttpError {
  constructor(message = "Internal Server Error", details?: any) {
    super(500, message, details);
  }
}