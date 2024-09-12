'use client';

import * as React from 'react';
import { TrendingUp } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import CountUpAnimation from '../count-up';

export const description = 'A donut chart with text';

const chartData = [
  { bank: 'One', balance: 2750, fill: 'var(--color-bankOne)' },
  { bank: 'Two', balance: 2000, fill: 'var(--color-bankTwo)' },
  { bank: 'Three', balance: 2870, fill: 'var(--color-bankThree)' },
  { bank: 'Four', balance: 1730, fill: 'var(--color-bankFour)' },
  { bank: 'other', balance: 190, fill: 'var(--color-others)' },
];

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

export function PieChartCard() {
  const totalBalance = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.balance, 0);
  }, []);

  return (
    <Card className='flex h-60 flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Total balance Chart</CardTitle>
        <CardDescription>January - Sept 2024</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0 pt-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[150px]'
        >
          <PieChart>
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey='balance'
              nameKey='bank'
              innerRadius={50}
              outerRadius={65}
              paddingAngle={2}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className='fill-foreground text-xl font-bold'
                        >
                          ${totalBalance.toLocaleString()}
                          {/* <CountUpAnimation value={totalBalance} /> */}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-muted-foreground'
                        >
                          in USD
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className='flex-col gap-2 text-sm'>
        <div className='flex items-center gap-2 font-medium leading-none'>
          Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
        </div>
        <div className='leading-none text-muted-foreground'>
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}
