import { initializeQueueEventListeners } from '../queues/events';
import logger from '../utils/logger';

export const startEventListeners = () => {
  try {
    initializeQueueEventListeners();
    logger.info('Queue event listeners started successfully');
  } catch (error) {
    logger.error('Failed to start queue event listeners:', error);
    process.exit(1);
  }
};