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
  { title: 'connect', icon: <CreditCard />, url: routes.connect },
];

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();
  return (
    <SidebarProvider>
      <main className='w-svh flex w-full flex-row gap-0'>
        {/* <div className='hidden min-h-svh  border-r sm:block'> */}
        <AppSidebar items={tabsContents} />
        {/* </div> */}
        <div className='mx-4 w-full'>
          <Navbar sidebarTrigger={<SidebarTrigger />} user={user} />
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
