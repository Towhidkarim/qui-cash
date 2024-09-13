import FadeEffect from '@/components/framer/FadeEffect';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import TabMenu from './components/tabmenu';
import { Tabs } from '@/components/ui/tabs';
import {
  ArrowLeftRight,
  BadgeDollarSign,
  CreditCard,
  HouseIcon,
  Receipt,
} from 'lucide-react';
import { TabsContent } from '@radix-ui/react-tabs';
import TabHome from './components/tabcontents/tab-home';
import { ScrollArea } from '@/components/ui/scroll-area';

export type TtabsContent = {
  title: string;
  icon: React.JSX.Element;
  content: React.ReactNode;
}[];
const tabsContents = [
  { title: 'home', icon: <HouseIcon />, content: <TabHome /> },
  { title: 'payment transfer', icon: <ArrowLeftRight />, content: '' },
  { title: 'transaction history', icon: <Receipt />, content: '' },
  { title: 'my banks', icon: <BadgeDollarSign />, content: '' },
  { title: 'connect', icon: <CreditCard />, content: '' },
];

export default function Page() {
  return (
    <main className='w-svh min-h-svh'>
      <FadeEffect>
        <Tabs
          defaultValue={tabsContents[0].title}
          className='flex min-h-svh w-full flex-row'
        >
          <div className='w-1/5 max-w-64'>
            <TabMenu content={tabsContents} />
          </div>
          <div className='w-3/5 border-l border-r'>
            {tabsContents.map((item, index) => (
              <TabsContent key={index} value={item.title}>
                <ScrollArea className='h-svh'>
                  <FadeEffect>{item.content}</FadeEffect>
                </ScrollArea>
              </TabsContent>
            ))}
          </div>
          <div className='w-1/5'>Side content</div>
        </Tabs>
      </FadeEffect>
    </main>
  );
}
