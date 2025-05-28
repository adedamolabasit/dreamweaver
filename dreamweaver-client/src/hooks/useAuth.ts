import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "../api/authApi";

export const useAuthUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["register-user"] });
    },
  });
};
