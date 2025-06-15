import OpenAI from "openai";

export interface SymbolInterpretation {
  name: string;
  meaning: string;
  frequency: number;
  archetypeConnections?: string[];
  emotionalSignificance?: string;
}

export interface ArchetypeAnalysis {
  primaryArchetype: string;
  secondaryArchetypes: string[];
  symbols: SymbolInterpretation[];
  emotionalTone: string[];
  potentialConflicts: string[];
}

interface PromptTemplates {
  [key: string]: (params: any) => string;
}

const JUNGIAN_ARCHETYPES = [
  "The Self",
  "The Shadow",
  "The Anima",
  "The Animus",
  "The Persona",
  "The Hero",
  "The Trickster",
  "The Wise Old Man",
  "The Great Mother",
  "The Child",
];

const createPrompt: PromptTemplates = {
  "symbol-extraction": ({ transcript }) => `
    Analyze this dream transcript and extract symbolic elements with frequencies (1-5 scale):

    ${transcript}

    Output JSON with:
    - symbols (array of objects with name, meaning, frequency)
    - recurringThemes
    - emotionalTones

    Format:
    {
      "symbols": [{
        "name": string,
        "meaning": string,
        "frequency": number
      }],
      "recurringThemes": string[],
      "emotionalTones": string[]
    }

    Respond only with raw JSON. Do not include markdown formatting or triple backticks.
  `,

  "archetype-matching": ({ symbols, archetypes, themes, emotions }) => `
    Match these dream symbols to Jungian archetypes and enhance interpretations:
    
    Symbols: ${JSON.stringify(symbols)}
    Themes: ${themes?.join(", ") || "none"}
    Emotions: ${emotions?.join(", ") || "none"}
    Available Archetypes: ${archetypes.join(", ")}

    Output JSON with:
    - primaryArchetype (most dominant)
    - secondaryArchetypes (other significant matches)
    - symbols (enhanced with archetypeConnections and emotionalSignificance)
    - emotionalTone
    - potentialConflicts

    Format:
    {
      "primaryArchetype": string,
      "secondaryArchetypes": string[],
      "symbols": [{
        "name": string,
        "meaning": string,
        "frequency": number,
        "archetypeConnections": string[],
        "emotionalSignificance": string
      }],
      "emotionalTone": string[],
      "potentialConflicts": string[]
    }

    Respond only with raw JSON. Do not include markdown formatting or triple backticks.
  `,
};

function extractJSON(text: string): string {
  const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  return match ? match[1] : text;
}

export const analyzeArchetypes = async (
  transcript: string
): Promise<ArchetypeAnalysis> => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    // First pass: extract symbols with basic information
    const extractionPrompt = createPrompt["symbol-extraction"]({ transcript });
    const extractionResponse = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{ role: "user", content: extractionPrompt }],
      temperature: 0.3,
    });

    const extractedText = extractionResponse.choices[0].message.content!;
    const { symbols, recurringThemes, emotionalTones } = JSON.parse(extractJSON(extractedText));

    // Second pass: enhance symbols with archetypal connections
    const archetypePrompt = createPrompt["archetype-matching"]({
      symbols,
      archetypes: JUNGIAN_ARCHETYPES,
      themes: recurringThemes,
      emotions: emotionalTones,
    });

    const archetypeResponse = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{ role: "user", content: archetypePrompt }],
      temperature: 0.5,
    });

    const archetypeText = archetypeResponse.choices[0].message.content!;
    const finalAnalysis: ArchetypeAnalysis = JSON.parse(extractJSON(archetypeText));

    // Ensure all symbols have frequency data
    finalAnalysis.symbols = finalAnalysis.symbols.map(symbol => ({
      ...symbol,
      frequency: symbol.frequency || 1, // Default to 1 if missing
    }));

    return finalAnalysis;
  } catch (error) {
    console.error("Archetype analysis failed:", error);
    throw new Error("Failed to analyze archetypes");
  }
};

export const getArchetypeDescription = (archetype: string): string => {
  const descriptions: Record<string, string> = {
    "The Self": "Represents the unified unconsciousness and consciousness",
    "The Shadow": "The unknown dark side of the personality",
    "The Anima": "The feminine aspect in men",
    "The Animus": "The masculine aspect in women",
    "The Persona": "The social mask we present to the world",
    "The Hero": "The ego's ideal self",
    "The Trickster": "The rule-breaker and disruptor",
    "The Wise Old Man": "The wisdom and guidance figure",
    "The Great Mother": "The nurturing and fertility symbol",
    "The Child": "The innocence and potential for growth",
  };
  return descriptions[archetype] || "No description available";
};

export const calculateSymbolImpact = (
  symbols: SymbolInterpretation[]
): number => {
  if (!symbols?.length) return 0;
  return symbols.reduce((sum, symbol) => sum + (symbol.frequency || 1), 0) / symbols.length;
};

export const getSymbolInterpretation = (
  symbolName: string,
  analysis: ArchetypeAnalysis
): SymbolInterpretation | undefined => {
  return analysis.symbols.find(s => s.name.toLowerCase() === symbolName.toLowerCase());
};