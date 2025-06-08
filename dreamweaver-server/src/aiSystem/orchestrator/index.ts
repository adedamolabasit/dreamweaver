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
import mongoose from "mongoose";
import { StoryVisuals } from "../service/visualAgent";

export const aiProduction = async ({
  productionId,
  dreamContent,
}: {
  productionId: string;
  dreamContent: string;
}) => {
  await Production.findByIdAndUpdate(productionId, {
    status: "processing",
    progress: 0,
    error: null,
    updatedAt: new Date(),
  });

  try {
    // 1. Archetype Analysis
    const analysisJob = await analysisQueue.add("analyze", {
      productionId,
      dreamContent,
    });
    const { results: archetypeAnalysis } = await analysisJob.waitUntilFinished(
      analysisQueueEvents,
      120000 // Increased to 2 minutes
    );

    await Production.findByIdAndUpdate(productionId, {
      analysis: archetypeAnalysis,
      progress: 15,
      status: "archetype_complete",
      updatedAt: new Date(),
    });

    // 2. Dream Interpretation
    const interpreterJob = await interpreterQueue.add("interpret", {
      productionId,
      dreamContent,
      analysisResults: archetypeAnalysis,
    });
    const { results: interpretation } = await interpreterJob.waitUntilFinished(
      interpreterQueueEvents,
      120000 // Increased to 2 minutes
    );

    await Production.findByIdAndUpdate(productionId, {
      interpretation,
      progress: 38,
      status: "interpretation_complete",
      updatedAt: new Date(),
    });

    // 3. Story Generation
    const storyJob = await storyQueue.add(
      "generate-story",
      {
        productionId,
        interpreterResults: interpretation,
      },
      {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 5000,
        },
      }
    );
    const { results: storyElements } = await storyJob.waitUntilFinished(
      storyQueueEvents,
      120000 // Increased to 2 minutes
    );

    await Production.findByIdAndUpdate(productionId, {
      story: storyElements,
      progress: 67,
      status: "story_complete",
      updatedAt: new Date(),
    });

    // 4. Play Generation
    const playJob = await playQueue.add(
      "generate-play",
      {
        productionId,
        storyElements,
      },
      {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 5000,
        },
      }
    );
    const { results: playElements } = await playJob.waitUntilFinished(
      playQueueEvents,
      120000 // Increased to 2 minutes
    );

    await Production.findByIdAndUpdate(productionId, {
      play: playElements,
      progress: 92,
      status: "play_complete",
      updatedAt: new Date(),
    });

    // 5. Visual Generation (already 5 mins)
    let visuals;
    try {
      const visualJob = await visualQueue.add(
        "generate-visuals",
        {
          productionId,
          story: storyElements,
        },
        {
          attempts: 3,
          backoff: {
            type: "exponential",
            delay: 5000,
          },
        }
      );

      visuals = (await visualJob.waitUntilFinished(visualQueueEvents, 300000))
        .results;
    } catch (visualError) {
      await Production.findByIdAndUpdate(productionId, {
        status: "partially_completed",
        error: "Visual generation failed: ",
        updatedAt: new Date(),
      });
      throw new Error(`Production completed but visuals failed: `);
    }

    const updatedProduction = await Production.findByIdAndUpdate(
      productionId,
      {
        visuals,
        progress: 100,
        status: "completed",
        completedAt: new Date(),
        updatedAt: new Date(),
      },
      { new: true }
    );

    logger.info(`AI processing completed for production ${productionId}`);
    return updatedProduction;
  } catch (error: any) {
    const currentState = await Production.findById(productionId);
    const errorStatus =
      currentState?.status === "processing" ? "failed" : "partially_completed";

    await Production.findByIdAndUpdate(productionId, {
      status: errorStatus,
      error: error.message,
      updatedAt: new Date(),
    });

    logger.error(`AI processing failed for production ${productionId}:`, error);
    throw error;
  }
};
