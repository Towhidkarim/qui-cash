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

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tabsContents = [
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
  return (
    <main className='w-svh flex flex-row gap-0'>
      <div className='hidden w-1/5 min-w-56 sm:block'>
        <TabMenu content={tabsContents} />
      </div>
      <div className='w-full sm:w-4/5'>{children}</div>
    </main>
  );
}
