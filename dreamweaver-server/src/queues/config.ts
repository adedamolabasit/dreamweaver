import { RedisOptions, WorkerOptions } from "bullmq";

export const connectionOptions: RedisOptions = {
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT as string),
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
};

export const workerConfig: WorkerOptions = {
  connection: connectionOptions,
  concurrency: 3,
  removeOnComplete: { count: 100 },
  removeOnFail: { count: 100 },
  lockDuration: 300000,
};
