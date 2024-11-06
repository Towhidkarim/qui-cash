'use client';
import { Button } from '@/components/ui/button';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAccountData } from '@/lib/hooks/useAccountData';
import TransferMoneyAction from '@/lib/global-actions/TransferAction';
import { LoaderCircle } from 'lucide-react';

export default function InitiateTransfer({
  reference,
  amount,
  recipientName,
  recipientAccountID,
}: {
  reference: string;
  amount: number;
  recipientName: string;
  recipientAccountID: string;
}) {
  const { data: accountData } = useAccountData();
  const {
    data: transferResult,
    mutate: startTransfer,
    isPending,
  } = useMutation({
    mutationFn: async () =>
      TransferMoneyAction({
        senderAccountID: accountData?.accountID ?? '',
        recipientAccountID,
        amount,
      }),
  });
  return (
    <div>
      <CardHeader className='text-center'>
        <CardTitle>Initiate transfer</CardTitle>
        <CardDescription>Please Confirm the detials</CardDescription>
      </CardHeader>
      <CardContent className='flex h-full flex-col justify-between gap-12'>
        <div className='flex w-full flex-col gap-2'>
          <div className='flex flex-row items-center justify-between'>
            <span>Recipient </span>
            <span className='rounded-md px-2 font-semibold ring-1 ring-primary'>
              {recipientName}
            </span>
          </div>
          {recipientAccountID && (
            <div className='flex flex-row items-center justify-between'>
              <span>Credential</span>
              <span className='rounded-md px-2 font-semibold ring-1 ring-primary'>
                {recipientAccountID}
              </span>
            </div>
          )}
          <div className='flex flex-row items-center justify-between'>
            <span>Amount </span>
            <span className='font-semibold'> {`$${amount}`}</span>
          </div>
          <div className='flex flex-row items-center justify-between'>
            <span>Reference </span>
            <span className='font-semibold'> {reference}</span>
          </div>
        </div>
        <br />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button disabled={isPending} variant='outline' className='w-full'>
              {isPending ? (
                <div className='flex items-center justify-center gap-2'>
                  <span className='animate-spin'>
                    <LoaderCircle />
                  </span>
                  Please Wait
                </div>
              ) : (
                <span>Initiate Transfer</span>
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you Sure you want to transfer <b>{`$${amount}`}</b> to{' '}
                <b> {recipientName}</b> ?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => startTransfer()}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </div>
  );
}
