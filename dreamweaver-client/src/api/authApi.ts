import apiClient from "./apiClient";
import { RegisterUserParams } from "../types/types";

export const registerUser = async (payload: {
  walletAddress: string;
}): Promise<RegisterUserParams> => {
  const { data } = await apiClient.post("/auth/register", payload);
  return data.data;
};
