'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import SignInAction from '@/lib/global-actions/SignInAction';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { routes } from '@/lib/constants';
import { LoaderCircle } from 'lucide-react';

const FormSchema = z.object({
  email: z.string().email(),
  passWord: z.string().min(6).max(64),
});

export function SignInForm({ className }: { className?: string }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      passWord: '',
    },
  });

  const router = useRouter();
  const { isPending, mutate: SignIn } = useMutation({
    mutationFn: SignInAction,
    onSuccess: (response) => {
      if (response.ok) {
        toast(response.message, { description: 'Proceeding to Dashboard' });
        router.push(routes.dashboard);
      } else toast('Error Occured', { description: response.message });
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // console.log(data);
    SignIn({ email: data.email, password: data.passWord });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('w-full space-y-6', className)}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='user@mail.com' {...field} />
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
          {isPending ? (
            <span className='mr-2 animate-spin'>
              <LoaderCircle />
            </span>
          ) : (
            ''
          )}
          Sign In
        </Button>
      </form>
    </Form>
  );
}
