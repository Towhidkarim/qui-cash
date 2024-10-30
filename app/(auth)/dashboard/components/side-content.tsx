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

export default async function SideContent() {
  const { user } = await validateRequest();
  return (
    <aside className='hidden h-svh lg:block'>
      <Image
        src={profileBanner}
        className='z-0 h-auto w-full rounded-t-sm'
        alt=''
      />
      <div className='mx-4 block -translate-y-16'>
        <Avatar className=''>
          <AvatarFallback className='size-24 text-2xl'>T</AvatarFallback>
        </Avatar>
        <br />
        <h1 className='text-lg font-semibold'>{user?.username}</h1>
        <h4 className='text-sm text-muted-foreground'>{user?.email}</h4>
        <div className='my-8'>
          <h1 className='flex flex-row items-center justify-between font-semibold'>
            My Cards
            <Button variant='ghost'>
              <Plus className='' />
            </Button>
          </h1>
          <div className='relative my-2 h-44 w-full rounded-lg bg-gray-700 text-white'>
            <div className='flex h-full flex-col justify-between px-5 py-6'>
              <span className='text-lg capitalize'>{user?.username}</span>
              <span>
                <span className='flex w-full flex-row justify-between'>
                  <h4>{user?.username}</h4>
                  {`12/24`}
                </span>
                <span className='mt-2 text-xl'>•••• •••• •••• 1234</span>
              </span>
            </div>
            <Image
              src={visaImage}
              alt='visa'
              className='pointer-events-none absolute bottom-2 right-4 h-auto w-auto'
            />
          </div>
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
    </aside>
  );
}
