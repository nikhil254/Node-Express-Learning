import { asyncLocalStorage } from '../../utils/asyncStorage';

export class ResponseWrapper {
  statusCode: number;
  message: string;
  data: any | null;
  error: any | null;
  timestamp: string;
  requestId: string;
  pathUrl: string;
  reqMethod: string;

  constructor({
    data,
    error,
    message,
    statusCode,
    request, // Add the request object
  }: {
    data: any | null;
    error: any | null;
    message: string;
    statusCode: number;
    request: any; // Request object to extract method, url, and headers
  }) {
    // Get the request metadata from the request object or asyncLocalStorage
    const store = asyncLocalStorage.getStore() || new Map<string, any>();
    this.data = data ?? null;
    this.error = error ?? null;
    this.message = message;
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();
    this.requestId = store.get('requestId') || request.headers['x-request-id'] || 'UNKNOWN';
    this.pathUrl = request.originalUrl || 'UNKNOWN';
    this.reqMethod = request.method || 'UNKNOWN';
  }

  // Serialize the response object for JSON output
  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      data: this.data,
      error: this.error,
      timestamp: this.timestamp,
      requestId: this.requestId,
      pathUrl: this.pathUrl,
      reqMethod: this.reqMethod,
    };
  }
}