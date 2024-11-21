import FadeEffect from '@/components/framer/FadeEffect';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import TabMenu from './components/tabmenu';
import { Tabs } from '@/components/ui/tabs';
import {
  ArrowLeftRight,
  ArrowUpFromDot,
  BadgeDollarSign,
  BadgePlus,
  CircleDollarSign,
  CreditCard,
  HandCoins,
  HouseIcon,
  MenuIcon,
  Receipt,
  TrendingUp,
  LucideIcon,
  ScanQrCode,
} from 'lucide-react';
import { TabsContent } from '@radix-ui/react-tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BasicServices from './components/basic-services';
import RecentTransactions from './components/recent-transactions';
import { validateRequest } from '@/lib/db/auth';
import { redirect } from 'next/navigation';
import { routes } from '@/lib/constants';
import CountUpAnimation from '@/components/count-up';
import AccountSection from './components/account-section';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

const basicServices = [
  { title: 'Transfer Funds', icon: <ArrowLeftRight />, url: routes.transfer },
  { title: 'QR Scan', icon: <ScanQrCode />, url: routes.scan },
  { title: 'Payment', icon: <HandCoins />, url: routes.transfer },
  { title: 'Add Funds', icon: <BadgePlus />, url: routes.addFunds },
];

export default async function Page() {
  const { user } = await validateRequest();
  // if (!user) redirect(routes.signin);

  return (
    <div className='h-svh overflow-hidden px-1 md:px-5'>
      <FadeEffect>
        {/* <div className='hidden w-1/5 min-w-56 sm:block'>
            {/* <TabMenu content={tabsContents} /> 
          </div> */}
        <div className='flex h-svh flex-row'>
          <div className='h-svh w-full'>
            {/* <Navbar user={user} /> */}
            <ScrollArea className='h-[calc(100svh-4rem)] px-1 md:px-5'>
              <br />
              <AccountSection />
              <h1 className='mb-0 mt-2 font-semibold md:text-xl'>
                Basic Services
              </h1>
              <BasicServices services={basicServices} />
              <br />
              <div className='my-3 flex flex-row items-center justify-between'>
                <h1 className='textl-lg font-semibold md:text-xl'>
                  Recent Transactions
                </h1>
                <Button variant='ghost' asChild>
                  <Link href={routes.transactionHistory}>View All</Link>
                </Button>
              </div>
              <RecentTransactions />
              <br />
            </ScrollArea>
          </div>
        </div>
      </FadeEffect>
    </div>
  );
}
