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
  | "completed"
  | "published"
  | "inactive"
  | "failed";

export type PilFlavoursType =
  | "nonCommercialSocialRemix"
  | "commercialUse"
  | "commercialRemix"
  | "creativeCommonAttribution";

export interface IProduction extends Document {
  userId: mongoose.Types.ObjectId | IUser;
  dreamId: mongoose.Types.ObjectId | IDreamJournalEntry;
  originalDream: string;
  analysis?: {
    primaryArchetype: string;
    secondaryArchetypes: string[];
    symbols: {
      name: string;
      meaning: string;
      frequency: number;
    }[];
    emotionalTone: string[];
    potentialConflicts: string[];
  };
  interpretation?: {
    interpretation: string;
    symbols: string[];
    emotions: string[];
    potentialStories: string[];
  };
  story?: {
    title?: string;
    synopsis?: string;
    characters?: {
      name?: string;
      description?: string;
    }[];
    scenes?: {
      // id?: string;
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
  visuals?: {
    // id?: string;
    description: string;
    originalPrompt: string;
    generatedImages: {
      url: string;
      style: string;
    };
  };
  ipRegistration?: {
    ip: {
      ipId: string;
      status: "registerd" | "notRegistered" | "pending";
      licenseTermsIds: string;
      tokenId: string;
      fee: number;
      revShare: number;
      license: {
        pilFlavors: PilFlavoursType;
      };
    }[];
  };
  publication: "draft" | "published";
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
      primaryArchetype: { type: String },
      secondaryArchetypes: [{ type: String }],
      symbols: [
        {
          name: { type: String },
          meaning: { type: String },
          frequency: { type: Number },
        },
      ],
      emotionalTone: [{ type: String }],
      potentialConflicts: [{ type: String }],
    },
    interpretation: {
      interpretation: { type: String },
      symbols: [{ type: String }],
      emotions: [{ type: String }],
      potentialStories: [{ type: String }],
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
    visuals: {
      description: { type: String },
      originalPrompt: { type: String },
      generatedImages: {
        url: { type: String },
        style: { type: String },
      },
    },
    ipRegistration: {
      ip: [
        {
          type: {
            ipId: { type: String, required: true },
            status: {
              type: String,
              enum: ["verified", "notVerified", "pending"],
              required: true,
            },
            licenseTermsIds: { type: String, required: true },
            tokenId: { type: String, required: true },
            fee: { type: Number, required: false },
            revShare: { type: Number, required: false },
            license: {
              pilFlavors: {
                type: String,
                enum: [
                  "nonCommercialSocialRemix",
                  "commercialUse",
                  "commercialRemix",
                  "creativeCommonAttribution",
                ],
                required: false,
              },
            },
          },
          required: false,
          default: null,
        },
      ],
    },
    publication: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      required: true,
    },

    progress: {
      type: Number,
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
        "completed",
        "published",
        "inactive",
        "failed",
      ],
      default: "inactive",
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

ProductionSchema.index({
  originalDream: "text",
  "analysis.primaryArchetype": "text",
  "analysis.symbols.meaning": "text",
  "interpretation.interpretation": "text",
  "story.title": "text",
  "story.synopsis": "text",
  "play.title": "text",
});

export const Production = mongoose.model<IProduction>(
  "Production",
  ProductionSchema
);
