import { QueueEvents } from "bullmq";
import { connectionOptions } from "./config";
import logger from "../utils/logger";

export const analysisQueueEvents = new QueueEvents("ai-analysis", {
  connection: connectionOptions,
});

export const interpreterQueueEvents = new QueueEvents("ai-interpreter", {
  connection: connectionOptions,
});

export const storyQueueEvents = new QueueEvents("ai-story", {
  connection: connectionOptions,
});

export const playQueueEvents = new QueueEvents("ai-play", {
  connection: connectionOptions,
});

export const visualQueueEvents = new QueueEvents("ai-visual", {
  connection: connectionOptions,
});

export const initializeQueueEventListeners = () => {
  analysisQueueEvents
    .on("completed", ({ jobId }) => {
      logger.info(`Analysis job ${jobId} completed`);
    })
    .on("failed", ({ jobId, failedReason }) => {
      logger.error(`Analysis job ${jobId} failed: ${failedReason}`);
    })
    .on("error", (error) => {
      logger.error("Analysis QueueEvents error:", error);
    });

  interpreterQueueEvents
    .on("completed", ({ jobId }) => {
      logger.info(`Interpretation job ${jobId} completed`);
    })
    .on("failed", ({ jobId, failedReason }) => {
      logger.error(`Interpretation job ${jobId} failed: ${failedReason}`);
    })
    .on("error", (error) => {
      logger.error("Interpretation QueueEvents error:", error);
    });

  storyQueueEvents
    .on("completed", ({ jobId }) => {
      logger.info(`Story generation job ${jobId} completed`);
    })
    .on("failed", ({ jobId, failedReason }) => {
      logger.error(`Story generation job ${jobId} failed: ${failedReason}`);
    })
    .on("error", (error) => {
      logger.error("Story QueueEvents error:", error);
    });

  playQueueEvents
    .on("completed", ({ jobId }) => {
      logger.info(`Play generation job ${jobId} completed`);
    })
    .on("failed", ({ jobId, failedReason }) => {
      logger.error(`Play generation job ${jobId} failed: ${failedReason}`);
    })
    .on("error", (error) => {
      logger.error("Play QueueEvents error:", error);
    });

  visualQueueEvents
    .on("completed", ({ jobId }) => {
      logger.info(`Visual generation job ${jobId} completed`);
    })
    .on("failed", ({ jobId, failedReason }) => {
      logger.error(`Visual generation job ${jobId} failed: ${failedReason}`);
    })
    .on("error", (error) => {
      logger.error("Visual QueueEvents error:", error);
    });

  const keepAliveInterval = setInterval(() => {
    logger.debug("QueueEvents listeners are active...");
  }, 60000);

  const cleanup = () => {
    clearInterval(keepAliveInterval);
    analysisQueueEvents.close();
    interpreterQueueEvents.close();
    storyQueueEvents.close();
    playQueueEvents.close();
    visualQueueEvents.close();
  };

  process.on("SIGTERM", cleanup);
  process.on("SIGINT", cleanup);

  logger.info("All QueueEvent listeners initialized");
};
