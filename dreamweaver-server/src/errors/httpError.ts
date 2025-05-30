export class HttpError extends Error {
  public readonly statusCode: number;
  public readonly details?: any;

  constructor(statusCode: number, message: string, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }
    
    this.name = this.constructor.name;
  }
}

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

export class ForbiddenError extends HttpError {
  constructor(message = "Forbidden", details?: any) {
    super(403, message, details);
  }
}

export class NotFoundError extends HttpError {
  constructor(message = "Not Found", details?: any) {
    super(404, message, details);
  }
}

export class ConflictError extends HttpError {
  constructor(message = "Conflict", details?: any) {
    super(409, message, details);
  }
}

export class InternalServerError extends HttpError {
  constructor(message = "Internal Server Error", details?: any) {
    super(500, message, details);
  }
}

export class UnprocessableEntityError extends HttpError {
  constructor(message = "Unprocessable Entity", details?: any) {
    super(422, message, details);
  }
}

export class TooManyRequestsError extends HttpError {
  constructor(message = "Too Many Requests", details?: any) {
    super(429, message, details);
  }
}