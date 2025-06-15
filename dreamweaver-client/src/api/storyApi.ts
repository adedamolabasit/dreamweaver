import axios from "axios";

const storyUrl = "https://api.storyapis.com/api/v3";

export const fetchLicenseTerms = async (licenTermId: string) => {
  try {
    const response = await axios.get(
      `${storyUrl}/licenses/terms/${licenTermId}`,
      {
        headers: {
          "X-CHAIN": "story-aeneid",
          "X-API-Key": "MhBsxkU1z9fG6TofE59KqiiWV-YlYE8Q4awlLQehF3U",
        },
      }
    );

    console.log("License Terms:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching license terms:",
      error.response?.data || error.message
    );
    return null;
  }
};

export const fetchLicenseTermForIP = async (ipId: string) => {
  try {
    const response = await axios.get(`${storyUrl}/licenses/ip/terms/${ipId}`, {
      headers: {
        "X-CHAIN": "story-aeneid",
        "X-API-Key": "MhBsxkU1z9fG6TofE59KqiiWV-YlYE8Q4awlLQehF3U",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching ip license terms:",
      error.response?.data || error.message
    );
    return null;
  }
};
