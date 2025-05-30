export interface ArchetypeResult {
  primaryArchetype: string;
  secondaryArchetypes: string[];
  symbols: DreamSymbol[];
  emotionalTone: string[];
  potentialConflicts: string[];
}

export interface DreamSymbol {
  name: string;
  meaning: string;
  archetypeConnections: string[];
  intensity: number; // 1-5 scale
}