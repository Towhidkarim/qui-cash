'use client';

import CountUpAnimation from '@/components/count-up';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';

export default function AccountSection() {
  return (
    <>
      <h4 className='text-lg opacity-50'>Total Balance</h4>
      <div className='mb-2 mt-2 flex text-3xl md:text-4xl'>
        <CountUpAnimation end={5321} className='block' prefix='$' />
      </div>
      <Badge variant='outline' className='mb-4 opacity-60'>
        <TrendingUp size={14} className='mx-1' /> 3.6% Than Last week
      </Badge>
    </>
  );
}
