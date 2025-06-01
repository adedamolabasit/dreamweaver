import IORedis from "ioredis";

export const connectionOptions = new IORedis({
  host: "redis-10679.c276.us-east-1-2.ec2.redns.redis-cloud.com",
  port: parseInt(process.env.REDIS_PORT || "6379", 10),
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

export const workerConfig = {
  connection: connectionOptions,
  concurrency: 3,
  removeOnComplete: { count: 100 },
  removeOnFail: { count: 100 },
  lockDuration: 300000,
};
