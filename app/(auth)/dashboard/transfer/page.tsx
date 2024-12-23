import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { routes } from '@/lib/constants';
import { validateRequest } from '@/lib/db/auth';
import { ScanLine } from 'lucide-react';
import { redirect } from 'next/navigation';

import { ScrollArea } from '@/components/ui/scroll-area';
import TransferSection from './transfer-section';

export default async function Page() {
  const { user } = await validateRequest();
  if (!user) redirect(routes.signin);
  return (
    <main className='flex h-svh flex-row px-2 text-center md:px-5 md:text-left'>
      <div className='w-full'>
        <ScrollArea className='h-[calc(100svh-4rem)]'>
          <h1 className='my-2 text-2xl font-semibold'>Transfer Funds</h1>
          <Separator className='my-5' />
          <TransferSection />
          {/* <div className='mx-auto grid max-w-md place-items-center rounded-lg p-5'>
            <h1 className='mb-4 mt-2'>Quick Transfer using QR Codes</h1>
            <Button
              variant='secondary'
              className='flex items-center justify-center gap-2'
            >
              <ScanLine size={18} />
              Scan
            </Button>
          </div>
          <div className='mx-auto my-4 max-w-md text-center text-sm text-muted-foreground'>
            <div className='relative h-12'>
              <Separator className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' />
              <h4 className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2'>
                OR
              </h4>
            </div>
            <h4>Transfer using their Mobile Number / Account ID</h4>
          </div>
          <TransferForm /> */}
        </ScrollArea>
      </div>
    </main>
  );
}
