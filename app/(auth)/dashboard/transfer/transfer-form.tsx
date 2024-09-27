'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useDebounce } from '@/lib/hooks/useDebounce.';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FindUserNameAction } from './actions';

export default function TransferForm() {
  const [recipientMobileNumber, setRecipientMobileNumber] = useState('');
  const [recipientAccountID, setRecipientAccountID] = useState('');
  const debouncedValue = useDebounce(recipientMobileNumber, 1500);

  const queryClient = useQueryClient();
  const { data, isPending } = useQuery({
    queryFn: async () =>
      await FindUserNameAction({
        mobileNumber: recipientMobileNumber,
        accountID: undefined,
      }),
    queryKey: ['user', debouncedValue],
  });
  useEffect(() => {
    if (debouncedValue.toString().length >= 10) {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  }, [debouncedValue]);

  const inputLabelClassName = 'block py-2';
  const inputClassName = 'my-2 p-4';
  return (
    <div className='my-5'>
      <form
        className='mx-auto flex max-w-md flex-col gap-4 rounded-lg border p-5 text-center shadow-sm'
        onSubmit={(e) => e.preventDefault()}
      >
        <Label className={inputLabelClassName}>
          Recipient Mobile Number
          <Input
            onChange={(e) => setRecipientMobileNumber(e.target.value)}
            className={inputClassName}
            placeholder='01xxxxxxxxx'
          />
        </Label>
        <div className='relative h-12 text-muted-foreground'>
          <Separator className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' />
          <h4 className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2'>
            OR
          </h4>
        </div>
        <Label>
          Recipient Account ID
          <Input
            onChange={(e) => setRecipientAccountID(e.target.value)}
            className={inputClassName}
            placeholder='ac*********'
          />
        </Label>
        <div className='my-4'>
          {/* <LoaderCircle className='mx-auto animate-spin' /> */}
          {data?.username}
        </div>
        <Label>
          Amount ($)
          <Input type='number' className={inputClassName} placeholder='0' />
        </Label>
        <Button type='submit' className='w-full'>
          Initiate Transfer
        </Button>
      </form>
    </div>
  );
}
