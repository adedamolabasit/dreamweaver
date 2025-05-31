import { Queue, Worker } from "bullmq";
import { connectionOptions, workerConfig } from "./config";
import logger from "../utils/logger";

import { analyzeArchetypes } from "../aiSystem/service/archetypeService";
import { interpreteDream } from "../aiSystem/service/interpretationAgent";
import { generatePlayElements } from "../aiSystem/service/playAgent";
import { generateStoryElements } from "../aiSystem/service/storyAgent";
import { generateMultiStyleSceneImages } from "../aiSystem/service/visualAgent";
import { DreamAnalysis } from "../aiSystem/service/interpretationAgent";
import { StoryParams } from "../aiSystem/service/playAgent";
import { StoryVisuals } from "../aiSystem/service/visualAgent";

interface ArchetypeAnalysis {
  primaryArchetype: string;
  secondaryArchetypes: string[];
  symbols: {
    name: string;
    meaning: string;
    frequency: number;
  }[];
  emotionalTone: string[];
  potentialConflicts: string[];
}

interface AnalysisJobData {
  productionId: string;
  dreamContent: string;
}

interface InterpreterJobData {
  productionId: string;
  dreamContent: string;
  analysisResults: ArchetypeAnalysis;
}

interface StoryJobData {
  productionId: string;
  interpreterResults: DreamAnalysis;
}

interface PlayJobData {
  productionId: string;
  storyElements: StoryParams;
}

interface visualizeJobData {
  productionId: string;
  story: StoryVisuals;
}

export const analysisQueue = new Queue("ai-analysis", {
  connection: connectionOptions,
});

export const interpreterQueue = new Queue("ai-interpreter", {
  connection: connectionOptions,
});

export const storyQueue = new Queue("ai-story", {
  connection: connectionOptions,
});

export const playQueue = new Queue("ai-play", {
  connection: connectionOptions,
});

export const visualQueue = new Queue("ai-visual", {
  connection: connectionOptions,
});

const analysisWorker = new Worker<AnalysisJobData>(
  "ai-analysis",
  async (job: any) => {
    try {
      const { productionId, dreamContent } = job.data;
      logger.info(`Processing analysis for archetypes ${productionId}`);

      const results = await analyzeArchetypes(dreamContent);
      return {
        productionId,
        results,
      };
    } catch (error) {
      logger.error(`Analysis job ${job.id} failed:`, error);
      throw error;
    }
  },
  {
    ...workerConfig,
    concurrency: 3,
  }
);

const interpreterWorker = new Worker<InterpreterJobData>(
  "ai-interpreter",
  async (job: any) => {
    try {
      const { productionId, dreamContent, analysisResults } = job.data;
      logger.info(`Processing interpretation on archetypes ${productionId}`);

      const results = await interpreteDream(dreamContent, analysisResults);
      return {
        productionId,
        results,
      };
    } catch (error) {
      logger.error(`Interpreter job ${job.id} failed:`, error);
      throw error;
    }
  },
  {
    ...workerConfig,
    concurrency: 3,
  }
);

const storyWorker = new Worker<StoryJobData>(
  "ai-story",
  async (job) => {
    try {
      const { productionId, interpreterResults } = job.data;
      logger.info(`Generating story for production ${productionId}`);

      const results = await generateStoryElements(interpreterResults);
      return {
        productionId,
        results,
      };
    } catch (error) {
      logger.error(`Story generation job ${job.id} failed:`, error);
      throw error;
    }
  },
  workerConfig
);

const playWorker = new Worker<PlayJobData>(
  "ai-play",
  async (job) => {
    try {
      const { productionId, storyElements } = job.data;
      logger.info(`Generating play for production ${productionId}`);

      const results = await generatePlayElements(storyElements);
      return {
        productionId,
        results,
      };
    } catch (error) {
      logger.error(`Play generation job ${job.id} failed:`, error);
      throw error;
    }
  },
  workerConfig
);

const visualWorker = new Worker<visualizeJobData>(
  "ai-visual",
  async (job) => {
    try {
      const { productionId, story } = job.data;
      logger.info(`Generating visual images for production ${productionId}`);

      const results = await generateMultiStyleSceneImages(story);
      return {
        productionId,
        results,
      };
    } catch (error) {
      logger.error(`visual generation job ${job.id} failed:`, error);
      throw error;
    }
  },
  workerConfig
);

analysisWorker.on("failed", (job, err) => {
  logger.error(`Analysis failed for job ${job?.id}:`, err);
});

storyWorker.on("failed", (job, err) => {
  logger.error(`Story generation failed for job ${job?.id}:`, err);
});

interpreterWorker.on("failed", (job, err) => {
  logger.error(`Interpreter generation failed for job ${job?.id}:`, err);
});

playWorker.on("failed", (job, err) => {
  logger.error(`Play generation failed for job ${job?.id}:`, err);
});

visualWorker.on("failed", (job, err) => {
  logger.error(`Play generation failed for job ${job?.id}:`, err);
});

export {
  analysisWorker,
  interpreterWorker,
  storyWorker,
  playWorker,
  visualWorker,
};
