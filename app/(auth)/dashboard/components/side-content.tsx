import { AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { validateRequest } from '@/lib/db/auth';
import profileBanner from '@/public/images/profile_banner.svg';
import visaImage from '@/public/images/icons/visa.svg';
import { Avatar } from '@radix-ui/react-avatar';
import { Plus, Rss } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAccountData } from '@/lib/hooks/useAccountData';
import { GetAccountInfoAction } from '../actions';
import CreditCard from './credit-card';

export default async function SideContent() {
  const { user } = await validateRequest();
  const accountData = await GetAccountInfoAction();

  return (
    <ScrollArea className='hidden h-[calc(100svh-4rem)] lg:block'>
      <Image
        src={profileBanner}
        className='z-0 h-auto w-full rounded-t-sm'
        alt=''
      />
      <div className='mx-4 block -translate-y-16'>
        <Avatar className=''>
          <AvatarFallback className='size-24 text-2xl ring-4 ring-white'>
            T
          </AvatarFallback>
        </Avatar>
        <br />
        <h1 className='text-lg font-semibold'>{user?.username}</h1>
        <h4 className='text-sm capitalize text-muted-foreground'>
          {`${accountData?.accountType} Account`}
        </h4>
        <div className='my-8'>
          <h1 className='flex flex-row items-center justify-between font-semibold'>
            My Cards
            <Button variant='ghost'>
              <Plus className='' />
            </Button>
          </h1>
          <CreditCard
            userName={user?.username ?? ''}
            cardNumber='1234123412341234'
          />
          <Separator orientation='horizontal' className='my-6' />
          <div className=''>
            <h1 className='mb-2 flex flex-row items-center justify-between font-semibold'>
              My expenditure
            </h1>
            <div className='flex w-full flex-row items-center justify-between rounded-lg bg-primary/10 p-2 py-4'>
              <div className='grid size-10 place-items-center rounded-full bg-primary/20'>
                <Rss className='stroke-primary/75' />
              </div>
              <div className='mx-2 flex w-10/12 flex-col'>
                <span className='flex w-full flex-row justify-between font-semibold text-primary'>
                  Subscriptions
                  <span className='text-sm font-normal'>$25 spent</span>
                </span>
                <Progress className='my-2' value={45} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
