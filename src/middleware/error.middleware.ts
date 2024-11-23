import { NextFunction, Request, Response } from "express";

const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({
    success: false,
    error: error.message || "Internal Server Error"
  });
};

export default errorMiddleware;
