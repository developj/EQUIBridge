import { useMutation } from '@tanstack/react-query';
import { login } from '../api';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: { email: string; password: string }) => login(data),
    onSuccess: () => {
      navigate('/dashboard');
    },
  });
};
