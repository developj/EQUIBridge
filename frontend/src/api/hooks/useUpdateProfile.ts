import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ExtendedProfileData } from "../interface";
import { updateProfile } from "../api";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ExtendedProfileData) => updateProfile(data),

    onSuccess: () => {
      // Invalidate the profile query to refetch updated data
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

