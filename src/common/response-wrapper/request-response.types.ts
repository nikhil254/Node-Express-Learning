export interface ResponseData {
    data: any;
    error?: any;
    message: string;
    statusCode: number;
    reqMethod: string;
    pathUrl: string;
    timeStamp: string;
  }