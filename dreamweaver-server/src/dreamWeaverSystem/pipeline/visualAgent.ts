import OpenAI from "openai";

interface GeneratedImage {
  url: string;
  style: string;
}

interface SceneWithVariants {
  description: string;
  originalPrompt: string;
  generatedImages: GeneratedImage[];
}

interface StoryScene {
  description: string;
  visualPrompt: string;
}

interface Story {
  scenes: StoryScene[];
  // ... other story properties
}

export const generateMultiStyleSceneImages = async (
  story: Story
): Promise<SceneWithVariants[]> => {
  const openai = new OpenAI({
    apiKey:
      "",
  });

  const results: SceneWithVariants[] = [];

  // Define different art style modifiers
  const artStyles = [
    {
      name: "Pixar-Style 3D",
      prompt: "Pixar-style 3D animation, vibrant colors",
    },
    {
      name: "Watercolor Painting",
      prompt: "Watercolor painting style, soft edges",
    },
    {
      name: "Comic Book",
      prompt: "Comic book style, bold outlines, halftone shading",
    },
    // Add more styles as needed
  ];

  for (const scene of story.scenes) {
    const sceneResult: SceneWithVariants = {
      description: scene.description,
      originalPrompt: scene.visualPrompt,
      generatedImages: [],
    };

    // Generate each variant
    for (const style of artStyles) {
      try {
        const response = await openai.images.generate({
          model: "dall-e-3", // Using DALL-E 3 for best quality
          prompt: `${style.prompt}, ${scene.visualPrompt}`,
          n: 1,
          size: "1024x1024",
          quality: "standard", // Cost-saving measure
          style: "vivid",
        });

        if (response.data?.[0]?.url) {
          sceneResult.generatedImages.push({
            url: response.data[0].url,
            style: style.name,
          });
        }
      } catch (error) {
        console.error(
          `Failed to generate ${style.name} variant for scene: ${scene.description}`
        );
        console.error(error);
      }
    }

    results.push(sceneResult);
  }

  return results;
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

  const archetypeAnalysis = await generateMultiStyleSceneImages(story);
  console.log(
    "Archetype Analysis Result:\n",
    JSON.stringify(archetypeAnalysis, null, 2)
  );
}

main().catch(console.error);
