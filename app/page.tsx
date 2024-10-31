import { Button } from '@/components/ui/button';
import { routes } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import { Zap } from 'lucide-react';
import HomeNavbar from './home-navbar';
import HeroSection from './hero-section';

export default function Home() {
  return (
    <main className='min-h-svh w-svw'>
      <HomeNavbar />
      <br />
      <HeroSection />

      {/* <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center'>
        <h1 className='text-3xl font-extrabold text-primary md:text-5xl'>
          Qui
          <Zap className='mx-1 inline size-16 scale-y-125 border-primary fill-primary' />
          Cash
        </h1>
        <br />
        <p className='text-xl text-muted-foreground'>
          Powering Your Finances with QuiCash. <br className='my-2' />
          Banking - Simplified.
        </p>
        <h2 className='mt-14 text-2xl font-semibold text-primary/85'>
          Get Started Now!
        </h2>
        <div className='flex items-center justify-center gap-10 py-5'>
          <Button className='p-6 text-lg font-semibold' asChild>
            <Link href={routes.signUp}>Sign Up</Link>
          </Button>
          <Button className='p-6 text-lg font-semibold' asChild>
            <Link href={routes.signin}>Sign In</Link>
          </Button>
        </div>
      </div> */}
    </main>
  );
}
