import OpenAI from "openai";
import { DreamAnalysis } from "./interpretationAgent";

export const generateStoryElements = async (
  analysis: DreamAnalysis
): Promise<{
  title: string;
  synopsis: string;
  characters: { name: string; description: string }[];
  scenes: { id: string; description: string; visualPrompt: string }[];
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
You are an award-winning fiction writer who specializes in creating compelling, symbolic narratives from dream analysis. 
Craft a complete story with proper narrative structure (about 15-20 minute reading time) containing:

STRUCTURE:
1. Setup (3 scenes): Establish world, characters, and initial conflict
2. Development (4-5 scenes): Build tension, introduce obstacles
3. Climax (2 scenes): Major confrontation/turning point
4. Resolution (1-2 scenes): Emotional payoff and conclusion

REQUIREMENTS:
- Title: Evocative and thematic
- Synopsis: 3-4 sentences capturing the core narrative
- Characters: 3-5 well-defined characters with clear motivations
  - Include at least one protagonist, one supporting character, and one antagonist/obstacle
- Scenes: 8-10 total scenes with:
  - id: Unique scene identifier (scene1, scene2, etc.)
  - description: 2-3 paragraph scene summary with emotional beats
  - visualPrompt: Detailed DALL·E prompt including:
    * Key visual elements
    * Lighting/atmosphere
    * Character emotions/actions
    * Artistic style suggestions

TECHNIQUES TO USE:
- Show don't tell for emotional states
- Sensory details in visual prompts
- Character-specific dialogue tags
- Foreshadowing in early scenes
- Symbolic payoff in resolution

TONE:
Match the dream's emotional tone (${analysis.emotions.join(", ")}), using:
- ${analysis.symbols.join(", ")} as recurring motifs
- Pacing that builds tension appropriately
- Psychological depth in character interactions

OUTPUT FORMAT (STRICT JSON):
{
  "title": "Story Title",
  "synopsis": "Engaging summary...",
  "characters": [
    {
      "name": "Character Name",
      "description": "Detailed description including role and motivation"
    }
  ],
  "scenes": [
    {
      "id": "scene1",
      "description": "Full scene description...",
      "visualPrompt": "Detailed visual description including style, composition, lighting..."
    }
  ]
}

Respond with pure JSON only - no markdown or explanations.
`,
      },
      {
        role: "user",
        content: `
ANALYSIS INPUT:
Symbols: ${analysis.symbols.join(", ")}
Primary Emotions: ${analysis.emotions.join(", ")}
Potential Story Directions:
${analysis.potentialStories
  .map((story: any, i: any) => `${i + 1}. ${story}`)
  .join("\n")}

Generate a complete story following all requirements above.
`,
      },
    ],
    response_format: { type: "json_object" },
  });

  return JSON.parse(response.choices[0].message.content!);
};