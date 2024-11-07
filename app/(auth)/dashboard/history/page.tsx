import React from 'react';
import RecentTransactions from '../components/recent-transactions';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function History() {
  return (
    <ScrollArea className='mx-2 h-[calc(100svh-4rem)]'>
      <h1 className='text-xl font-semibold'>Transaction History</h1>
      <RecentTransactions />
    </ScrollArea>
  );
}
