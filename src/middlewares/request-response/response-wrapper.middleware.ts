import { asyncLocalStorage } from '../../utils/asyncStorage';
import StatusCodes from 'http-status';
import { ResponseData } from './request-response.types';

export class ResponseWrapper {
  data: any;
  error?: any;
  message: string;
  statusCode: number;
  reqMethod: string;
  pathUrl: string;
  timeStamp: string;

  constructor({ data, error, message, statusCode }: ResponseData) {
    const store = asyncLocalStorage.getStore() || new Map<string, any>();

    this.data = data ?? null;
    this.error = error ?? null;
    this.message = message;
    this.statusCode =
      statusCode || StatusCodes.OK;
    this.reqMethod = store.get('reqMethod') || 'UNKNOWN';
    this.pathUrl = store.get('pathUrl') || 'UNKNOWN';
    this.timeStamp = store.get('timeStamp') || new Date().toISOString();
  }

  // Serialize the response object for JSON output
  toJSON() {
    return {
      data: this.data,
      error: this.error,
      message: this.message,
      statusCode: this.statusCode,
      reqMethod: this.reqMethod,
      pathUrl: this.pathUrl,
      timeStamp: this.timeStamp,
    };
  }
}