'use client';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Banknote, HandCoins, Receipt, ScanQrCode } from 'lucide-react';
import { TTransferMode } from './transfer-section';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const paymentModes = [
  { name: 'Transfer', code: 'transfer', icon: <HandCoins /> },
  { name: 'Payment', code: 'payment', icon: <Banknote /> },
  { name: 'Pay Bills', code: 'bill', icon: <Receipt /> },
];

export default function ModeChoose({
  setMode,
}: {
  setMode: (value: TTransferMode) => void;
}) {
  return (
    <div>
      <CardHeader className='text-center'>
        <CardTitle>Transfer Type</CardTitle>
        <CardDescription>Choose transfer mode</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          onValueChange={(value: TTransferMode) => setMode(value)}
          defaultValue={paymentModes[0].code}
          className='flex flex-row flex-wrap items-center justify-center gap-3'
        >
          {paymentModes.map((value, index) => (
            <div key={index}>
              <RadioGroupItem
                className='peer hidden'
                value={value.code}
                id={value.code}
              />
              <Label
                htmlFor={value.code}
                className='flex size-16 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg p-2 font-normal text-muted-foreground ring-1 ring-muted transition-all peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:text-primary/80 peer-data-[state=checked]:ring-primary/60'
              >
                <span>{value.icon}</span>
                <span className='truncate text-xs capitalize'>
                  {value.name}
                </span>
              </Label>
            </div>
          ))}
        </RadioGroup>
        <Separator className='my-10' />
        <div className='mx-auto mt-2 flex flex-col items-center justify-center gap-3'>
          <h2 className='text-center text-muted-foreground'>Scan to pay</h2>
          <Button variant='outline' size='icon' className='size-12 rounded-2xl'>
            <ScanQrCode size={36} />
          </Button>
        </div>
      </CardContent>
    </div>
  );
}
