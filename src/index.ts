import express, { Express } from "express";
import errorMiddleware from "./middleware/error.middleware";
import validateEnv from "./utils/env.validator";
import { configDotenv } from "dotenv";
import redisClient from "./configs/redis.config";
import mongoose from "mongoose";
import connectDB from "./configs/db.config";
import morgan from "morgan";
import apiRouter from "./routes/api.router";

configDotenv();
validateEnv();

const app: Express = express();

// middlewares
app.use(errorMiddleware);
app.use(express.json());
app.use(errorMiddleware);
if (process.env.NODE_ENV == "dev") {
  app.use(morgan("dev"));
}

app.use("/api", apiRouter);

connectDB();

mongoose.connection.once("open", async () => {
  console.log("connected to database");
  await redisClient.connect();
  app.listen(process.env.SERVER_PORT, () => {
    console.log(`server started on ${process.env.SERVER_PORT}`);
  });
});
