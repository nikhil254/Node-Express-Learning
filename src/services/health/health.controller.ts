import { Request, Response } from 'express';
import { config } from '../../config/config';
import { ResponseWrapper } from '../../core/utils/ResponseWrapper';
import { ESuccessTypes } from '../../core/enum/successTypes.enum';

export const healthCheck = (req: Request, res: Response) => {
  const healthData = {
    status: 'UP',
    uptime: process.uptime(),
    environment: config.environment || 'development',
  };  
  res.send(new ResponseWrapper(ESuccessTypes.DATA_FETCH_SUCCESS, 'Data Fetched Successfully', healthData));
  // throw new AppError(EErrorTypes.VALIDATION_ERROR, 'Data Lost', healthData)
};
