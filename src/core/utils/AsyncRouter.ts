import { Router, Request, Response, NextFunction } from "express";

export class AsyncRouter {
  private router = Router();

  private addRoute(
    method: "get" | "post" | "put" | "delete",
    path: string,
    middlewares: Array<(req: Request, res: Response, next: NextFunction) => void>,
    handler: (req: Request, res: Response, next: NextFunction) => Promise<void> | void
  ) {
    const wrappedHandler = this.wrapAsync(handler);
    this.router[method](path, ...middlewares, wrappedHandler);
  }

  private wrapAsync(
    handler: (req: Request, res: Response, next: NextFunction) => Promise<void> | void
  ) {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(handler(req, res, next))
        .catch((error) => {
          console.error(`Error in route ${req.method} ${req.originalUrl}:`, error);
          next(error);
        });
    };
  }

  get(path: string, middlewares: any[] = [], handler: any) {
    this.addRoute("get", path, middlewares, handler);
  }

  post(path: string, middlewares: any[] = [], handler: any) {
    this.addRoute("post", path, middlewares, handler);
  }

  put(path: string, middlewares: any[] = [], handler: any) {
    this.addRoute("put", path, middlewares, handler);
  }

  delete(path: string, middlewares: any[] = [], handler: any) {
    this.addRoute("delete", path, middlewares, handler);
  }

  getRouter() {
    return this.router;
  }
}
