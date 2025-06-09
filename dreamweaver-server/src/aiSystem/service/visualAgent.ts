import OpenAI from "openai";
import axios from "axios";
import FormData from "form-data";
import logger from "../../utils/logger";

export interface GeneratedImage {
  url: string;
  style: string;
  ipfsHash: string;
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

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;

const uploadToPinata = async (
  imageUrl: string,
  productionId: string,
  sceneId: string,
  style: string
): Promise<{ pinataUrl: string; ipfsHash: string }> => {
  try {
    const response = await axios.get(imageUrl, { responseType: "stream" });

    const formData = new FormData();
    formData.append("file", response.data, {
      filename: `image-${productionId}-${sceneId}.png`,
    });

    const metadata = {
      name: `production-${productionId}-scene-${sceneId}`,
      keyvalues: {
        productionId,
        sceneId,
        style,
      },
    };

    formData.append("pinataMetadata", JSON.stringify(metadata));
    formData.append("pinataOptions", JSON.stringify({ cidVersion: 1 }));

    const pinataRes = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: Infinity,
        headers: {
          ...formData.getHeaders(),
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET_API_KEY,
        },
      }
    );

    return {
      pinataUrl: `https://gateway.pinata.cloud/ipfs/${pinataRes.data.IpfsHash}`,
      ipfsHash: pinataRes.data.IpfsHash,
    };
  } catch (error: any) {
    logger.error(
      "Error during image download or Pinata upload:",
      error?.response?.data || error.message
    );
    throw new Error("Failed to upload image to Pinata.");
  }
};

export const generateComicStyleSceneImages = async (
  story: StoryVisuals,
  productionId: string
): Promise<SceneWithVariants[]> => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const results: SceneWithVariants[] = [];

  const comicStyle = {
    name: "Comic Book",
    prompt: "Comic book style, bold outlines, halftone shading",
  };

  for (const scene of story.scenes) {
    const sceneResult: SceneWithVariants = {
      id: scene.id,
      description: scene.description,
      originalPrompt: scene.visualPrompt,
      generatedImages: [],
    };

    try {
      const response = await openai.images.generate({
        model: "dall-e-2",
        prompt: `${comicStyle.prompt}, ${scene.visualPrompt}`,
        n: 1,
        size: "512x512",
      });

      if (response.data?.[0]?.url) {
        const openAiUrl = response.data[0].url;
        const { pinataUrl, ipfsHash } = await uploadToPinata(
          openAiUrl,
          productionId,
          scene.id,
          comicStyle.name
        );

        sceneResult.generatedImages.push({
          url: pinataUrl,
          style: comicStyle.name,
          ipfsHash: ipfsHash,
        });
      }
    } catch (error) {
      console.error(
        `Failed to generate comic variant for scene: ${scene.description}`
      );
      console.error(error);
    }

    results.push(sceneResult);
  }

  return results;
};
