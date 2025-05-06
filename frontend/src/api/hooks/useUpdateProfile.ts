import { useMutation } from "@tanstack/react-query";
import { ExtendedProfileData } from "../interface";
import { updateProfile } from "../api";

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: (data: ExtendedProfileData) => updateProfile(data),

    onSuccess: () => {},
  });
};
