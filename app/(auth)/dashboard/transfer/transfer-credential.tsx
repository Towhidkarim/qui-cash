'use client';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function TransferCredential({
  transferType,
  setCredential,
}: {
  transferType: 'transfer' | 'payment' | 'bill';
  setCredential: (value: string) => void;
}) {
  return (
    <div>
      <CardHeader className='text-center'>
        <CardTitle>{`Recipient ${transferType == 'transfer' ? 'Mobile Number' : 'Account Number'}`}</CardTitle>
        <CardDescription>Provide Recipient's Credentials</CardDescription>
      </CardHeader>
      <CardContent>
        <Label>
          {transferType == 'transfer' ? 'Mobile Number' : 'Account Number'}
          <Input
            onChange={(e) => setCredential(e.target.value)}
            type='text'
            min={8}
            max={15}
            placeholder={
              transferType == 'transfer' ? '01•••••••••' : 'ac••••••••••'
            }
          />
        </Label>
      </CardContent>
    </div>
  );
}
