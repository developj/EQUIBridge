import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../api";
import { useNavigate } from "react-router-dom";
import { LoginUserType } from "../interface";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LoginUserType) => login(data),
    onSuccess: () => {
      // Invalidate the profile query to refetch updated data
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      navigate("/");
    },
  });
};
