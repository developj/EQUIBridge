import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../api';

export const useProfile = () =>
  useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });
