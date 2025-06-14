import app from "./app";
import { connectDB } from "./config/db";
import logger from "./utils/logger";
import { startEventListeners } from "./workers/start";
import { connectionOptions } from "./queues/config";

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

async function logMyIp() {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const { ip } = await res.json();
    logger.info(`This service’s outbound IP is ${ip}`);
  } catch (err) {
    logger.error("Failed to fetch public IP:", err);
  }
}

async function startServer() {
  try {
    await logMyIp();
    await connectDB();
    startEventListeners();

    app.listen(PORT, "0.0.0.0", () => {
      logger.info(`Server running on port ${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
}

const gracefulShutdown = async () => {
  try {
    logger.info("Disconnecting Redis client...");
    await connectionOptions.quit();
    logger.info("Redis disconnected");
    process.exit(0);
  } catch (err) {
    logger.info("Error disconnecting Redis:", err);
    process.exit(1);
  }
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Rejection:", err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
  gracefulShutdown();
});
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled rejection:", reason);
  gracefulShutdown();
});

startServer();
