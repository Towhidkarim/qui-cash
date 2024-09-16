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

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tabsContents = [
    { title: 'home', icon: <HouseIcon />, content: '' },
    { title: 'payment transfer', icon: <ArrowLeftRight />, content: '' },
    { title: 'transaction history', icon: <Receipt />, content: '' },
    { title: 'my banks', icon: <BadgeDollarSign />, content: '' },
    { title: 'connect', icon: <CreditCard />, content: '' },
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
