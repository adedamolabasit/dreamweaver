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

export interface ProductionResponse {
  _id: string;
  userId: string;
  dreamId: string;
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
    description: string;
    originalPrompt: string;
    generatedImages: {
      url: string;
      style: string;
    }[];
  };
  ipRegistration?: {
    ipId: string;
    status: "verified" | "notVerified" | "pending";
    licenseTermsIds: string;
    tokenId: string;
  };
  publication: "draft" | "published";
  progress: number;
  status: ProductionStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProfileResp {
  user: {
    _id: string;
    username: string;
    walletAddress: string | `0x${string}`;
    avatar: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export interface Story {
  id: string;
  name: string;
  description: string;
  timeCreated: string;
  ipStatus: "registered" | "pending" | "rejected";
  publishStatus: "published" | "draft";
  earnings: number;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  earnings: number;
}
