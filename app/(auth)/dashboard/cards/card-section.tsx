'use client';
import CreditCard from '../components/credit-card';
import { Button } from '@/components/ui/button';
import { Bolt, ReceiptText, Settings2, Snowflake } from 'lucide-react';

export default function CardSection({
  userName,
  cardNumber,
  balance,
}: {
  userName: string;
  cardNumber: string;
  balance: number;
}) {
  const cardOptions = [
    { icon: <Snowflake />, title: 'freeze', onClick: () => {} },
    { icon: <Settings2 />, title: 'limits', onClick: () => {} },
    { icon: <ReceiptText />, title: 'bill', onClick: () => {} },
    { icon: <Bolt />, title: 'settings', onClick: () => {} },
  ];
  return (
    <div className='flex w-full max-w-[350px] flex-col gap-2'>
      <div className='-mb-3 flex w-full flex-row justify-between px-2'>
        <span>Available to Spend</span>
        <span className='font-semibold'>${balance}</span>
      </div>
      <CreditCard userName={userName} cardNumber={cardNumber} />
      <div className='flex w-full flex-row justify-between'>
        {cardOptions.map((item, index) => (
          <Button
            key={index}
            variant='ghost'
            className='flex h-auto flex-col gap-2 opacity-80'
          >
            {item.icon}
            <span className='text-xs font-light capitalize'>{item.title}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
