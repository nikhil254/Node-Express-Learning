import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { config } from "../../config/config";
import { ResponseWrapper } from "../utils/ResponseWrapper";
import { LogLevel } from "../enum/logLevel.enum";
import { StatusCodes } from 'http-status-codes';

// Error handler middleware
export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Check if the error is an instance of AppError  
  const isAppError = err instanceof AppError;

  // Determine the status code, defaulting to 500 for non-AppError errors
  const statusCode = isAppError ? err.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;

  // Use the error message from the AppError, or a default message
  const message = isAppError
    ? err.message
    : "An unexpected error occurred. Please try again later.";

  // Initialize errorDetails
  let errorDetails;

  if (isAppError && err.errorDetails) {
    // If the error is an instance of AppError, we use the provided error details
    errorDetails = err.errorDetails;
  } else {
    // For other errors, provide stack details if not in production
    if (config.environment !== "production") {
      errorDetails = { stack: err.stack || err.toString() };
    } else {
      // In production, avoid exposing sensitive stack trace details
      errorDetails = null;
    }
  }

  // Determine the appropriate log method based on error's log level
  const logLevel = isAppError ? err.logLevel : 'ERROR'; // Default to 'ERROR' if not an AppError
  
  // Use the log level to determine the appropriate log method
  switch (logLevel) {
    case LogLevel.WARN:
      console.warn("[Warning]:", message, errorDetails);
      break;
    case LogLevel.ERROR:
      console.error("[Error]:", message, errorDetails);
      break;
    case LogLevel.INFO:
      console.info("[Info]:", message, errorDetails);
      break;
    default:
      console.log("[Log]:", message, errorDetails);
      break;
  }  

  // Create a response wrapper for structured error response
  const errorResponse = new ResponseWrapper(err.errorType , message, errorDetails);

  // Send the error response back to the client
  res.status(statusCode).json(errorResponse);
}
