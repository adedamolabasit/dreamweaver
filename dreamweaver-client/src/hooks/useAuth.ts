import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  registerUser,
  fetchUserProfile,
  updateprofile,
  fetchUserProfileById,
} from "../api/authApi";

import { ProfileResp } from "../page-components/profile/types";

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
    queryKey: ["get-profile"],
    queryFn: () => fetchUserProfile(walletAddress),
  });
};

export const useGetProfileById = (id: string) => {
  return useQuery<{ profile: { username: string } }, Error>({
    queryKey: ["get-profile-id"],
    queryFn: () => fetchUserProfileById(id),
    enabled: !!id,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      walletAddress,
      obj,
    }: {
      walletAddress: string;
      obj: { [key: string]: any };
    }) => updateprofile(walletAddress, obj),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["update-profile"] });
    },
  });
};
