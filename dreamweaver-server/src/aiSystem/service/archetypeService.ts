import OpenAI from "openai";

export interface ArchetypeAnalysis {
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
    Analyze this dream transcript and extract symbolic elements:

    ${transcript}

    Output JSON with:
    - symbols (array of objects with name, possibleMeanings)
    - recurringThemes
    - emotionalTones

    Format:
    {
      "symbols": [{ "name": string, "possibleMeanings": string[] }],
      "recurringThemes": string[],
      "emotionalTones": string[]
    }

    Respond only with raw JSON. Do not include markdown formatting or triple backticks.
  `,

  "archetype-matching": ({ symbols, archetypes }) => `
    Match these dream symbols to Jungian archetypes:
    Symbols: ${JSON.stringify(symbols)}
    Available Archetypes: ${archetypes.join(", ")}

    Output JSON with:
    - primaryArchetype (most dominant)
    - secondaryArchetypes (other significant matches)
    - symbolMeanings (detailed interpretations)
    - emotionalTone
    - potentialConflicts

    Format:
    {
      "primaryArchetype": string,
      "secondaryArchetypes": string[],
      "symbolMeanings": [{ "symbol": string, "meaning": string }],
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
    const extractionPrompt = createPrompt["symbol-extraction"]({ transcript });
    const extractionResponse = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{ role: "user", content: extractionPrompt }],
      temperature: 0.3,
    });

    const extractedText = extractionResponse.choices[0].message.content!;
    const rawSymbols = JSON.parse(extractJSON(extractedText));

    const archetypePrompt = createPrompt["archetype-matching"]({
      symbols: rawSymbols.symbols,
      archetypes: JUNGIAN_ARCHETYPES,
    });

    const archetypeResponse = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{ role: "user", content: archetypePrompt }],
      temperature: 0.5,
    });

    const archetypeText = archetypeResponse.choices[0].message.content!;
    return JSON.parse(extractJSON(archetypeText));
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
  symbols: { frequency: number }[]
): number => {
  return (
    symbols.reduce((sum, symbol) => sum + symbol.frequency, 0) / symbols.length
  );
};
