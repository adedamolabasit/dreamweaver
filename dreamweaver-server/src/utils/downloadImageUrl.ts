import axios from "axios";
import FormData from "form-data";
import logger from "./logger";

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;

export const DownloadImageUrl = async (
  imageUrl: string,
  productionId: string,
  sceneId: string,
  style: string
) => {
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

    return { pinataData: pinataRes.data };
  } catch (error: any) {
    logger.error(
      "Error during image download or Pinata upload:",
      error?.response?.data || error.message
    );
    throw new Error("Failed to upload image to Pinata.");
  }
};
