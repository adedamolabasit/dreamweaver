import OpenAI from "openai";

interface GeneratedImage {
  url: string;
  style: string;
}

interface SceneWithVariants {
  id: string;
  description: string;
  originalPrompt: string;
  generatedImages: GeneratedImage[];
}

interface StoryScene {
  id: string;
  description: string;
  visualPrompt: string;
}

export interface StoryVisuals {
  scenes: StoryScene[];
}

export const generateMultiStyleSceneImages = async (
  story: StoryVisuals
): Promise<SceneWithVariants[]> => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const results: SceneWithVariants[] = [];

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
  ];

  for (const scene of story.scenes) {
    const sceneResult: SceneWithVariants = {
      id: scene.id,
      description: scene.description,
      originalPrompt: scene.visualPrompt,
      generatedImages: [],
    };

    for (const style of artStyles) {
      try {
        // const response = await openai.images.generate({
        //   model: "dall-e-3",
        //   prompt: `${style.prompt}, ${scene.visualPrompt}`,
        //   n: 1,
        //   size: "1024x1024",
        //   quality: "standard",
        //   style: "vivid",
        // });

        const response = await openai.images.generate({
          model: "dall-e-2",
          prompt: `${style.prompt}, ${scene.visualPrompt}`,
          n: 1,
          size: "512x512",
        });

        console.log(response, "response");

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
