'use client';

import { BalanceChart } from '@/components/charts/balance-chart';
import CountUpAnimation from '@/components/count-up';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';
import { GetAccountInfoAction } from '../actions';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { useStore } from '@/lib/store';
import { queryKeys } from '@/lib/constants';
// import { useEffect } from 'react';

export default function AccountSection() {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await GetAccountInfoAction(),
    queryKey: [queryKeys.account],
    refetchOnMount: false,
  });
  // const store = useStore();

  const demo = useStore((state) => state.accountInfo);
  const setDemo = useStore((state) => state.setAccountInfo);
  // if (isLoading) return <></>;
  if (isLoading || isError || !data)
    return <Skeleton className='min-h-72 w-full rounded-md' />;
  setDemo(data);
  return (
    <section className='flex flex-col items-center justify-around md:h-72 md:flex-row'>
      <div className='flex flex-col items-center'>
        <h4 className='text-lg capitalize opacity-60'>
          {data.accountType} Account
        </h4>
        <h1>{demo.currencyMode}</h1>
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
        <div className='text- mt-2 flex text-xl text-green-500 md:text-2xl'>
          <CountUpAnimation end={200} className='block' prefix='+$' />
        </div>
        <div className='mb-2 flex text-xl text-destructive md:text-2xl'>
          <CountUpAnimation end={100} className='block' prefix='-$' />
        </div>
        <Badge variant='outline' className='mb-4 opacity-60'>
          <TrendingUp size={14} className='mx-1' /> 3.6% Than Last week
        </Badge>
      </div>
      <BalanceChart />
    </section>
  );
}
