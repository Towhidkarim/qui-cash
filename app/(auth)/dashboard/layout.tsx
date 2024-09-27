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
import { routes } from '@/lib/constants';

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

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='w-svh flex flex-row gap-0'>
      <div className='hidden min-h-svh w-1/5 min-w-56 border-r sm:block'>
        <TabMenu content={tabsContents} />
      </div>
      <div className='w-full sm:w-4/5'>{children}</div>
    </main>
  );
}
