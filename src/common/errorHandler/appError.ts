import { ErrorTypes, ErrorDefinitions } from "../errorHandler/errorTypes.constants";
import { TErrorTypes } from "./error.types";
import { ResponseWrapper } from "../response-wrapper/response-wrapper"; // Import ResponseWrapper

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly type: string;
  public readonly error: any;
  public readonly data: any; // Adding 'data' field to match ResponseWrapper
  public readonly timestamp: Date;
  public readonly message: string;

  constructor(
    type: TErrorTypes = ErrorTypes.AUTHENTICATION_ERROR,
    message?: string,
    details?: any,
    data?: any // Adding data for success scenario
  ) {
    const errorType = ErrorDefinitions[type] || ErrorDefinitions[ErrorTypes.GENERIC_ERROR];
    const defaultMessage = errorType.message;
    super(message || defaultMessage);

    this.name = this.constructor.name;
    this.statusCode = errorType.statusCode;
    this.isOperational = errorType.isOperational;
    this.type = type;
    this.error = details || null;
    this.data = data || null; // Assign data
    this.timestamp = new Date();
    this.message = message || defaultMessage;

    // Capturing stack trace for better debugging (only if available in the environment)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  // Convert the AppError to a consistent response structure
  toJSON() {
    return new ResponseWrapper({
      data: this.data, 
      error: this.error,
      message: this.message,
      statusCode: this.statusCode,
    }).toJSON();
  }
}