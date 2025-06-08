import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  weaveDream,
  initiateProducttion,
  fetchUserProductions,
  fetchProductionById,
  fetchAllProductions,
  updateProduction,
} from "../api/productionApi";
import { ProductionResponse } from "../types/types";

export const useWeaveDream = () => {
  const queryClient = useQueryClient();
  return useMutation<ProductionResponse, Error, string>({
    mutationFn: (journalId: string) => weaveDream(journalId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["weave"] });
    },
  });
};

export const useInitiateProduction = () => {
  const queryClient = useQueryClient();
  return useMutation<ProductionResponse, Error, string>({
    mutationFn: (productionId: string) => initiateProducttion(productionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["production"] });
    },
  });
};

export const useGetAllUsersProductions = () => {
  return useQuery<ProductionResponse[], Error>({
    queryKey: ["users-production"],
    queryFn: fetchUserProductions,
  });
};

export const useGetAllProductions = () => {
  return useQuery<ProductionResponse[], Error>({
    queryKey: ["all-production"],
    queryFn: fetchAllProductions,
  });
};

export const useGetProductionById = (id: string) => {
  return useQuery<ProductionResponse, Error>({
    queryKey: ["production-id", id],
    queryFn: () => fetchProductionById(id),
  });
};

export const useUpdateProduction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, obj }: { id: string; obj: { [key: string]: any } }) =>
      updateProduction(id, obj),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["update-production"] });
    },
  });
};
