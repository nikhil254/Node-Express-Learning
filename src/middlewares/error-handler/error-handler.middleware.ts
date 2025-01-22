import { NextFunction, Request, Response } from "express";
import { AppError } from "../../common/errorHandler/appError";
import StatusCodes from "http-status";

export const errorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // Build the base error response structure
  const errorResponse: Record<string, any> = {
    error: {
      message: "An unexpected error occurred. Please try again later.",
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      status: StatusCodes[StatusCodes.INTERNAL_SERVER_ERROR],
    },
  };

  if (error instanceof AppError) {
    // Operational error
    errorResponse.error = {
      message: error.message,
      type: error.type,
      statusCode: error.statusCode,
      status: StatusCodes[error.statusCode as keyof typeof StatusCodes] || "Unknown",
      details: error.error,
    };

    // Log the operational error
    console.error(`[${new Date().toISOString()}] ${request.method} ${request.url} - ${error.message}`);
    response.status(error.statusCode).json(errorResponse);
  } else {
    // Unexpected error
    if (process.env.NODE_ENV === "development" && error.stack) {
      errorResponse.error.stack = error.stack; // Include stack trace in development
    }

    console.error(`[${new Date().toISOString()}] ${request.method} ${request.url} - ${error.message || "Unknown error"}`);
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
};