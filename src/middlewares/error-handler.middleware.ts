import { NextFunction, Request, Response } from "express";
import { ResponseWrapper } from "../common/response-wrapper/response-wrapper"; // Import ResponseWrapper
import StatusCodes from "http-status";
import { asyncLocalStorage } from '../utils/asyncStorage'; // Import asyncLocalStorage

export const errorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // Build the error response
  const errorResponse = {
    data: null,
    error: error instanceof Error ? { message: error.message, stack: error.stack } : error,
    message: error.message || "Internal Server Error",
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    request, // Pass the request object to ResponseWrapper
  };

  // Log the error for debugging purposes
  console.error(`[${new Date().toISOString()}] ${request.method} ${request.url} - ${error.message}`);

  // Send the error response in the standardized format
  response.status(errorResponse.statusCode).json(new ResponseWrapper(errorResponse).toJSON());
};