import OpenAI from "openai";

type Story = {
  title: string;
  synopsis: string;
  characters: { name: string; description: string }[];
  scenes: { description: string; visualPrompt: string }[];
};

export const generatePlay = async (
  story: Story
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
    apiKey:
      "",
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

async function main() {
  const story = {
    title: "Gates of Legacy",
    synopsis:
      "In a world where lineage defines destiny, Lila embarks on a journey to reclaim her father’s stolen car, a symbol of her family's legacy, from a mystical market guarded by a locked gate. Along the way, she confronts her fears, uncovers dark family secrets, and learns the value of trust and self-reliance.",
    characters: [
      {
        name: "Lila",
        description:
          "A young, resilient woman struggling with the weight of her family’s expectations and her own desire for independence.",
      },
      {
        name: "Ezra",
        description:
          "Lila's military friend who has his own past entwined with the mystical market and possesses deep knowledge of survival and loyalty.",
      },
      {
        name: "The Gatekeeper",
        description:
          "A mysterious figure who guards the entrance to the market, embodying the barriers Lila must overcome.",
      },
      {
        name: "The Shadow",
        description:
          "A cunning thief, representing Lila’s inner doubts and the darker aspects of her lineage.",
      },
    ],
    scenes: [
      {
        description:
          "Under the cloak of dusk, Lila stands before her father's old, rusted car, contemplating the journey ahead. The car, filled with maps and old letters, sparks memories of her father and the weight of her inheritance.",
        visualPrompt:
          "a vintage rusted car at dusk, filled with maps and letters, a young woman standing beside it, thoughtful",
      },
      {
        description:
          "At the bustling, enigmatic market, Lila and Ezra navigate through crowded stalls under watchful eyes. The market is a labyrinth of colors and mysteries, reflecting Lila's internal chaos and quest for understanding.",
        visualPrompt:
          "busy mystical market with colorful stalls and diverse crowd, young woman and military man walking cautiously",
      },
      {
        description:
          "Confronted by the imposing locked gate, Lila faces the Gatekeeper. Their dialogue is a battle of wits and wills, revealing Lila's determination and the secrets that the gate holds.",
        visualPrompt:
          "young woman confronting a mysterious gatekeeper at a large ornate locked gate, tense atmosphere",
      },
      {
        description:
          "In a hidden alley of the market, Lila battles The Shadow to retrieve the stolen car. The fight is intense, symbolizing her struggle with her darker self and her resolve to emerge victorious.",
        visualPrompt:
          "intense confrontation between a young woman and a shadowy figure in a dark alley of a mystical market",
      },
      {
        description:
          "With the car reclaimed and her fears faced, Lila and Ezra drive away from the market. The journey is not just a return but a new beginning, with Lila at the wheel, charting her own course.",
        visualPrompt:
          "young woman and military man driving an old car away from a mystical market at dawn, sense of new beginnings",
      },
    ],
  };

  const archetypeAnalysis = await generatePlay(story);
  console.log(
    "Archetype Analysis Result:\n",
    JSON.stringify(archetypeAnalysis, null, 2)
  );
}

main().catch(console.error);
