import { apiClient } from "./apiClient";
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
  const { data } = await apiClient.get(`/production/user-storys`);
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

export const updateProduction = async (
  id: string,
  obj: { [key: string]: any }
): Promise<ProductionResponse> => {
  const { data } = await apiClient.patch(`/production/story/${id}`, {
    ...obj,
  });
  return data.data;
};


