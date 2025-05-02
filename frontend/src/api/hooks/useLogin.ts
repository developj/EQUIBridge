import { useMutation } from "@tanstack/react-query";
import { login, LoginUserType } from "../api";
// import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  // const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginUserType) => login(data),
    onSuccess: () => {
      // navigate("/dashboard");
    },
  });
};
