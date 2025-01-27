import { LogLevel } from "../enum/logLevel.enum";
import { ESuccessTypes } from "../enum/successTypes.enum";
import { StatusCodes } from 'http-status-codes';

export const SUCCESS_TYPES_DEFINITION = {
    [ESuccessTypes.DATA_FETCH_SUCCESS]: {
        message: "Data fetched successfully.",
        statusCode: StatusCodes.OK,
        logLevel: LogLevel.INFO,
    },
    [ESuccessTypes.Data_CREATED]: {
        message: "Data created successfully.",
        statusCode: StatusCodes.CREATED,
        logLevel: LogLevel.INFO,
    },
    [ESuccessTypes.DATA_UPDATED]: {
        message: "Data updated successfully.",
        statusCode: StatusCodes.OK,
        logLevel: LogLevel.INFO,
    },
    [ESuccessTypes.DATA_DELETED]: {
        message: "Data deleted successfully.",
        statusCode: StatusCodes.OK,
        logLevel: LogLevel.INFO,
    },
};
