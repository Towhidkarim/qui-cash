'use client';
import SequenceTab, { clamp } from '@/components/ui/sequence-tab';
import { Scanner } from '@yudiel/react-qr-scanner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SelectRecipient from '../transfer/select-recipient';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import InitiateTransfer from '../transfer/initiate-transfer';

export type TTransferMode = 'transfer' | 'payment' | 'bill';
export const TransferInfoSchema = z.object({
  recipientName: z.string().min(3),
  reference: z.string().min(1),
  amount: z.number().min(1),
});
export default function ScannerSection() {
  const router = useRouter();
  const [accountID, setAccounID] = useState<string>();
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 4;
  const [transferMode, setTransferMode] = useState<TTransferMode>('transfer');
  const [transferCredential, setTransferCredential] = useState('');
  const [reference, setReference] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [accountInfo, setAccountInfo] = useState<{
    userName: string;
    accountID: string;
    type: string;
  }>();

  const isNextDisabled =
    (currentStep === 0 && transferCredential === '') ||
    (currentStep === 1 &&
      (reference === '' || amount <= 0 || accountInfo === undefined));

  const previousTab = () => {
    setCurrentStep((prev) => clamp(0, prev - 1, totalSteps - 1));
  };
  const nextTab = () => {
    setCurrentStep((prev) => clamp(0, prev + 1, totalSteps - 1));
  };
  return (
    <div className=''>
      <Card className='mx-auto my-5 w-full max-w-[400px]'>
        <SequenceTab
          className=''
          currentStep={currentStep}
          tabs={[
            <Scanner
              onScan={(result) => {
                setTransferCredential(result[0].rawValue);
                setCurrentStep(1);
              }}
              allowMultiple
            />,
            <SelectRecipient
              setAccountInfo={setAccountInfo}
              setAmount={setAmount}
              setReference={setReference}
              credential={transferCredential}
              currentTab={currentStep}
              selfTabIndex={2}
              transferMode='payment'
            />,
            <InitiateTransfer
              amount={amount}
              recipientName={accountInfo?.userName ?? ''}
              reference={reference}
              recipientAccountID={accountInfo?.accountID ?? ''}
            />,
          ]}
        />
        <CardFooter className='mt-5 flex flex-row justify-between'>
          <Button
            disabled={currentStep === 0}
            className=''
            onClick={() => previousTab()}
          >
            <ArrowLeft />
          </Button>
          <Button
            disabled={currentStep === totalSteps - 1 || isNextDisabled}
            className=''
            onClick={() => nextTab()}
          >
            <ArrowRight />
          </Button>
        </CardFooter>
      </Card>

      {/* <Scanner
        onScan={(result) => {
          console.log(result);
          router.push('/dashboard');
        }}
      /> */}
    </div>
  );
}
