import FadeEffect from '@/components/framer/FadeEffect';
import { Input } from '@/components/ui/input';
import { SignInForm } from './signin-form';
import Link from 'next/link';
import { routes } from '@/lib/constants';
import dashboard from '@/public/images/screen_mockup.png';
import Image from 'next/image';

export default function Page() {
  return (
    <main>
      <FadeEffect>
        <div className='w-svh flex min-h-svh flex-row gap-0'>
          <div className='relative w-full lg:w-1/2'>
            <div className='absolute left-1/2 top-1/2 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 px-2'>
              <h1 className='my-3 text-4xl font-semibold'>Log In</h1>
              <p className='my-3 text-muted-foreground'>
                Welcome back! please enter your sign in credentials
              </p>
              <br />
              <SignInForm className='w-full' />
              <p className='my-8 text-muted-foreground'>
                Don't have an account?{' '}
                <Link
                  href={routes.signUp}
                  className='font-semibold text-primary/75 transition hover:opacity-70'
                >
                  Sign Up here
                </Link>{' '}
              </p>
            </div>
          </div>
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
