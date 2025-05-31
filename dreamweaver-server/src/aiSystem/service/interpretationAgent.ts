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

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    temperature: 0.7,
    messages: [
      {
        role: "system",
        content: `
You are a dream analysis expert trained in Jungian psychology, Freudian theory, and contemporary cognitive psychology. 
Your goal is to interpret a dream transcript using psychological symbolism and archetypes. 
Structure the output in a clear JSON format following this schema:

{
  "interpretation": string, 
  "symbols": string[],      
  "emotions": string[],     
  "potentialStories": string[] 
}

In your interpretation, draw on:
- Jungian archetypes (e.g., the Shadow, the Anima, the Hero)
- Freudian symbolism (e.g., subconscious desires, Oedipal themes)
- Emotional and narrative patterns from modern psychology
- The following archetype analysis that was already performed on this dream:
${JSON.stringify(archetypes, null, 2)}

Analyze this dream transcript carefully, grounding your response in psychological theory and creativity. Avoid generic summaries.
Provide your response as **valid JSON** only. No extra commentary or markdown.
`,
      },
      {
        role: "user",
        content: `
Dream Transcript:
${transcript}
`,
      },
    ],
  });

  return JSON.parse(response.choices[0].message.content!);
};
