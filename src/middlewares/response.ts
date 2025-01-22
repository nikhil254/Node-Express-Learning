import { asyncLocalStorage } from '../utils/asyncStorage';
import { StatusCodes } from 'http-status-codes';

interface ResponseData {
  data: any;
  error: any;
  message: string;
  statusCode: number;
}

export class ResponseWrapper {
  data: any;
  error?: any;
  message: string;
  status: string;
  statusCode: number;
  reqMethod: string;
  pathUrl: string;
  timeStamp: string;

  constructor({ data, error, message, statusCode }: ResponseData) {
    const store = asyncLocalStorage.getStore() || new Map<string, any>();

    this.data = data ?? null;
    this.error = error ?? null;
    this.message = message;
    this.statusCode = statusCode || store.get('statusCode') || StatusCodes.OK;
    this.status = this.statusCode < 400 ? 'OK' : 'ERROR';
    this.reqMethod = store.get('reqMethod') || 'UNKNOWN';
    this.pathUrl = store.get('pathUrl') || 'UNKNOWN';
    this.timeStamp = store.get('timeStamp') || new Date().toISOString();
  }
}