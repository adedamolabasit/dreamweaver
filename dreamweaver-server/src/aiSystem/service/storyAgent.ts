import OpenAI from "openai";
import { DreamAnalysis } from "./interpretationAgent";

export const generateStoryElements = async (
  analysis: DreamAnalysis
): Promise<{
  title: string;
  synopsis: string;
  characters: { name: string; description: string }[];
  scenes: { description: string; visualPrompt: string }[];
}> => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    temperature: 0.8,
    messages: [
      {
        role: "system",
        content: `
You are a creative fiction writer who specializes in symbolic and emotionally rich storytelling.
You will write a short original story inspired by dream analysis results, including psychological symbols and emotional themes.

Use the dream interpretation components as inspiration:
- **Symbols** represent key motifs in the story.
- **Emotions** drive character arcs and scene tone.
- **Potential stories** suggest the narrative direction.

Output your response as **valid JSON** using this structure:

{
  "title": string,
  "synopsis": string,
  "characters": [
    { "name": string, "description": string }
  ],
  "scenes": [
    { 
      "description": string,
      "visualPrompt": string // A DALL·E-style prompt to visualize the scene
    }
  ]
}

The tone can be surreal, mythical, mysterious, or emotionally resonant — based on the dream’s underlying emotions. Keep the JSON clean, no markdown or extra commentary.
`,
      },
      {
        role: "user",
        content: `
Symbols: ${analysis.symbols.join(", ")}
Emotions: ${analysis.emotions.join(", ")}
Potential Stories:
${analysis.potentialStories
  .map((story: any, i: any) => `${i + 1}. ${story}`)
  .join("\n")}
`,
      },
    ],
  });

  return JSON.parse(response.choices[0].message.content!);
};
