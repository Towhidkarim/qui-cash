import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeader,
  TableBody,
} from '@/components/ui/table';
import React from 'react';

export default function RecentTransactions() {
  const transactionData = [
    {
      name: 'Spotify',
      amount: 15,
      status: 'Pending',
      date: '11th Sept',
    },
    {
      name: 'Spotify',
      amount: 15,
      status: 'Pending',
      date: '11th Sept',
    },
    {
      name: 'Spotify',
      amount: 15,
      status: 'Pending',
      date: '11th Sept',
    },
  ];

  const transactionClass = 'w-1/4 border-b bg-background py-6';
  return (
    <div className='w-full'>
      <div>
        <ul className='flex flex-row gap-4 text-lg font-semibold text-muted-foreground'>
          <li className='cursor-pointer border-b-2 border-primary/85 p-2 text-primary/85'>
            Transfers
          </li>
          <li className='cursor-pointer p-2'>Bills</li>
          <li className='cursor-pointer p-2'>Banks</li>
        </ul>
        <Separator />
      </div>
      <br />
      <Table>
        <TableHeader className=''>
          <TableRow className='bg-muted [&>*:first-child]:rounded-tl-lg [&>*:last-child]:rounded-tr-lg'>
            {['Transaction', 'Amount', 'Status', 'Date'].map((value, index) => (
              <TableHead className='py-4 text-muted-foreground' key={index}>
                {value}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className=''>
          {transactionData.map((item, index) => (
            <TableRow key={index}>
              <TableCell className='my-2 flex flex-row items-center justify-start gap-2'>
                <Avatar>
                  <AvatarFallback>{item.name[0]}</AvatarFallback>
                </Avatar>
                <span className=''>{item.name}</span>
              </TableCell>
              <TableCell className='max-w-[250px] px-4 font-semibold'>
                ${item.amount}
              </TableCell>
              <TableCell>
                <Badge variant='outline' className='text-xs'>
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell className='truncate'>{item.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <div className='w-full rounded-lg bg-secondary my-2 flex items-center'>hello</div> */}
    </div>
  );
}
