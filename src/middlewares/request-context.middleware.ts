import { asyncLocalStorage } from '../utils/asyncStorage';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export const requestContextMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Create a new request context map
  const context = new Map<string, any>();

  // Add common request metadata
  context.set('requestId', req.headers['x-request-id'] || uuidv4());
  context.set('pathUrl', req.originalUrl);
  context.set('reqMethod', req.method);
  context.set('timeStamp', new Date().toISOString());
  context.set('clientIp', req.ip);

  // Add requestId to the response headers
  res.setHeader('x-request-id', context.get('requestId'));

  // Optional: Log request context for debugging (only in development)
  if (process.env.NODE_ENV === 'development') {
    console.debug('Request Context:', Object.fromEntries(context));
  }

  // Attach the context to AsyncLocalStorage
  asyncLocalStorage.run(context, () => {
    next();
  });
};