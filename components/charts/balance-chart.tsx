'use client';

import { Loader2, TrendingUp } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import { getDate, format, formatDate } from 'date-fns';
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
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GetTransactionHistoryAction } from '@/app/(auth)/dashboard/actions';
import { queryKeys } from '@/lib/constants';
import { useUserData } from '@/lib/hooks/useUserData';

export const description = 'Balance Chart';

const chartData = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 500 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
];

const chartConfig = {
  amount: {
    label: 'Amount',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function BalanceChart() {
  const [isMounted, setIsMounted] = useState(false);
  const { data: userData, isLoading: userIsLoading } = useUserData();
  const { data: trxData, isLoading } = useQuery({
    queryFn: async () => GetTransactionHistoryAction(10),
    queryKey: [queryKeys.recentTransactions],
  });

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return;
  if (isLoading || userIsLoading)
    return (
      <span className='animate-spin'>
        <Loader2 size={36} />
      </span>
    );
  let refiedData = trxData?.map((item, index) => ({
    day: formatDate(item.transactionTime, 'do'),
    amount: item.amount,
  }));
  refiedData = refiedData?.filter((item, index) => index < 10);
  return (
    <Card className='border-none shadow-none'>
      <CardHeader>
        <CardDescription>
          {format(new Date(), 'MMMM yyy')} - Inward Chart
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className='h-56 max-w-[80svw]' config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={refiedData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='day'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey='amount'
              type='natural'
              stroke='var(--color-amount)'
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col items-start gap-2 text-sm'></CardFooter>
    </Card>
  );
}
