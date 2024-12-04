import { BalanceChart } from '@/components/charts/balance-chart';
import React from 'react';

export default function page() {
  return (
    <div>
      <h1 className='my-3 text-xl font-semibold'>Stat Page</h1>
      <div className='flex items-start justify-center'>
        <BalanceChart />
      </div>
    </div>
  );
}
