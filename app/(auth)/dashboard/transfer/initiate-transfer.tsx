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

export default function InitiateTransfer() {
  return (
    <div>
      <CardHeader className='text-center'>
        <CardTitle>Initiate transfer</CardTitle>
        <CardDescription>Please Confirm the detials</CardDescription>
      </CardHeader>
      <CardContent>
        <p className='my-2'>
          Recipient:{' '}
          <span className='inline-block rounded-lg p-0.5 px-2 font-semibold ring-1 ring-primary/60'>
            Towhid Karim
          </span>
        </p>
        <p>
          Amount: <b>$5.00</b>
        </p>
        <br />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='outline' className='w-full'>
              Initiate Transfer
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you Sure you want to transfer <b>$5</b> to{' '}
                <b> Towhid Karim</b> ?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </div>
  );
}
