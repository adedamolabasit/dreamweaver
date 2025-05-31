import app from "./app";
import { connectDB } from "./config/db";
import logger from "./utils/logger";
import { startEventListeners } from "./workers/start";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();

    startEventListeners();

    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
}

process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Rejection:", err);
  process.exit(1);
});

startServer();
