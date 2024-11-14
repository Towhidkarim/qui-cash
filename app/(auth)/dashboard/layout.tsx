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
import TabMenu from './components/tabmenu';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { routes } from '@/lib/constants';
import { AppSidebar } from './components/app-sidebar';
import Navbar from '@/components/Navbar';
import { validateRequest } from '@/lib/db/auth';
import FadeEffect from '@/components/framer/FadeEffect';
import SideContent from './components/side-content';
import { ScrollArea } from '@/components/ui/scroll-area';

export type TtabsContent = {
  title: string;
  icon: React.ReactNode;
  url: string;
}[];
export const tabsContents: TtabsContent = [
  { title: 'home', icon: <HouseIcon />, url: routes.dashboard },
  {
    title: 'payment transfer',
    icon: <ArrowLeftRight />,
    url: routes.transfer,
  },
  {
    title: 'transaction history',
    icon: <Receipt />,
    url: routes.transactionHistory,
  },
  { title: 'my banks', icon: <BadgeDollarSign />, url: routes.banks },
  { title: 'cards', icon: <CreditCard />, url: routes.cards },
];

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();
  return (
    <SidebarProvider>
      <main className='flex h-svh w-full flex-row gap-0'>
        {/* <div className='hidden min-h-svh  border-r sm:block'> */}
        <AppSidebar items={tabsContents} />
        {/* </div> */}
        <div className='w-full px-2 md:mx-4'>
          <Navbar sidebarTrigger={<SidebarTrigger />} user={user} />
          <div className='flex h-[calc(100svh-4rem)] flex-row overflow-hidden'>
            <div className='w-full md:w-3/4'>{children}</div>
            <SideContent />
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
