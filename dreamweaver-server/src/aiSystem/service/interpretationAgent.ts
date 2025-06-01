import OpenAI from "openai";
import { ArchetypeAnalysis } from "./archetypeService";

export type DreamAnalysis = {
  interpretation: string;
  symbols: string[];
  emotions: string[];
  potentialStories: string[];
};

export const interpreteDream = async (
  transcript: string,
  archetypes: ArchetypeAnalysis
): Promise<DreamAnalysis> => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      temperature: 0.7,
      response_format: { type: "json_object" }, // Enforce JSON response
      messages: [
        {
          role: "system",
          content: `
You are a dream analysis expert trained in Jungian psychology. 
Your task is to analyze a dream transcript and return specific elements in JSON format.

Required Output Structure:
{
  "interpretation": "Your psychological interpretation of the dream",
  "symbols": ["list", "of", "key", "symbols"],
  "emotions": ["list", "of", "dominant", "emotions"],
  "potentialStories": ["story", "ideas", "from", "symbols"]
}

Rules:
1. You MUST include all four fields
2. Each field must contain an array with at least 3 items (except interpretation which is a string)
3. Symbols should be concrete objects/people from the dream
4. Return ONLY valid JSON - no markdown, no commentary

Dream Analysis Context:
${JSON.stringify(archetypes, null, 2)}
`,
        },
        {
          role: "user",
          content: `Analyze this dream:\n${transcript}`,
        },
      ],
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error("No content in AI response");

    // Clean and parse the response
    const cleanedContent = content.replace(/```json/g, '').replace(/```/g, '').trim();
    const result = JSON.parse(cleanedContent);

    // Validate the response structure
    const requiredFields = ['interpretation', 'symbols', 'emotions', 'potentialStories'];
    for (const field of requiredFields) {
      if (!(field in result)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Ensure symbols is an array with at least one item
    if (!Array.isArray(result.symbols) || result.symbols.length === 0) {
      throw new Error("Symbols must be a non-empty array");
    }

    // Convert all string fields to arrays if needed
    if (typeof result.symbols === 'string') {
      result.symbols = [result.symbols];
    }

    console.log(result,'res')

    return {
      interpretation: result.interpretation || "No interpretation provided",
      symbols: result.symbols || [],
      emotions: result.emotions || [],
      potentialStories: result.potentialStories || []
    };

  } catch (error) {
    console.error("Dream interpretation failed:", error);
    // Return a valid structure even if analysis fails
    return {
      interpretation: "Dream analysis failed",
      symbols: [],
      emotions: [],
      potentialStories: []
    };
  }
};