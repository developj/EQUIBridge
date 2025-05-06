import { useMutation } from "@tanstack/react-query";
import { login } from "../api";
import { useNavigate } from "react-router-dom";
import { LoginUserType } from "../interface";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginUserType) => login(data),
    onSuccess: () => {
      navigate("/");
    },
  });
};
