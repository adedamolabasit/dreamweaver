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
    // Step 1: Extract symbols and themes
    const extractionPrompt = createPrompt["symbol-extraction"]({ transcript });
    const extractionResponse = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{ role: "user", content: extractionPrompt }],
      temperature: 0.3,
    });

    const extractedText = extractionResponse.choices[0].message.content!;
    const rawSymbols = JSON.parse(extractJSON(extractedText));

    // Step 2: Archetype matching
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

// Utility Functions
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

// -- RUN directly --
async function main() {
  const transcript =
    "I had a dream when I was young not really young but  in the dream shows that probably  was probably in my 21, i'm currently 26, i norrowed my dad's car, i actually do not like taking my dad's car, I just took  his car went to the market i was meant to pick my mom from her shop so I'm getting the parked the car somewhere so and I was on my way to meet my mom but before I reach my mom's shop, i  realize that I had packed the car inside the market in which the market Gates is going to be locked before we get done and it's i can't  move the car from the market if the gate is looked, so i went back to take the car out of the market, but I know that for sure that I didn't go back to the market, i was going to pack the car somewhere else,In the car, i saw a lot of money , it's not really clear how i got the money, but someone on the street noticed that i got that huge amount of money, i really do not know how i go out of the car into a room with a lady, not sure the intention of the lady, some thieves started knocking our door, i tried, we tried to escape them, but we are in a strange place, we don't know where to go, we had to go back, but i had to tell the lady to hold on that will come back, with the money with her, on my way out some of the thieves started to ataack me but i escape, into a room with a lady, the lady was scared at first but i think she was able to help, i called one of my friend in the military, and to my surprise he came in time with soldiers and guns to help me out, so i manage to show him where we are and the rescued me.";

  const archetypeAnalysis = await analyzeArchetypes(transcript);
  console.log(
    "Archetype Analysis Result:\n",
    JSON.stringify(archetypeAnalysis, null, 2)
  );
}

main().catch(console.error);
