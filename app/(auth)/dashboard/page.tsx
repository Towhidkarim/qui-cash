import FadeEffect from '@/components/framer/FadeEffect';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import TabMenu from './components/tabmenu';
import { Tabs } from '@/components/ui/tabs';
import {
  ArrowLeftRight,
  BadgeDollarSign,
  BadgePlus,
  CircleDollarSign,
  CreditCard,
  HandCoins,
  HouseIcon,
  MenuIcon,
  Receipt,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { TabsContent } from '@radix-ui/react-tabs';
import TabHome from './components/tabcontents/tab-home';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BasicServices from './components/basic-services';
import RecentTransactions from './components/recent-transactions';
import { validateRequest } from '@/lib/db/auth';
import { redirect } from 'next/navigation';
import { routes } from '@/lib/constants';
import CountUpAnimation from '@/components/count-up';

export type TtabsContent = {
  title: string;
  icon: React.JSX.Element;
  url: string;
}[];
const tabsContents = [
  { title: 'home', icon: <HouseIcon />, url: '' },
  { title: 'payment transfer', icon: <ArrowLeftRight />, url: '' },
  { title: 'transaction history', icon: <Receipt />, url: '' },
  { title: 'my banks', icon: <BadgeDollarSign />, url: '' },
  { title: 'connect', icon: <CreditCard />, url: '' },
];

const basicServices = [
  { title: 'Transfer Funds', icon: <ArrowLeftRight />, url: '' },
  { title: 'Add Funds', icon: <CircleDollarSign />, url: '' },
  { title: 'Payment', icon: <HandCoins />, url: '' },
  { title: 'Add Funds', icon: <BadgePlus />, url: '' },
];

export default async function Page() {
  const { user } = await validateRequest();
  if (!user) redirect(routes.signin);

  return (
    <div className='h-svh w-full overflow-hidden'>
      <FadeEffect>
        {/* <div className='hidden w-1/5 min-w-56 sm:block'>
            {/* <TabMenu content={tabsContents} /> 
          </div> */}
        <div className='flex h-svh flex-row'>
          <div className='h-svh w-full border-x px-2 lg:w-4/5'>
            <nav className='flex w-full items-start justify-between px-1 py-5 pr-2 md:px-5'>
              <div className='font-semibold'>
                <p className='text-2xl capitalize text-primary/85 md:text-3xl'>
                  {user.username}
                </p>
                <Badge
                  variant='outline'
                  className='border-primary text-xs text-foreground/70 sm:my-2'
                >
                  Balance: {` $`}
                  <CountUpAnimation value={1553} />
                </Badge>
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant='ghost' className='block p-2 sm:hidden'>
                    <MenuIcon />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </nav>
            <div className='px-1 md:px-5'>
              <h1 className='my-2 font-semibold md:text-xl'>Basic Services</h1>
              <BasicServices services={basicServices} />
              <br /> <br />
              <div className='my-3 flex flex-row justify-between'>
                <h1 className='textl-lg font-semibold md:text-xl'>
                  Recent Transactions
                </h1>
                <Button variant='outline'>View All</Button>
              </div>
              <RecentTransactions />
            </div>
          </div>
          <div className='hidden w-1/5 lg:block'>Side content</div>
        </div>
      </FadeEffect>
    </div>
  );
}
