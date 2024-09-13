import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import React from 'react';

export default function RecentTransactions() {
  const transactionData = [
    {
      name: 'Spotify',
      amount: 15,
      status: 'Pending',
      date: '11th September',
    },
    {
      name: 'Spotify',
      amount: 15,
      status: 'Pending',
      date: '11th September',
    },
    {
      name: 'Spotify',
      amount: 15,
      status: 'Pending',
      date: '11th September',
    },
  ];

  const transactionClass = 'w-1/4 border-b bg-background py-5';
  return (
    <div className='w-full'>
      <div>
        <ul className='flex flex-row gap-4 text-lg font-semibold text-muted-foreground'>
          <li className='cursor-pointer border-b-2 border-primary/85 p-2 text-primary/85'>
            Transfers
          </li>
          <li className='cursor-pointer p-2'>Bills</li>
          <li className='cursor-pointer p-2'>Banks</li>
        </ul>
        <Separator />
      </div>
      {/* <div className='w-full rounded-lg bg-secondary my-2 flex items-center'>hello</div> */}
      <div className='my-2 flex w-full flex-col items-center rounded-lg bg-secondary'>
        <div className='flex w-full px-2 py-3 text-muted-foreground'>
          <div className='w-1/4'>Name</div>
          <div className='w-1/4'>Amount</div>
          <div className='w-1/4'>Status</div>
          <div className='w-1/4'>Date</div>
        </div>
        <Separator />
        {transactionData.map((item, index) => (
          <div
            key={index}
            className='flex h-24 w-full flex-row items-center bg-background'
          >
            <div
              className={cn(
                transactionClass,
                '-mt-4 flex items-center justify-start gap-2'
              )}
            >
              <Avatar>
                <AvatarFallback>{item.name[0]}</AvatarFallback>{' '}
              </Avatar>{' '}
              {item.name}
            </div>
            <div className={cn(transactionClass, 'font-bold text-green-500')}>
              ${item.amount}
            </div>
            <div className={transactionClass}>
              <Badge variant='outline'>{item.status}</Badge>
            </div>
            <div className={transactionClass}>{item.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
