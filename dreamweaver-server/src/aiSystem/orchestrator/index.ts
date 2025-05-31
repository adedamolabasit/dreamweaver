import { Production } from "../../models/production.scence.model";
import {
  analysisQueue,
  interpreterQueue,
  storyQueue,
  playQueue,
  visualQueue,
} from "../../queues/aiQueues";
import {
  analysisQueueEvents,
  interpreterQueueEvents,
  storyQueueEvents,
  playQueueEvents,
  visualQueueEvents,
} from "../../queues/events";
import logger from "../../utils/logger";

export const aiProduction = async ({
  productionId,
  dreamContent,
}: {
  productionId: string;
  dreamContent: string;
}) => {
  try {
    await Production.findByIdAndUpdate(productionId, { status: "processing" });

    const analysisJob = await analysisQueue.add("analyze", {
      productionId,
      dreamContent,
    });
    const { results: archetypeAnalysis } = await analysisJob.waitUntilFinished(
      analysisQueueEvents
    );

    await Production.findByIdAndUpdate(productionId, {
      progress: 25,
      status: "archetype_complete",
    });

    const interpreterJob = await interpreterQueue.add("interpret", {
      productionId,
      dreamContent,
      analysisResults: archetypeAnalysis,
    });
    const { results: interpretation } = await interpreterJob.waitUntilFinished(
      interpreterQueueEvents
    );

    await Production.findByIdAndUpdate(productionId, {
      progress: 50,
      status: "interpretation_complete",
    });

    const storyJob = await storyQueue.add("generate-story", {
      productionId,
      interpreterResults: interpretation,
    });
    const { results: storyElements } = await storyJob.waitUntilFinished(
      storyQueueEvents
    );

    await Production.findByIdAndUpdate(productionId, {
      progress: 75,
      status: "story_complete",
    });

    const playJob = await playQueue.add("generate-play", {
      productionId,
      storyElements,
    });
    const { results: playElements } = await playJob.waitUntilFinished(
      playQueueEvents
    );

    await Production.findByIdAndUpdate(productionId, {
      progress: 85,
      status: "play_complete",
    });

    const visualJob = await visualQueue.add("generate-visuals", {
      productionId,
      story: storyElements,
    });
    const { results: visuals } = await visualJob.waitUntilFinished(
      visualQueueEvents
    );

    const updatedProduction = await Production.findByIdAndUpdate(
      productionId,
      {
        archetypeAnalysis,
        interpretation,
        story: storyElements,
        play: playElements,
        visuals,
        progress: 100,
        status: "published",
        completedAt: new Date(),
      },
      { new: true }
    );

    logger.info(`AI processing completed for production ${productionId}`);
    return updatedProduction;
  } catch (error: any) {
    logger.error(`AI processing failed for production ${productionId}:`, error);
    await Production.findByIdAndUpdate(productionId, {
      status: "failed",
      error: error.message,
    });
    throw error;
  }
};
