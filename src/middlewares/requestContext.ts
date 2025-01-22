import { asyncLocalStorage } from '../utils/asyncStorage';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export const requestContextMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const context = new Map<string, any>();
  context.set('requestId', req.headers['x-request-id'] || uuidv4());
  context.set('pathUrl', req.originalUrl);
  context.set('reqMethod', req.method);
  context.set('timeStamp', new Date().toISOString());

  asyncLocalStorage.run(context, () => {
    next();
  });
};