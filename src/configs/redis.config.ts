import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL
});

redisClient.on("error", (err) => console.log("redis connection error", err));
redisClient.on("connect", () => console.log("connected to redis"));

export default redisClient;
