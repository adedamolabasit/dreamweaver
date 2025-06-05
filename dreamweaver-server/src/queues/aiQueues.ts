import { Queue, Worker } from "bullmq";
import { connectionOptions, workerConfig } from "./config";
import logger from "../utils/logger";

import { analyzeArchetypes } from "../aiSystem/service/archetypeService";
import {
  interpreteDream,
  DreamAnalysis,
} from "../aiSystem/service/interpretationAgent";
import {
  generatePlayElements,
  StoryParams,
} from "../aiSystem/service/playAgent";
import { generateStoryElements } from "../aiSystem/service/storyAgent";
import {
  generateComicStyleSceneImages,
  StoryVisuals,
} from "../aiSystem/service/visualAgent";

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

interface VisualizeJobData {
  productionId: string;
  story: StoryVisuals;
}

// Queues
export const analysisQueue = new Queue<AnalysisJobData>("ai-analysis", {
  connection: connectionOptions,
});
export const interpreterQueue = new Queue<InterpreterJobData>(
  "ai-interpreter",
  { connection: connectionOptions }
);
export const storyQueue = new Queue<StoryJobData>("ai-story", {
  connection: connectionOptions,
});
export const playQueue = new Queue<PlayJobData>("ai-play", {
  connection: connectionOptions,
});
export const visualQueue = new Queue<VisualizeJobData>("ai-visual", {
  connection: connectionOptions,
});

// Workers
export const analysisWorker = new Worker<AnalysisJobData>(
  "ai-analysis",
  async (job) => {
    const { productionId, dreamContent } = job.data;
    logger.info(`Processing analysis for production ${productionId}`);
    const results = await analyzeArchetypes(dreamContent);
    return { productionId, results };
  },
  workerConfig
);

export const interpreterWorker = new Worker<InterpreterJobData>(
  "ai-interpreter",
  async (job) => {
    const { productionId, dreamContent, analysisResults } = job.data;
    logger.info(`Processing interpretation for production ${productionId}`);
    const results = await interpreteDream(dreamContent, analysisResults);
    return { productionId, results };
  },
  workerConfig
);

export const storyWorker = new Worker<StoryJobData>(
  "ai-story",
  async (job) => {
    const { productionId, interpreterResults } = job.data;
    logger.info(`Generating story for production ${productionId}`);
    const results = await generateStoryElements(interpreterResults);
    return { productionId, results };
  },
  workerConfig
);

export const playWorker = new Worker<PlayJobData>(
  "ai-play",
  async (job) => {
    const { productionId, storyElements } = job.data;
    logger.info(`Generating play elements for production ${productionId}`);
    const results = await generatePlayElements(storyElements);
    return { productionId, results };
  },
  workerConfig
);

export const visualWorker = new Worker<VisualizeJobData>(
  "ai-visual",
  async (job) => {
    const { productionId, story } = job.data;
    logger.info(`Generating visuals for production ${productionId}`);
    const results = await generateComicStyleSceneImages(story, productionId);
    return { productionId, results };
  },
  workerConfig
);

// Worker Failure Listeners
[
  analysisWorker,
  interpreterWorker,
  storyWorker,
  playWorker,
  visualWorker,
].forEach((worker) => {
  worker.on("failed", (job, err) => {
    logger.error(`Job failed in ${worker.name} queue, Job ID ${job?.id}:`, err);
  });
});
