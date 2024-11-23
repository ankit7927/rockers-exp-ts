import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types/common";

type FnType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<Response<ApiResponse>>;

const asyncWrapper =
  (fn: FnType) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export default asyncWrapper;
