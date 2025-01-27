import { createNamespace } from "cls-hooked";
import { NextFunction, Request, Response } from "express";

const responseInterceptor = createNamespace("responseInterceptor");

export const resInterceptor = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const reqMethod = req.method;
  const pathUrl = req.originalUrl;

  const timeStamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  responseInterceptor.run(() => {
    responseInterceptor.set("reqMethod", reqMethod);
    responseInterceptor.set("timeStamp", timeStamp);
    responseInterceptor.set("pathUrl", pathUrl);

    next();
  });
};
