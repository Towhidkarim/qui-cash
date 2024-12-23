import { User } from 'lucia';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  ArrowLeftRight,
  ArrowUpFromDot,
  BadgeDollarSign,
  BadgePlus,
  CircleDollarSign,
  CreditCard,
  HandCoins,
  HouseIcon,
  LucideIcon,
  MenuIcon,
  Receipt,
  TrendingUp,
} from 'lucide-react';
import { Button } from './ui/button';
import TabMenu from '@/app/(auth)/dashboard/components/tabmenu';
import { routes, TtabsContent } from '@/lib/constants';
import React from 'react';
import Link from 'next/link';
import NavTitle from './NavTitle';
import MyQRCode from '@/app/(auth)/dashboard/components/my-qr-code';

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

export default function Navbar({
  user,
  sidebarTrigger,
}: {
  user: User | null;
  sidebarTrigger: React.ReactNode;
}) {
  return (
    <nav className='flex h-16 w-full items-center justify-between'>
      {/* <div className='font-semibold'>
        <p className='bg-transparent text-2xl capitalize text-primary/85 backdrop-blur-sm md:text-3xl'>
          <span className='text-foreground'></span> {user?.username}
        </p>
      </div> */}
      <Breadcrumb>
        <BreadcrumbList className='text-primary/80'>
          <BreadcrumbItem className=''>
            <BreadcrumbLink asChild>
              <Link href={routes.dashboard}>Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className='' />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <NavTitle />
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className='flex items-center justify-center gap-2'>
        <MyQRCode />
        {sidebarTrigger}
      </div>
    </nav>
  );
}
