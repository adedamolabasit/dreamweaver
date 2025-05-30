import OpenAI from "openai";
import { DreamAnalysis } from "./interpretationAgent";

export const generateStory = async (
  analysis: DreamAnalysis
): Promise<{
  title: string;
  synopsis: string;
  characters: { name: string; description: string }[];
  scenes: { description: string; visualPrompt: string }[];
}> => {
  const openai = new OpenAI({
    apiKey:
      "",
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

async function main() {
  const analysis = {
    interpretation:
      "This dream vividly illustrates a journey of self-discovery and confrontation with one's subconscious fears and repressed desires, highlighted by the primary presence of the Shadow archetype. Borrowing the father's car suggests grappling with inherited authority and responsibilities, reflecting a struggle with parental expectations and personal independence. The market, as a place of exchange, symbolizes the dreamer's social interactions and the complexities of navigating different aspects of their persona in a public sphere. The scenario of the locked gate at the market conveys feelings of being trapped or limited by circumstances or internal fears, which align with your reported emotional tone of uncertainty and anxiety. The presence of a large sum of money can be seen as a sudden awareness or confrontation with one's values and power, which attracts negative elements (thieves) representing the darker aspects of the self or external challenges. The involvement of a military friend as a rescuer aligns with the Hero archetype, indicating a reliance on inner strength and possibly external support systems to face and overcome personal challenges. The strange place with unknown intentions from others reinforces feelings of disorientation and mistrust, common in journeys involving self-discovery and growth.",
    symbols: [
      "father's car",
      "market",
      "locked gate",
      "money",
      "thieves",
      "strange place",
      "military friend",
      "rescue",
    ],
    emotions: ["uncertainty", "anxiety", "exploration"],
    potentialStories: [
      "A young adult's struggle with accepting and integrating inherited responsibilities while carving out a personal identity separate from parental expectations.",
      "A confrontation with one's fears and darker aspects, symbolized by thieves and being trapped, leading to a journey of overcoming these through self-reliance and external support.",
      "An exploration of trust and vulnerability in unfamiliar situations, emphasizing the need for security and support in the face of adversity.",
    ],
  };

  const archetypeAnalysis = await generateStory(analysis);
  console.log(
    "Archetype Analysis Result:\n",
    JSON.stringify(archetypeAnalysis, null, 2)
  );
}

main().catch(console.error);
