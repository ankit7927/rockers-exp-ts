import { Request, Response, NextFunction } from "express";
import redisClient from "../../configs/redis.config";
import ResponseData from "../../utils/response";

const songMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const songId: string = req.params["songId"];
  const songCache = await redisClient.get(songId);
  if (songCache)
    return ResponseData(res, "sending cache song", JSON.parse(songCache));
  else next();
};

export default songMiddleware;
