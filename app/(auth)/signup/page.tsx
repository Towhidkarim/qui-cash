import FadeEffect from '@/components/framer/FadeEffect';
import { Input } from '@/components/ui/input';
// import { SignInForm } from './signin-form';
import Link from 'next/link';
import { routes } from '@/lib/constants';
import dashboard from '@/public/images/screen_mockup.png';
import Image from 'next/image';
import { SignUpForm } from './signup-form';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Page() {
  return (
    <main>
      <FadeEffect>
        <div className='w-svh flex min-h-svh flex-row gap-0'>
          <ScrollArea className='grid h-svh w-full place-content-center lg:w-1/2'>
            <div className='w-full max-w-md px-2'>
              <h1 className='my-3 mt-14 text-4xl font-semibold'>Sign Up</h1>
              <p className='my-3 text-muted-foreground'>
                Please enter your details
              </p>
              <br />
              {/* <SignInForm className='w-full' /> */}
              <SignUpForm />
              <p className='my-8 text-center text-muted-foreground'>
                Already have an account?{' '}
                <Link
                  href={routes.signin}
                  className='font-semibold text-primary/75 transition hover:opacity-70'
                >
                  Sign Up here
                </Link>{' '}
              </p>
            </div>
          </ScrollArea>
          <div className='relative hidden h-svh w-1/2 bg-muted lg:block'>
            <Image
              src={dashboard}
              alt='dashbaord'
              className='mb-[10svh] ml-auto mt-[10svh] h-[80vh] w-auto'
            />
          </div>
        </div>
      </FadeEffect>
    </main>
  );
}
