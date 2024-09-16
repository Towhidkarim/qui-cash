'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Loader } from 'lucide-react';
import { UserTypeSchema } from '@/lib/type-schema';
import { useMutation } from '@tanstack/react-query';
import SignUpAction from '@/lib/global-actions/SignUpAction';
import { toast } from 'sonner';

export function SignUpForm({ className }: { className?: string }) {
  const form = useForm<z.infer<typeof UserTypeSchema>>({
    resolver: zodResolver(UserTypeSchema),
  });

  const { isPending, mutate: SignUp } = useMutation({
    mutationFn: SignUpAction,
    onSuccess: (response) => {
      if (response.ok)
        toast(response.message, { description: 'Proceed to Sign In' });
      else toast('Error Occured', { description: response.message });
    },
  });

  function onSubmit(data: z.infer<typeof UserTypeSchema>) {
    SignUp({ userData: data });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('w-full space-y-6', className)}
      >
        <div className='flex flex-row items-center justify-between gap-4'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder='ex: John' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder='ex: Doe' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Your Present Address'
                  className='max-h-20'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-row items-center justify-between gap-4'>
          <FormField
            control={form.control}
            name='state'
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder='ex: BD' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='postalCode'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input placeholder='ex: 6204' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='dateOfBirth'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <br />
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      captionLayout='dropdown-buttons'
                      fromYear={1660}
                      toYear={new Date().getFullYear() - 18}
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='nid'
          render={({ field }) => (
            <FormItem>
              <FormLabel>National ID</FormLabel>
              <FormControl>
                <Input placeholder='ex: 112233445566' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='ex: user@mail.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='passWord'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder='******' type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending} className='w-full' type='submit'>
          {isPending ?? (
            <span className='animate-spin'>
              <Loader />
            </span>
          )}
          Sign In
        </Button>
      </form>
    </Form>
  );
}
