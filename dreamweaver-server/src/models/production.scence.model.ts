import mongoose, { Document } from "mongoose";
import { IUser } from "./user.model";
import { IDreamJournalEntry } from "./dream.journal.model";

export type ProductionStatus =
  | "processing"
  | "archetype_complete"
  | "interpretation_complete"
  | "story_complete"
  | "play_complete"
  | "visual_complete"
  | "published"
  | "unpublished"
  | "inactive"
  | "failed";

export interface IProduction extends Document {
  userId: mongoose.Types.ObjectId | IUser;
  dreamId: mongoose.Types.ObjectId | IDreamJournalEntry;
  originalDream: string;
  analysis?: {
    interpretation?: string;
    symbols?: string[];
    emotions?: string[];
  };
  story?: {
    title?: string;
    synopsis?: string;
    characters?: {
      name?: string;
      description?: string;
    }[];
    scenes?: {
      description?: string;
      visualPrompt?: string;
      imageUrl?: string;
    }[];
  };
  play?: {
    title?: string;
    acts?: {
      number?: number;
      scenes?: {
        description?: string;
        dialogue?: string[];
        stageDirections?: string;
      }[];
    }[];
  };
  progress: number;
  status: ProductionStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductionSchema = new mongoose.Schema<IProduction>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dreamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DreamJournalEntry",
      required: true,
    },
    originalDream: { type: String, required: true },
    analysis: {
      interpretation: { type: String },
      symbols: [{ type: String }],
      emotions: [{ type: String }],
    },
    story: {
      title: { type: String },
      synopsis: { type: String },
      characters: [
        {
          name: { type: String },
          description: { type: String },
        },
      ],
      scenes: [
        {
          description: { type: String },
          visualPrompt: { type: String },
          imageUrl: { type: String },
        },
      ],
    },
    play: {
      title: { type: String },
      acts: [
        {
          number: { type: Number },
          scenes: [
            {
              description: { type: String },
              dialogue: [{ type: String }],
              stageDirections: { type: String },
            },
          ],
        },
      ],
    },
    progress: {
      type: Number,
      required: false,
      default: 0,
    },
    status: {
      type: String,
      enum: [
        "processing",
        "archetype_complete",
        "interpretation_complete",
        "story_complete",
        "play_complete",
        "visual_complete",
        "published",
        "unpublished",
        "inactive",
        "failed",
      ],
      default: "unpublished",
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

ProductionSchema.index({
  originalDream: "text",
  "analysis.interpretation": "text",
  "story.title": "text",
  "story.synopsis": "text",
  "play.title": "text",
});

export const Production = mongoose.model<IProduction>(
  "Production",
  ProductionSchema
);
