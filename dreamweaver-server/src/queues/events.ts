import { QueueEvents } from "bullmq";
import { connectionOptions } from "./config";
import logger from "../utils/logger";

const createQueueEvents = (queueName: string) => {
  const queueEvents = new QueueEvents(queueName, { connection: connectionOptions });

  queueEvents.on("completed", ({ jobId }) => {
    logger.info(`${queueName} job ${jobId} completed`);
  });

  queueEvents.on("failed", ({ jobId, failedReason }) => {
    logger.error(`${queueName} job ${jobId} failed: ${failedReason}`);
  });

  queueEvents.on("error", (error) => {
    logger.error(`${queueName} QueueEvents error:`, error);
  });

  return queueEvents;
};

export const analysisQueueEvents = createQueueEvents("ai-analysis");
export const interpreterQueueEvents = createQueueEvents("ai-interpreter");
export const storyQueueEvents = createQueueEvents("ai-story");
export const playQueueEvents = createQueueEvents("ai-play");
export const visualQueueEvents = createQueueEvents("ai-visual");

export const initializeQueueEventListeners = () => {
  logger.info("All QueueEvent listeners initialized");

  const keepAliveInterval = setInterval(() => {
    logger.debug("QueueEvents listeners are active...");
  }, 60000);

  const cleanup = async () => {
    clearInterval(keepAliveInterval);
    await Promise.all([
      analysisQueueEvents.close(),
      interpreterQueueEvents.close(),
      storyQueueEvents.close(),
      playQueueEvents.close(),
      visualQueueEvents.close(),
    ]);
    logger.info("QueueEvents closed gracefully.");
  };

  process.on("SIGTERM", cleanup);
  process.on("SIGINT", cleanup);
};
