import { Request, Response } from 'express';
import { ResponseWrapper } from '../../common/response-wrapper/response-wrapper';
import { AppError } from '../../common/errorHandler/appError';
import { ErrorTypes } from '../../common/errorHandler/errorTypes.constants';

export const healthCheck = (req: Request, res: Response) => {
  throw new AppError(
    ErrorTypes.GENERIC_ERROR, // Error type
    'Something went wrong during health check.', // Error message
    { e: 'dkfhjd' } // Optional error details
  );
  const healthData = {
    status: 'UP',
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  };
  // res.status(500).json(new ResponseWrapper({ data: healthData, error:{}, message: 'Health check successful', statusCode: 200 }));
};