import apiClient from "./apiClient";
import { RegisterUserParams } from "../types/types";
import { ProfileResp } from "../types/types";

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
export const fetchUserProfileById = async (id: string): Promise<any> => {
  const { data } = await apiClient.get(`/auth/user/${id}`);
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
