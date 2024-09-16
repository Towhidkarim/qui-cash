import { PieChartCard } from '@/components/charts/piechart';
import CountUpAnimation from '@/components/count-up';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { ChartConfig } from '@/components/ui/chart';
import React from 'react';
import { Button } from '@/components/ui/button';
import RecentTransactions from '../recent-transactions';
import { MenuIcon } from 'lucide-react';

export default function TabHome() {
  const userName = 'Towhid Karim';

  const chartConfig = {
    balance: {
      label: 'Total Balance',
    },
    bankOne: {
      label: 'Bank One',
      color: 'hsl(var(--chart-1))',
    },
    bankTwo: {
      label: 'Bank Two',
      color: 'hsl(var(--chart-2))',
    },
    bankThree: {
      label: 'Bank Three',
      color: 'hsl(var(--chart-3))',
    },
    bankFour: {
      label: 'Bank Four',
      color: 'hsl(var(--chart-4))',
    },
    others: {
      label: 'Others',
      color: 'hsl(var(--chart-5))',
    },
  } satisfies ChartConfig;

  return (
    <div className='mx-6 mt-8'>
      <h1 className='my-2 text-2xl font-semibold md:text-3xl'>
        Welcome, <span className='text-primary/85'>{userName} </span>
      </h1>
      <h4 className='my-1 text-base text-muted-foreground'>
        Manage and access your accound and transactions efficiently
      </h4>
      <div className='my-4 flex w-full flex-col justify-around gap-5 md:flex-row'>
        <div className='w-full md:w-[48%]'>
          <PieChartCard />
        </div>
        <div className='w-full md:w-[48%]'>
          <Card>
            <CardHeader className='items-center font-semibold'>
              <CardTitle>Bank Balances</CardTitle>
              <CardDescription className='font-normal'>
                Total 5 Bank Connected
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className='h-24'>
                {['Ac', 'Dutch', 'Plyt'].map((item, index) => (
                  <li key={index} className='mx-auto my-2 font-semibold'>
                    <div className='flex flex-row gap-2'>
                      <div className='w-1/3'>{item}</div>
                      <div className='w-1/3 font-normal'>
                        $<CountUpAnimation value={Math.random() * 1000 + 500} />
                      </div>
                      <div className='w-1/3 font-normal'>
                        $
                        <CountUpAnimation
                          value={Math.random() * 10000 + 2000}
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </div>
      </div>
      <br />
      <div className='my-5 flex w-full justify-between'>
        <h1 className='text-2xl font-semibold'>Recent Transactions</h1>
        <Button variant='outline'>View All</Button>
      </div>
      <RecentTransactions />
    </div>
  );
}
