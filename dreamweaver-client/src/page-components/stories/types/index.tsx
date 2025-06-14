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
    ip: {
      ipId: string;
      status: "registered" | "notRegistered" | "pending";
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

export interface Character {
  name?: string;
  description?: string;
}

export interface Scene {
  description?: string;
  visualPrompt?: string;
  imageUrl?: string;
}

export interface GeneratedImage {
  url: string;
  style: string;
}

export interface Visual {
  id: string;
  description: string;
  originalPrompt: string;
  generatedImages: GeneratedImage[];
}

export interface Story {
  title?: string;
  synopsis?: string;
  characters?: Character[];
  scenes?: Scene[];
}

export interface ComicBookDisplayProps {
  story?: Story;
  visuals?: Visual[];
}

export interface ArchetypeData {
  primaryArchetype: string;
  secondaryArchetypes: string[];
  symbolMeanings: {
    symbol: string;
    meaning: string;
  }[];
  emotionalTone: string[];
  potentialConflicts: string[];
}

export interface ArchetypeDisplayProps {
  data: ArchetypeData;
}

export interface InterpretationData {
  interpretation: string;
  symbols: string[];
  emotions: string[];
  potentialStories: string[];
}

export interface InterpretationDisplayProps {
  data: InterpretationData;
}
