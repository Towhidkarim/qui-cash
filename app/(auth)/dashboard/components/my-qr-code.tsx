'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAccountData } from '@/lib/hooks/useAccountData';
import { Loader2, QrCode } from 'lucide-react';
import QRCode from 'react-qr-code';

export default function MyQRCode() {
  const { data: accountData } = useAccountData();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='icon' variant='ghost'>
          <QrCode />
        </Button>
      </DialogTrigger>
      <DialogContent className='my-4 flex max-w-80 flex-col items-center justify-center rounded-lg lg:max-w-96'>
        <DialogHeader>
          <DialogTitle>Your Account QR Code</DialogTitle>
          <DialogDescription className='text-center'>
            Scan me
            <br />
            {accountData?.accountID}
          </DialogDescription>
        </DialogHeader>
        {accountData?.accountID ? (
          <QRCode className='m-5' value={accountData?.accountID} />
        ) : (
          <span className='animate-spin'>
            <Loader2 size={38} />
          </span>
        )}
      </DialogContent>
    </Dialog>
  );
}
