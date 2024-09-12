'use client';
import { Input } from '@/components/ui/input';
import React from 'react';
import { TtabsContent } from '../page';
import { TabsTrigger } from '@radix-ui/react-tabs';
import { TabsList } from '@/components/ui/tabs';

export default function TabMenu({ content }: { content: TtabsContent }) {
  return (
    <div className='flex flex-col items-center justify-between px-3'>
      <h1 className='my-2 text-2xl font-bold text-primary'>QuiCash</h1>
      <Input className='my-3 w-full' placeholder='search' />
      <TabsList className='mt-4 w-full'>
        {content.map((item, index) => (
          <TabsTrigger
            className='my-2 flex w-full items-center justify-start gap-4 whitespace-nowrap rounded-md py-3 pl-5 font-semibold capitalize text-foreground transition-all hover:bg-primary/10 focus-visible:scale-50 data-[state=active]:bg-primary/85 data-[state=active]:text-primary-foreground'
            key={index}
            value={item.title}
          >
            {item.icon}
            {item.title}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
}
