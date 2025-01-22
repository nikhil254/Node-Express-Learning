import { Request, Response } from 'express';
import { ResponseWrapper } from '../../common/response-wrapper/response-wrapper';

export const healthCheck = (req: Request, res: Response) => {
  const healthData = {
    status: 'UP',
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  };
  res.status(500).json(new ResponseWrapper({ data: healthData, message: 'Health check successful', statusCode: 200 }));
};