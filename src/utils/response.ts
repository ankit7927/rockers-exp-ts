import { Response } from "express";
import { ApiResponse } from "../types/common";

const ResponseData = (
  response: Response,
  message: string,
  data?: unknown,
  status: number = 200
): Response<ApiResponse> => {
  return response.status(status).json({
    success: true,
    message,
    data: data
  });
};

export default ResponseData;
