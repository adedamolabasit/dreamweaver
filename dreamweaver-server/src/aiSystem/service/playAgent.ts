import OpenAI from "openai";

export type StoryParams = {
  title: string;
  synopsis: string;
  characters: { name: string; description: string }[];
  scenes: { description: string; visualPrompt: string }[];
};

export const generatePlayElements = async (
  story: StoryParams
): Promise<{
  title: string;
  acts: {
    number: number;
    scenes: {
      description: string;
      dialogue: string[];
      stageDirections: string;
    }[];
  }[];
}> => {
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
You are a playwright who transforms narrative stories into dramatic 3-act plays.

Convert the input story into a 3-act play structure with these requirements:
- Each act should have multiple scenes.
- Each scene must include:
  - A brief description setting the scene.
  - Detailed dialogue lines as an array of strings.
  - Stage directions describing character movements, emotions, and scene actions.
- The play should emphasize emotional arcs and narrative flow.
- Output must be a valid JSON object with this structure:

{
  "title": string,
  "acts": [
    {
      "number": number,
      "scenes": [
        {
          "description": string,
          "dialogue": string[],
          "stageDirections": string
        }
      ]
    }
  ]
}

Respond with JSON only — no extra text, explanation, or markdown.
`,
      },
      {
        role: "user",
        content: `
Here is the story to adapt:
${JSON.stringify(story, null, 2)}
`,
      },
    ],
  });

  return JSON.parse(response.choices[0].message.content!);
};
