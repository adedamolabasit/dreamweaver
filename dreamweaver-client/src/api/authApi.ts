import apiClient from "./apiClient";
import { RegisterUserParams } from "../types/types";
import { ProfileResp } from "../types/types";
import axios from "axios";


export const registerUser = async (payload: {
  walletAddress: string;
}): Promise<RegisterUserParams> => {
  const { data } = await apiClient.post("/auth/register", payload);
  return data.data;
};

export const fetchUserProfile = async (walletAddress: string): Promise<any> => {
  const { data } = await apiClient.get(`/auth/${walletAddress}`);
  return data.data;
};

export const updateprofile = async (
  walletAddress: string,
  obj: { [key: string]: any }
): Promise<ProfileResp> => {
  const { data } = await apiClient.patch(`/auth/profile/${walletAddress}`, {
    ...obj,
  });
  return data.data;
};


export const fetchLicenseTerms = async (licenTermId: string) => {
  try {
    const response = await axios.get(
      `https://api.storyapis.com/api/v3/licenses/terms/${licenTermId}`,
      {
        headers: {
          "X-CHAIN": "story-aeneid", // or "story" for mainnet
          "X-API-Key": "MhBsxkU1z9fG6TofE59KqiiWV-YlYE8Q4awlLQehF3U",
        },
      }
    );

    console.log("License Terms:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching license terms:", error.response?.data || error.message);
    return null;
  }
};