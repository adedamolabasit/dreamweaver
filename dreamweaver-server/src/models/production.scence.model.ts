import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./user.model";
import { IDreamJournalEntry } from "./dream.journal.model";

export type ProductionStatus = "published" | "unpublished" | "inactive";

export interface IProduction extends Document {
  userId: mongoose.Types.ObjectId | IUser;
  dreamId: mongoose.Types.ObjectId | IDreamJournalEntry;
  originalDream?: string;
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
  status: ProductionStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductionSchema = new Schema<IProduction>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dreamId: {
      type: Schema.Types.ObjectId,
      ref: "DreamJournalEntry",
      required: true,
    },
    originalDream: { type: String },
    analysis: {
      type: {
        interpretation: { type: String },
        symbols: [{ type: String }],
        emotions: [{ type: String }],
      },
      default: {},
    },
    story: {
      type: {
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
      default: {},
    },
    play: {
      type: {
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
      default: {},
    },
    status: {
      type: String,
      enum: ["published", "unpublished", "inactive"],
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
