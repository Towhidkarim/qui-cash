'use client';
import { Button } from '@/components/ui/button';
import visaImage from '@/public/images/icons/visa.svg';
import { Eye, EyeClosed } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function CreditCard({
  userName,
  cardNumber,
}: {
  userName: string;
  cardNumber: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const displayCardNumber = cardNumber.replace(/(.{4})/g, '$1 ');
  const hiddenCardNumber = '•••• •••• •••• ••••';
  return (
    <div className='relative my-2 h-44 w-full max-w-[350px] rounded-lg bg-gray-700 text-white'>
      <div className='flex h-full flex-col justify-between px-5 py-6'>
        <span className='text-lg capitalize'>{userName}</span>
        <div>
          <div className='mt-2 flex items-center justify-between gap-5 text-xl'>
            <span>{isVisible ? displayCardNumber : hiddenCardNumber}</span>
            <Button
              onClick={() => setIsVisible(!isVisible)}
              variant='ghost'
              size='icon'
            >
              {isVisible ? <Eye /> : <EyeClosed />}
            </Button>
          </div>
          <span className='flex w-full flex-row justify-between'>
            <h4 className='font-bold tracking-wide'>QuiCash</h4>
          </span>
        </div>
      </div>
      <Image
        src={visaImage}
        alt='visa'
        className='pointer-events-none absolute right-5 top-4 h-auto w-auto'
      />
    </div>
  );
}
