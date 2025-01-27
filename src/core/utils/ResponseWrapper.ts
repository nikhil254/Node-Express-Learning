import { getNamespace } from "cls-hooked";
import { getReasonPhrase } from "http-status-codes";
import { ESuccessTypes } from "../enum/successTypes.enum";
import { EErrorTypes } from "../enum/errorTypes.enum";
import { SUCCESS_TYPES_DEFINITION } from "../constants/successTypesDefination.constant";
import { ERROR_TYPES_DEFINATION } from "../constants/errorTypesDefination.constant";
import { EResponseTypes } from "../enum/responseTypes.enum";

export class ResponseWrapper {
  public message: string;
  public data: any;
  public error: any;
  public status: string;
  public statusCode: number;
  public reqMethod: string;
  public timeStamp: string;
  public pathUrl: string;

  constructor(
    responseTypeSpecific: ESuccessTypes | EErrorTypes, // success or error type
    message: string,
    dataOrError: any // this could be data (for success) or error details (for errors)
  ) {
    const responseInterceptor = getNamespace("responseInterceptor");    
    const responseType =
    Object.values(ESuccessTypes).includes(responseTypeSpecific as ESuccessTypes)
      ? EResponseTypes.SUCCESS
      : EResponseTypes.ERROR;
    this.message = message || (responseType === EResponseTypes.SUCCESS ? "Operation successful" : "An error occurred");
    
    if (responseType === EResponseTypes.SUCCESS) {
      const successConfig = SUCCESS_TYPES_DEFINITION[responseTypeSpecific as ESuccessTypes];
      this.data = dataOrError;
      this.statusCode = successConfig.statusCode;
      this.status = getReasonPhrase(this.statusCode);
    } else {
      const errorConfig = ERROR_TYPES_DEFINATION[responseTypeSpecific as EErrorTypes];
      this.error = dataOrError; // error details
      this.statusCode = errorConfig.statusCode;
      this.status = getReasonPhrase(this.statusCode);
    }
    this.reqMethod = responseInterceptor?.get("reqMethod") || "N/A";
    this.timeStamp = responseInterceptor?.get("timeStamp") || new Date().toISOString();
    this.pathUrl = responseInterceptor?.get("pathUrl") || "N/A";
  }
}
