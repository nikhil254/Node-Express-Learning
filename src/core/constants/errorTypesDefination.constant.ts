import { StatusCodes } from 'http-status-codes';
import { LogLevel } from '../enum/logLevel.enum';
import { EErrorTypes as ErrorTypes } from '../enum/errorTypes.enum';

export const ERROR_TYPES_DEFINATION = {
  [ErrorTypes.VALIDATION_ERROR]: {
    statusCode: StatusCodes.BAD_REQUEST,
    isOperational: true,
    defaultMessage: "Please fix this",
    errorCode: "VALIDATION_FAILED",
    logLevel: LogLevel.WARN,
  },
  [ErrorTypes.AUTHORIZATION_ERROR]: {
    statusCode: StatusCodes.UNAUTHORIZED,
    isOperational: true,
    defaultMessage: "You are not authorized to perform this action",
    errorCode: "UNAUTHORIZED_ACCESS",
    logLevel: LogLevel.ERROR,
  },
  [ErrorTypes.NOT_FOUND_ERROR]: {
    statusCode: StatusCodes.NOT_FOUND,
    isOperational: false,
    defaultMessage: "Resource not found",
    errorCode: "RESOURCE_NOT_FOUND",
    logLevel: LogLevel.INFO,
  },
  [ErrorTypes.INTERNAL_SERVER_ERROR]: {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    isOperational: false,
    defaultMessage: "An unexpected error occurred",
    errorCode: "INTERNAL_ERROR",
    logLevel: LogLevel.ERROR,
  },
};
