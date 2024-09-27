import { GetAccountInfoAction } from '@/app/(auth)/dashboard/actions';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../constants';

export const useAccountData = () =>
  useQuery({
    queryFn: async () => await GetAccountInfoAction(),
    queryKey: [queryKeys.account],
    refetchOnMount: false,
    staleTime: 5 * 60 * 1000, //5 minutes
  });
