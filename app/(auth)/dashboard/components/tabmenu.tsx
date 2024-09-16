'use client';
import { Input } from '@/components/ui/input';
import React from 'react';
import { TtabsContent } from '../page';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { routes } from '@/lib/constants';

export default function TabMenu({ content }: { content: TtabsContent }) {
  const pathName = usePathname();

  return (
    <div className='flex flex-col items-center justify-between px-3'>
      <h1 className='my-2 mt-6 text-3xl font-bold text-primary'>QuiCash</h1>
      <Input className='my-3 w-full' placeholder='search' />
      <div className='mt-4 w-full'>
        {content.map((item, index) => {
          const isActive = pathName.includes(item.url);
          return (
            <Link
              href={item.url ?? '#'}
              className={cn(
                'my-2 flex w-full items-center justify-start gap-4 whitespace-nowrap rounded-md py-3 pl-5 font-semibold capitalize text-foreground transition-all hover:bg-primary/10 focus-visible:scale-50',
                {
                  'bg-primary/75 text-primary-foreground hover:bg-primary/85':
                    isActive ||
                    (pathName === routes.dashboard && item.title === 'home'),
                },
              )}
              key={index}
            >
              {item.icon}
              {item.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
