'use client';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Table, TableRow, TableCell, TableBody } from '@/components/ui/table';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { GetTransactionHistoryAction } from '../actions';
import { queryKeys } from '@/lib/constants';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { useUserData } from '@/lib/hooks/useUserData';

export default function RecentTransactions({
  entryCount,
}: {
  entryCount?: number;
}) {
  const { data: userData } = useUserData();

  const RECENT_RECORD_COUNT = entryCount ?? 5;
  const { data, isLoading } = useQuery({
    queryFn: async () => GetTransactionHistoryAction(RECENT_RECORD_COUNT),
    queryKey: [queryKeys.recentTransactions],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading || !data) return <Skeleton className='w-full' />;
  const transactionClass = 'w-1/4 border-b bg-background py-6';
  return (
    <div className='w-full'>
      <br />
      {data.length === 0 ? (
        <h1 className='mb-10 text-center'>No History</h1>
      ) : (
        <Table>
          <TableBody className=''>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className='flex max-w-[250px] flex-row items-center justify-start gap-2 truncate pl-0'>
                  <Avatar className=''>
                    <AvatarFallback className='capitalize'>
                      {/* {userData?.username?.charAt(0) ?? ''} */}
                      {item.secondPerson[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className='flex flex-col truncate'>
                    <span className='font-semibold'>{item.secondPerson}</span>
                    <span className='text-xs capitalize text-muted-foreground'>
                      {item.transactionType}
                    </span>
                  </div>
                </TableCell>
                <TableCell
                  className={cn('truncate px-4 font-semibold', {
                    'text-green-500': item.transactionType === 'money received',
                    'text-rose-500': item.transactionType === 'money sent',
                  })}
                >
                  {`${item.transactionType === 'money received' ? '+' : '-'}${new Intl.NumberFormat(
                    'en-US',
                    {
                      style: 'currency',
                      currency: 'USD',
                    },
                  ).format(item.amount)}`}
                </TableCell>

                <TableCell className='pr-0 capitalize'>
                  {format(item.transactionTime, 'p, PP')}
                  <span className='block text-xs font-semibold text-gray-500'>
                    {item.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
