import Link from 'next/link';
import React from 'react';

export default function BasicServices({
  services,
}: {
  services: { title: string; icon: React.ReactNode; url: string }[];
}) {
  return (
    <div className='flex min-h-24 w-full grid-flow-col flex-row items-start justify-around gap-x-4'>
      {services.map((item, index) => (
        <Link
          href={item.url}
          key={index}
          className='flex h-full w-[20%] flex-col items-center justify-start gap-2 rounded-xl p-2 transition-all hover:bg-primary/5 md:w-[15%] md:gap-3 md:py-4 md:text-lg'
        >
          <div className='mt-2 rounded-2xl border border-primary/45 p-2 text-primary/85 md:p-3 [&>*:first-child]:stroke-2 lg:[&>*:first-child]:size-12'>
            {item.icon}
          </div>
          <div className='overflow-clip text-balance text-center text-xs md:text-base'>
            {item.title}
          </div>
        </Link>
      ))}
    </div>
  );
}
