import { useQuery, UseQueryOptions, keepPreviousData } from '@tanstack/react-query';
import { getProfile } from '../api';
import { ExtendedProfileData } from '../interface';

export const useProfile = (
  options?: Omit<UseQueryOptions<ExtendedProfileData, Error>, 'queryKey' | 'queryFn'>
) => {
  const queryKey = ['profile'].filter(Boolean);
  return useQuery<ExtendedProfileData, Error>({
    queryKey: queryKey,
    queryFn: () => getProfile(), 
    placeholderData: keepPreviousData,
    staleTime: 10 * 60 * 1000, // Default staleTime: 10 minutes
    ...options,
  });
};