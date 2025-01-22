import StatusCodes from "http-status";
import { createKeyMap } from "../../utils/object.utils";

// Error definitions with added default messages and codes
export const ErrorDefinitions = {
  VALIDATION_ERROR: {
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    message: "Validation error occurred.",
  },
  NOT_FOUND_ERROR: {
    statusCode: StatusCodes.NOT_FOUND,
    isOperational: true,
    message: "Resource not found.",
  },
  AUTHENTICATION_ERROR: {
    statusCode: StatusCodes.UNAUTHORIZED,
    isOperational: true,
    message: "Authentication failed.",
  },
  AUTHORIZATION_ERROR: {
    statusCode: StatusCodes.FORBIDDEN,
    isOperational: true,
    message: "Access is forbidden.",
  },
  TOO_MANY_REQUEST_ERROR: {
    statusCode: StatusCodes.TOO_MANY_REQUESTS,
    isOperational: true,
    message: "Too many requests, please try again later.",
  },
  DATABASE_ERROR: {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    isOperational: false,
    message: "A database error occurred.",
  },
  GENERIC_ERROR: {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    isOperational: false,
    message: "An unexpected error occurred.",
  },
} as const;

export const ErrorTypes = createKeyMap(ErrorDefinitions);