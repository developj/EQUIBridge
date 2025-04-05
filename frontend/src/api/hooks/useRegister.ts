import { useMutation } from "@tanstack/react-query";
import { register } from "../api";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: {
      username: string;
      email: string;
      first_name: string;
      last_name: string;
      middle_name?: string | undefined;
      password: string;
    }) => register(data),
    onSuccess: () => {
      navigate("/dashboard");
    },
  });
};
