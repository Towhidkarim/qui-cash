import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../constants';
import GetUserInfoAction from '../global-actions/GetUserInfoAction';

export const useUserData = () =>
  useQuery({
    queryFn: async () => await GetUserInfoAction(),
    queryKey: [queryKeys.user],
    refetchOnMount: false,
    staleTime: 5 * 60 * 1000, //5 minutes
  });
