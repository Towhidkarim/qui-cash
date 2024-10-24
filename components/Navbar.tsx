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

export default function Navbar({ user }: { user: User | null }) {
  return (
    <nav className='flex h-16 w-full items-center justify-between py-5 pr-2'>
      <div className='font-semibold'>
        <p className='bg-transparent text-2xl capitalize text-primary/85 backdrop-blur-sm md:text-3xl'>
          <span className='text-foreground'></span> {user?.username}
        </p>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='ghost' className='block p-2 sm:hidden'>
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent className='min-w-72'>
          <SheetTitle>Menu</SheetTitle>
          {/* <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </SheetDescription>
                  </SheetHeader> */}
          <TabMenu content={tabsContents} />
        </SheetContent>
      </Sheet>
    </nav>
  );
}
