import { Clover } from 'lucide-react';
import heroImage from '@/public/images/hero_image.svg';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { routes } from '@/lib/constants';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export default function HeroSection() {
  return (
    <section className='container my-10 flex w-svw flex-col-reverse items-center justify-center gap-20 px-5 md:flex-row'>
      <div className='flex w-full flex-col gap-3 md:w-2/5'>
        <span className='flex gap-2 text-muted-foreground'>
          <Clover />
          Fintech Product of the future
        </span>
        <h1 className='mb-4 text-4xl font-extrabold text-primary/90'>
          Transfer Money With a New Era of Banking
        </h1>

        <p className='max-w-[60ch] tracking-wide text-secondary-foreground'>
          Ultra convenient all-in-one financing solution with cards, mobile
          payments, robust service and more
        </p>
        <Button className='my-4 w-44 py-5 text-base' asChild>
          <Link href={routes.signUp}>Get Started</Link>
        </Button>
        <br />
        <div className='flex w-full flex-col items-center justify-between gap-10 text-center md:flex-row'>
          <div className='text-sm'>
            <span className='text-2xl font-semibold'>120k+</span> <br />
            Registered Users
          </div>

          <div className='text-sm'>
            <span className='text-2xl font-semibold'>10k+</span> <br />
            Orders on AppStore
          </div>

          <div className='text-sm'>
            <span className='text-2xl font-semibold'>22%</span> <br />
            Cashback
          </div>
        </div>
      </div>
      <div className='h-96 w-full md:w-2/5'>
        <Image
          src={heroImage}
          alt='hero'
          className='pointer-events-none h-auto w-4/5 select-none'
        />
      </div>
    </section>
  );
}
