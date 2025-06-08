import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { registerUser, fetchUserProfile } from "../api/authApi";
import { ProfileResp } from "../types/types";

export const useAuthUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["register-user"] });
    },
  });
};

export const useGetProfile = (walletAddress: string) => {
  return useQuery<ProfileResp, Error>({
    queryKey: ["all-journals"],
    queryFn: () => fetchUserProfile(walletAddress),
  });
};
