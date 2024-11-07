'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { queryKeys, routes } from '@/lib/constants';
import AddFundsAction from '@/lib/global-actions/AddFundsAction';
import { useAccountData } from '@/lib/hooks/useAccountData';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function AddForm() {
  const router = useRouter();
  const [amount, setAmount] = useState(5);
  const { data: accountData } = useAccountData();
  const queryClient = useQueryClient();
  const {
    data,
    mutate: AddFunds,
    isPending,
  } = useMutation({
    mutationFn: async ({
      accountID,
      amount,
    }: {
      accountID: string;
      amount: number;
    }) => AddFundsAction({ accountID, amount }),
    onSuccess: (data) => {
      if (data.ok) {
        toast('Adding Succesful', { description: 'Returning to Dashboard' });
        queryClient.invalidateQueries({ queryKey: [queryKeys.account] });
        router.push(routes.dashboard);
      } else {
        toast('Error', { description: data.message });
      }
    },
  });
  return (
    <div className='mx-auto w-full max-w-96'>
      <Label>
        Amount
        <Input
          onChange={(e) => setAmount(Number(e.target.value))}
          type='number'
          defaultValue={amount}
          className='text-lg'
          prefix='$'
        />
      </Label>
      <br />
      <Button
        disabled={isPending || !accountData}
        onClick={() =>
          AddFunds({ accountID: accountData?.accountID ?? '', amount })
        }
        className='w-full'
      >
        {isPending ? (
          <span className='animate-spin'>
            <Loader2 />
          </span>
        ) : (
          <span>Add Funds</span>
        )}
      </Button>
    </div>
  );
}
