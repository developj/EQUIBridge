import { useMutation } from "@tanstack/react-query";
import { register } from "../api";
// import { useNavigate } from "react-router-dom";
import { RegisterUserType } from "../api";

export const useRegister = () => {
  // const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterUserType) => register(data),
    onSuccess: () => {
      // navigate("/dashboard");
    },
  });
};
