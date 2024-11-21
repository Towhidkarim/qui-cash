'use client';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FindUserNameAction } from './actions';
import { TTransferMode } from './transfer-section';
import { queryKeys } from '@/lib/constants';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function SelectRecipient({
  currentTab,
  selfTabIndex,
  credential,
  transferMode,
  setReference,
  setAmount,
  setAccountInfo,
}: {
  currentTab: number;
  credential: string;
  selfTabIndex: number;
  transferMode: TTransferMode;
  setReference: (value: string) => void;
  setAmount: (value: number) => void;
  setAccountInfo: (
    data:
      | {
          userName: string;
          type: string;
          accountID: string;
        }
      | undefined,
  ) => void;
}) {
  const findUserParameters =
    transferMode === 'transfer'
      ? { mobileNumber: credential, accountID: undefined }
      : { mobileNumber: undefined, accountID: credential };
  const { data, mutate: fetchUser } = useMutation({
    mutationFn: async () => await FindUserNameAction(findUserParameters),
    onSuccess: (data) => {
      if (data)
        setAccountInfo({
          userName: data.username,
          type: data.accountType,
          accountID: data.accountID,
        });
    },
    mutationKey: ['fetchUser'],
  });
  useEffect(() => {
    if (true) {
      fetchUser();
      if (data)
        setAccountInfo({
          userName: data.username,
          type: data.accountType,
          accountID: data.accountID,
        });
      else setAccountInfo(undefined);
    }
  }, [currentTab]);
  // if (transferMode !== 'transfer') fetchUser();

  return (
    <div>
      <CardHeader className='text-center'>
        <CardTitle>Recipient and Amount</CardTitle>
        <CardDescription>Transferring to</CardDescription>
        {credential}
      </CardHeader>
      <CardContent>
        {data ? (
          <div className='mx-3 my-2 flex flex-row items-center justify-start gap-3 rounded-lg p-2 font-semibold ring-2'>
            <Avatar>
              <AvatarFallback className='bg-blue-400 text-lg font-normal text-white'>
                T
              </AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <span>{data.username}</span>
              <span className='text-xs font-normal capitalize text-muted-foreground'>
                {`${data.accountType} account`}
              </span>
            </div>
          </div>
        ) : (
          <Skeleton className='h-16 w-full' />
        )}
        <div className='mt-8'>
          <Label className='my-3 flex flex-col justify-center gap-2'>
            Reference/ID
            <Input
              onChange={(e) => setReference(e.target.value)}
              type='text'
              className='relative before:absolute before:left-2 before:top-1 before:content-["$"]'
              placeholder='Your Reference/Customer ID'
            />
          </Label>
        </div>
        <div className='mt-8'>
          <Label className='my-3 flex flex-col justify-center gap-2'>
            Amount
            <Input
              onChange={(e) => setAmount(Number(e.target.value))}
              type='number'
              className='relative text-center before:absolute before:left-2 before:top-1 before:content-["$"]'
              min={0}
              prefix='$'
              defaultValue={0}
            />
          </Label>
        </div>
      </CardContent>
    </div>
  );
}
