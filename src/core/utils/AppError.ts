import { ERROR_TYPES_DEFINATION } from "../constants/errorTypesDefination.constant";
import { EErrorTypes } from "../enum/errorTypes.enum";

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public errorDetails: any;
  public errorCode: string;
  public logLevel: string;
  public errorType: EErrorTypes;

  constructor(errorType: EErrorTypes, errorMessage: string, errorDetails: any = null) {
    const errorConfig = ERROR_TYPES_DEFINATION[errorType];

    if (!errorConfig) {
      const internalError = ERROR_TYPES_DEFINATION.INTERNAL_SERVER_ERROR;
      super(internalError.defaultMessage);
      this.statusCode = internalError.statusCode;
      this.isOperational = internalError.isOperational;
      this.errorCode = internalError.errorCode;
      this.logLevel = internalError.logLevel;
    } else {
      super(errorMessage || errorConfig.defaultMessage);
      this.statusCode = errorConfig.statusCode;
      this.isOperational = errorConfig.isOperational;
      this.errorCode = errorConfig.errorCode;
      this.logLevel = errorConfig.logLevel;
    }
    this.errorType = errorType;
    this.errorDetails = errorDetails || null;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    console.log(errorDetails);
    
  }
}
