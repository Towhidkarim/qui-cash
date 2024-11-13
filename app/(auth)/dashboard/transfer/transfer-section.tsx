'use client';
import MileStone from '@/components/ui/milestone';
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, ArrowRight, CalendarHeart, HandCoins } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { RadioGroupItem, RadioGroup } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import ModeChoose from './mode-choose';
import SequenceTab, { clamp } from '@/components/ui/sequence-tab';
import TransferCredential from './transfer-credential';
import SelectRecipient from './select-recipient';
import InitiateTransfer from './initiate-transfer';
import { z } from 'zod';

export type TTransferMode = 'transfer' | 'payment' | 'bill';
export const TransferInfoSchema = z.object({
  recipientName: z.string().min(3),
  reference: z.string().min(1),
  amount: z.number().min(1),
});

export default function TransferSection() {
  const totalSteps = 4;
  const [currentStep, setCurrentStep] = useState(0);
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
    (currentStep === 1 && transferCredential === '') ||
    (currentStep === 2 &&
      (reference === '' || amount <= 0 || accountInfo === undefined));

  const previousTab = () => {
    setCurrentStep((prev) => clamp(0, prev - 1, totalSteps - 1));
  };
  const nextTab = () => {
    setCurrentStep((prev) => clamp(0, prev + 1, totalSteps - 1));
  };
  return (
    <div>
      <MileStone
        className='my-3 w-4/5'
        currentStep={currentStep + 1}
        totalSteps={totalSteps}
      />
      <h2 className='text-center font-light'>{`Step ${currentStep + 1} of ${totalSteps}`}</h2>
      <Card className='mx-auto my-5 w-full max-w-[400px]'>
        <SequenceTab
          className=''
          currentStep={currentStep}
          tabs={[
            <ModeChoose setMode={setTransferMode} />,
            <TransferCredential
              setCredential={setTransferCredential}
              transferType={transferMode}
            />,
            <SelectRecipient
              setAccountInfo={setAccountInfo}
              setAmount={setAmount}
              setReference={setReference}
              credential={transferCredential}
              currentTab={currentStep}
              selfTabIndex={2}
              transferMode={transferMode}
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
    </div>
  );
}
