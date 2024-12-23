'use client';

import { BalanceChart } from '@/components/charts/balance-chart';
import CountUpAnimation from '@/components/count-up';
import { Badge } from '@/components/ui/badge';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { GetAccountInfoAction, GetRecentTransactionTotal } from '../actions';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { useStore } from '@/lib/store';
import { queryKeys } from '@/lib/constants';
import { useAccountData } from '@/lib/hooks/useAccountData';
// import { useEffect } from 'react';

export default function AccountSection() {
  const { data, isLoading, isError } = useAccountData();
  const { data: transactionSum, isLoading: sumIsLoading } = useQuery({
    queryFn: async () => GetRecentTransactionTotal(),
    queryKey: [queryKeys.account, queryKeys.recentTransactions],
    staleTime: 5 * 60 * 1000,
  });
  // const store = useStore();

  // if (isLoading) return <></>;
  const demo = useStore((state) => state.accountInfo);
  const setDemo = useStore((state) => state.setAccountInfo);
  if (isLoading || isError || !data || sumIsLoading || !transactionSum)
    return <Skeleton className='min-h-72 w-full rounded-md' />;
  // else setDemo(data);
  return (
    <section className='flex flex-col items-center justify-around md:h-56 md:flex-row'>
      <div className='flex w-full flex-row justify-around'>
        <div>
          <h4 className='text-lg capitalize opacity-60'>
            {data.accountType} Account
          </h4>
          <h1>{data.currencyMode}</h1>
          <div className='m-auto mb-1 mt-2 flex h-14 text-3xl font-semibold md:text-4xl'>
            {isLoading ? (
              <Skeleton className='h-14 w-64 rounded-md' />
            ) : (
              <CountUpAnimation
                end={data?.balance ?? 0}
                className='block'
                prefix='$'
              />
            )}
          </div>
        </div>
        <div>
          <div className='text- mt-2 flex text-xl text-green-500 md:text-2xl'>
            <CountUpAnimation
              end={transactionSum?.inward ?? 0}
              className='block'
              prefix='+$'
            />
          </div>
          <div className='mb-2 flex text-xl text-destructive md:text-2xl'>
            <CountUpAnimation
              end={transactionSum?.outward ?? 0}
              className='block'
              prefix='-$'
            />
          </div>
          <Badge variant='outline' className='mb-4 opacity-60'>
            {transactionSum &&
            transactionSum?.outward > transactionSum?.inward ? (
              <TrendingUp size={14} className='mx-1' />
            ) : (
              <TrendingDown size={14} className='mx-1' />
            )}
            Spent Last week
          </Badge>
        </div>
      </div>
      {/* <BalanceChart /> */}
    </section>
  );
}
