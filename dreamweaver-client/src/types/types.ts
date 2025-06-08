export interface JournalEntry {
  _id?: string;
  transcript: string;
  createdAt?: string;
  user?: {
    _id: string;
    username: string;
  };
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

export interface JournalResponse {
  id: string;
  content: string;
  createdAt: Date;
}

export interface RegisterUserParams {
  jwt: {
    token: string;
  };
}

export interface UpdateUserParams {
  walletAddress: string;
  updateData: {
    username?: string;
    url?: string;
    lastSeen?: Date;
  };
}
