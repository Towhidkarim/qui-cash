import React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { routes } from '@/lib/constants';
import { Button } from '@/components/ui/button';

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Seemless Money Transfers',
    href: '/dashboard',
    description:
      'Easily transfer money between accounts or send money to friends, family, and businesses.',
  },
  {
    title: 'Mobile Check Deposit',
    href: '#',
    description:
      'Deposit checks by taking photos, eliminating the need to visit a branch.',
  },
  {
    title: 'Spending Analytics',
    href: '#',
    description:
      'Get insights on spending habits, categorized expenses, and track budgets over time.',
  },
  {
    title: 'Digital Wallet',
    href: '#',
    description:
      'Store credit and debit cards securely for contactless payments through NFC',
  },
  {
    title: 'Currency Exchange',
    href: '#',
    description:
      'Convert and hold foreign currency balances for international transactions.',
  },
  {
    title: 'Customer Support Chat',
    href: '#',
    description:
      'Access in-app customer service through chat or call options for instant help.',
  },
];

export default function HomeNavbar() {
  return (
    <nav className='flex w-full flex-row items-center justify-between px-5 py-6 md:px-10'>
      <Link
        href={'/'}
        className='text-lg font-bold text-primary/90 md:text-2xl'
      >
        QuiCash
      </Link>
      <NavigationMenu className='hidden md:block'>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className='text-base font-normal'>
              Getting started
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                <li className='row-span-3'>
                  <NavigationMenuLink asChild>
                    <Link
                      className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                      href='/'
                    >
                      {/* <Icons.logo className="h-6 w-6" /> */}
                      <div className='mb-2 mt-4 text-lg font-medium'>
                        QuiCash
                      </div>
                      <p className='text-sm leading-tight text-muted-foreground'>
                        Powering Your Finances with QuiCash.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <ListItem href='#' title='Introduction'>
                  Banking - Simplified.
                </ListItem>
                <ListItem href='#' title='Seemless'>
                  Seemless transactions
                </ListItem>
                <ListItem href='#' title='Secure'>
                  Providing high security
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className='text-base font-normal'>
              Services
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href='/dashboard' legacyBehavior passHref>
              <NavigationMenuLink className={``}>Dashboard</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className='flex flex-row gap-2'>
        <Button variant='outline' asChild>
          <Link href={routes.signUp}>Sign Up</Link>
        </Button>
        <Button variant='outline' className='hidden md:block' asChild>
          <Link href={routes.signin}>Sign In</Link>
        </Button>
      </div>
    </nav>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
