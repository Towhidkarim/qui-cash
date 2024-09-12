import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import React from 'react';

export default function RecentTransactions() {
  const transactionData = [
    {
      name: 'Sotify',
      amount: 15,
      status: 'Pending',
      date: '11th September',
    },
    {
      name: 'Sotify',
      amount: 15,
      status: 'Pending',
      date: '11th September',
    },
    {
      name: 'Sotify',
      amount: 15,
      status: 'Pending',
      date: '11th September',
    },
  ];
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
            className='flex w-full flex-row items-center rounded-lg bg-secondary'
          >
            <div className='w-1/4 border-b bg-background py-3'>{item.name}</div>
            <div className='w-1/4 border-b bg-background py-3'>
              {item.amount}
            </div>
            <div className='w-1/4 border-b bg-background py-3'>
              <Badge variant='outline'>{item.status}</Badge>
            </div>
            <div className='w-1/4 border-b bg-background py-3'>{item.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
