'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useDebounce } from '@/lib/hooks/useDebounce.';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { FindUserNameAction } from './actions';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import TransferMoneyAction from '@/lib/global-actions/TransferAction';
import { toast } from 'sonner';
import { useAccountData } from '@/lib/hooks/useAccountData';

export default function TransferForm() {
  const [recipientMobileNumber, setRecipientMobileNumber] = useState('');
  const [recipientAccountID, setRecipientAccountID] = useState('');
  const amountRef = useRef(0);
  const debouncedValue = useDebounce(recipientMobileNumber, 1500);
  const [recipientData, setRecipientData] = useState<{
    accountID: string;
    username: string;
  }>();
  const { data: accountData } = useAccountData();

  const queryClient = useQueryClient();
  const { data, isPending, mutate } = useMutation({
    mutationFn: async () =>
      await FindUserNameAction({
        mobileNumber: recipientMobileNumber,
        accountID: undefined,
      }),
    mutationKey: ['user', debouncedValue],
  });

  const {
    data: transferData,
    isPending: transferIsPending,
    mutate: TransferMoney,
  } = useMutation({
    mutationFn: async ({
      senderAccountID,
      recipientAccountID,
      amount,
    }: {
      senderAccountID: string;
      recipientAccountID: string;
      amount: number;
    }) => TransferMoneyAction({ senderAccountID, recipientAccountID, amount }),
    onSuccess: (response) => {
      toast('Success!', { description: response.message });
    },
  });

  useEffect(() => {
    if (debouncedValue.toString().length >= 10) {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      mutate();
    }
  }, [debouncedValue]);

  const inputLabelClassName = 'block py-2';
  const inputClassName = 'my-2 p-4';
  return (
    <div className='my-5 md:mx-5'>
      <div
        className='mx-auto flex w-full flex-col gap-4 rounded-lg border p-5 text-center shadow-sm md:text-left'
        // onSubmit={(e) => e.preventDefault()}
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
          {isPending && <LoaderCircle className='mx-auto animate-spin' />}
          {data && <Label className='my-2'>Select Recipient Account</Label>}
          <RadioGroup className='mx-auto flex w-full flex-col items-start justify-center gap-2 px-4 py-2'>
            {data?.map((item, index) => (
              <div
                key={index}
                className='flex w-full items-center space-x-2 text-left'
              >
                <RadioGroupItem
                  className='peer hidden'
                  value={item.accountID}
                  id={item.accountID}
                  onClick={() => setRecipientAccountID(item.accountID)}
                />
                <Label
                  htmlFor={item.accountID}
                  className='w-full cursor-pointer rounded-sm p-3 ring-1 hover:bg-muted peer-data-[state=checked]:text-primary peer-data-[state=checked]:ring-primary peer-data-[state=unchecked]:ring-muted'
                >
                  <h3 className='font-semibold'>{item.username}</h3>
                  <h4 className='text-sm capitalize text-muted-foreground'>
                    {item.accountType} Account
                  </h4>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <Label>
          Amount ($)
          <Input
            type='number'
            className={inputClassName}
            placeholder='0'
            onChange={(e) => (amountRef.current = +e.target.value)}
          />
        </Label>
        <Button
          onClick={() =>
            TransferMoney({
              amount: amountRef.current,
              recipientAccountID: recipientAccountID,
              senderAccountID: accountData?.accountID ?? '',
            })
          }
          disabled={transferIsPending}
          className='w-full'
        >
          Initiate Transfer
        </Button>
      </div>
    </div>
  );
}
