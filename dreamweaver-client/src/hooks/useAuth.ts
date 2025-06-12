import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { registerUser, fetchUserProfile, updateprofile } from "../api/authApi";

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
    queryKey: ["all-journals"],
    queryFn: () => fetchUserProfile(walletAddress),
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ obj }: { obj: { [key: string]: any } }) =>
      updateprofile(obj),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["update-profile"] });
    },
  });
};
