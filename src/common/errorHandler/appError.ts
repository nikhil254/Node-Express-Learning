import { ErrorTypes, ErrorDefinitions } from "../errorHandler/errorTypes.constants";
import { TErrorTypes } from "./error.types";

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly type: string;
  public readonly error: any;
  public readonly timestamp: Date;

  constructor(
    type: TErrorTypes = ErrorTypes.AUTHENTICATION_ERROR,
    message?: string,
    details?: any
  ) {
    const errorType = ErrorDefinitions[type] || ErrorDefinitions[ErrorTypes.GENERIC_ERROR];
    const defaultMessage = errorType.message;
    super(message || defaultMessage);

    this.name = this.constructor.name;
    this.statusCode = errorType.statusCode;
    this.isOperational = errorType.isOperational;
    this.type = type;
    this.error = details || null;
    this.timestamp = new Date();

    // Capturing stack trace for better debugging (only if available in the environment)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}