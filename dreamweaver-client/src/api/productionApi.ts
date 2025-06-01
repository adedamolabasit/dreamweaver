import { apiClient, publicApiClient } from "./apiClient";
import { ProductionResponse } from "../types/types";

export const weaveDream = async (id: string): Promise<ProductionResponse> => {
  const response = await apiClient.post(`/production/weave/${id}`);
  return response.data.data as ProductionResponse;
};

export const initiateProducttion = async (
  productionId: string
): Promise<ProductionResponse> => {
  const response = await apiClient.post(`/production/initiate/${productionId}`);
  return response.data.data as ProductionResponse;
};

export const fetchUserProductions = async (): Promise<ProductionResponse[]> => {
  const { data } = await apiClient.get(`/production/storys/1`);
  return data.data;
};

export const fetchAllProductions = async (): Promise<ProductionResponse[]> => {
  const { data } = await apiClient.get(`/production/storys`);
  return data.data;
};

export const fetchProductionById = async (
  id: string
): Promise<ProductionResponse> => {
  const { data } = await apiClient.get(`/production/story/${id}`);
  return data.data;
};
